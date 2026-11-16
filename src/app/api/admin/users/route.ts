import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStaffUser } from "@/lib/staff";

// GET: List all users with their profiles
export async function GET() {
  try {
    const user = await getStaffUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const admin = createAdminClient();
    const { data: profiles, error } = await admin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ users: profiles });
  } catch (error) {
    console.error("Admin users error:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// PATCH: Update a user's access level, or their staff role
export async function PATCH(request: NextRequest) {
  try {
    const user = await getStaffUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, accessLevel, role } = body;

    if (!userId) {
      return Response.json({ error: "userId is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // ── Role change ───────────────────────────────────────────────
    if (role !== undefined) {
      if (!["student", "admin"].includes(role)) {
        return Response.json({ error: "Invalid role" }, { status: 400 });
      }

      // Removing your own admin rights locks you out of the panel that
      // grants them, so it is refused here rather than discovered later.
      if (userId === user.id && role !== "admin") {
        return Response.json(
          { error: "You can't remove your own admin access. Ask another admin to do it." },
          { status: 400 },
        );
      }

      // The last admin standing can't be demoted either.
      if (role !== "admin") {
        const { count } = await admin
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) <= 1) {
          return Response.json(
            { error: "That's the only admin left. Promote someone else first." },
            { status: 400 },
          );
        }
      }

      const { error: roleError } = await admin
        .from("profiles")
        .update({
          role,
          // Staff see the whole programme; nobody should be supporting
          // trainees from behind the paywall they're asking about.
          ...(role === "admin" ? { access_level: "full" } : {}),
        })
        .eq("id", userId);

      if (roleError) {
        return Response.json({ error: roleError.message }, { status: 500 });
      }

      return Response.json({ success: true, role });
    }

    // ── Access level change ───────────────────────────────────────
    if (!["free", "full"].includes(accessLevel)) {
      return Response.json(
        { error: "Invalid userId or accessLevel" },
        { status: 400 },
      );
    }

    const { error } = await admin
      .from("profiles")
      .update({
        access_level: accessLevel,
        // If granting full via admin, mark as invited
        ...(accessLevel === "full"
          ? { invited_by: user.id, invited_at: new Date().toISOString() }
          : {}),
      })
      .eq("id", userId);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin update error:", error);
    return Response.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
