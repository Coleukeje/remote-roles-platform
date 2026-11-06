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

    if (existingProfiles && existingProfiles.length > 0) {
      const existing = existingProfiles[0];

      if (existing.access_level === "full") {
        return Response.json(
          { error: "User already has full access" },
          { status: 400 },
        );
      }

      // Upgrade existing user
      await admin
        .from("profiles")
        .update({
          access_level: "full",
          invited_by: user.id,
          invited_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      return Response.json({
        success: true,
        message: "Existing user upgraded to full access",
      });
    }

    // Create new user via Supabase admin API
    const tempPassword =
      crypto.randomUUID().slice(0, 8) + "Aa1!"; // Meets typical password requirements

    const { data: newUser, error: createError } =
      await admin.auth.admin.createUser({
        email: email.toLowerCase(),
        password: tempPassword,
        email_confirm: true, // Auto-confirm
        user_metadata: {
          full_name: name || "",
        },
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
      message: `Invited ${email} with full access`,
      tempPassword, // Admin can share this with the invitee
    });
  } catch (error) {
    console.error("Invite error:", error);
    return Response.json(
      { error: "Failed to invite user" },
      { status: 500 },
    );
  }
}
