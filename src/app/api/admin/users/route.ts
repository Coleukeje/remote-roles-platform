import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/access-control";

// GET: List all users with their profiles
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email ?? null)) {
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

// PATCH: Update a user's access level
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email ?? null)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, accessLevel } = body;

    if (!userId || !["free", "full"].includes(accessLevel)) {
      return Response.json(
        { error: "Invalid userId or accessLevel" },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
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
