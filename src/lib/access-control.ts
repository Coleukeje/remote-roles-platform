import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin as checkAdmin } from "@/lib/access-constants";
import type { UserProfile } from "@/lib/access-constants";

export type { AccessLevel, UserProfile } from "@/lib/access-constants";
export {
  isDayFree,
  isContentLocked,
  isAdmin,
  PAYMENT_AMOUNT_KOBO,
  PAYMENT_AMOUNT_NAIRA,
  PAYMENT_CURRENCY,
} from "@/lib/access-constants";

/**
 * Get the current user's profile (access level, payment status, etc.)
 * Returns null if not authenticated.
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  // Reading the session is request-time work: the Supabase client checks the
  // token's expiry against the clock, which Next treats as an unstable value
  // and refuses to prerender. This marks everything below as per-request.
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Admins always have full content access — no need to grant it to themselves.
  if (checkAdmin(user.email ?? null)) {
    return {
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      email: user.email || null,
      access_level: "full",
      payment_status: "admin",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, access_level, payment_status")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Profile row doesn't exist yet (the signup trigger should create it,
    // but this is a safety net so the page still renders).
    return {
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      email: user.email || null,
      access_level: "free",
      payment_status: "none",
    };
  }

  return profile as UserProfile;
}
