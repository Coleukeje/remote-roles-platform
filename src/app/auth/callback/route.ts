import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

/**
 * Lands every email link: confirmation, password recovery and invites.
 *
 * Supabase sends two different shapes depending on how the link was issued:
 *
 *   ?code=...                 PKCE — exchange it for a session
 *   ?token_hash=...&type=...  email OTP — verify it for a session
 *
 * This route previously handled only the first, so recovery and invite
 * links fell through to the final redirect and dumped people back on
 * /login with no session and no explanation — the "link just opens a new
 * tab and nothing happens" problem.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/training";

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — safe to ignore.
          }
        },
      },
    },
  );

  let ok = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    ok = !error;
  }

  // Recovery and invite links must land on the password form regardless of
  // the ?next= they carry, otherwise someone arrives signed in with a
  // one-time session and never gets asked to set a password.
  const destination =
    type === "recovery" || type === "invite" ? "/reset-password" : next;

  if (ok) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${destination}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${destination}`);
    }
    return NextResponse.redirect(`${origin}${destination}`);
  }

  // Say why it failed rather than bouncing to a bare login screen.
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(
      "That link has expired or has already been used. Request a new one.",
    )}`,
  );
}
