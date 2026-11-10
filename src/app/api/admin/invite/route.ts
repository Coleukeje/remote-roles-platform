import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/access-control";
import { NextRequest } from "next/server";

// POST: Invite a user by email — creates account with full access
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email ?? null)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Check if user already exists
    const { data: existingProfiles } = await admin
      .from("profiles")
      .select("id, email, access_level")
      .eq("email", email.toLowerCase())
      .limit(1);

    const origin = new URL(request.url).origin;

    if (existingProfiles && existingProfiles.length > 0) {
      const existing = existingProfiles[0];

      if (existing.access_level !== "full") {
        await admin
          .from("profiles")
          .update({
            access_level: "full",
            invited_by: user.id,
            invited_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      }

      // Send them a fresh link either way. Invite links expire, so someone
      // who was invited but never opened it in time would otherwise be
      // stuck: the account exists, so re-inviting fails, and they have no
      // password to sign in with.
      const { error: linkError } = await supabase.auth.resetPasswordForEmail(
        email.toLowerCase(),
        { redirectTo: `${origin}/auth/callback?next=/reset-password` },
      );

      return Response.json({
        success: true,
        message: linkError
          ? `${email} now has full access, but the email failed to send: ${linkError.message}`
          : `${email} already had an account. Granted full access and sent a fresh link to set a password.`,
      });
    }

    // Send a real invite email. Supabase creates the account, emails a
    // one-time link, and the invitee chooses their own password on arrival —
    // so no temporary password has to be generated here and relayed by hand.
    const { data: newUser, error: createError } =
      await admin.auth.admin.inviteUserByEmail(email.toLowerCase(), {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
        data: { full_name: name || "" },
      });

    if (createError) {
      return Response.json(
        { error: createError.message },
        { status: 400 },
      );
    }

    // The trigger should create the profile, but let's also ensure full access
    if (newUser?.user) {
      // Small delay for trigger to fire
      await new Promise((r) => setTimeout(r, 500));

      await admin
        .from("profiles")
        .upsert({
          id: newUser.user.id,
          full_name: name || "",
          email: email.toLowerCase(),
          access_level: "full",
          invited_by: user.id,
          invited_at: new Date().toISOString(),
        });
    }

    return Response.json({
      success: true,
      message: `Invite sent to ${email}. They'll choose their own password from the email.`,
    });
  } catch (error) {
    console.error("Invite error:", error);
    return Response.json(
      { error: "Failed to invite user" },
      { status: 500 },
    );
  }
}
