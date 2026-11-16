import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin as isSeedAdmin } from "@/lib/access-constants";
import type { User } from "@supabase/supabase-js";

/**
 * Is the signed-in user staff?
 *
 * The answer lives in profiles.role, read with the service role so a
 * trainee's own RLS view can't influence it. Nothing about this reaches
 * the browser — the client bundle no longer knows who the admins are.
 *
 * The seed-email fallback exists for exactly one situation: the role
 * migration hasn't been run yet. Without it, deploying this would lock
 * the owner out of the panel that grants roles. Once 006 has run, the
 * column answers and the fallback never fires for anyone else.
 */
export async function getStaffUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  // Column missing (42703) or table unreadable — fall back to the seed list.
  if (error) {
    return isSeedAdmin(user.email ?? null) ? user : null;
  }

  if (data?.role === "admin") return user;

  // Row exists but no role column value yet: same bootstrap case.
  if (data && !("role" in data)) {
    return isSeedAdmin(user.email ?? null) ? user : null;
  }

  return null;
}

export async function isStaff(): Promise<boolean> {
  return (await getStaffUser()) !== null;
}
