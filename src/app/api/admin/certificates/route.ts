import { createAdminClient } from "@/lib/supabase/admin";
import { getStaffUser } from "@/lib/staff";
import { checkEligibility } from "@/lib/certificates";
import { NextRequest } from "next/server";

const requireAdmin = getStaffUser;

/** GET — every certificate request, newest first, with the progress that
 *  earned it so an admin isn't approving blind. */
export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 403 });

  const admin = createAdminClient();

  const { data: certs, error } = await admin
    .from("certificates")
    .select("*")
    .order("requested_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const ids = [...new Set((certs ?? []).map((c) => c.user_id as string))];
  const emails = new Map<string, string>();
  if (ids.length) {
    const { data: profiles } = await admin
      .from("profiles")
      .select("id, email")
      .in("id", ids);
    for (const p of profiles ?? []) emails.set(p.id as string, (p.email as string) ?? "");
  }

  return Response.json({
    certificates: (certs ?? []).map((c) => ({ ...c, email: emails.get(c.user_id as string) ?? "" })),
  });
}

/** POST — approve or revoke. Approval rechecks completion at the moment of
 *  the decision, so a request made weeks ago can't be rubber-stamped if the
 *  curriculum has grown since. */
export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 403 });

  const { certificateId, action, reason } = await request.json();
  if (!certificateId || !["approve", "revoke"].includes(action)) {
    return Response.json({ error: "certificateId and a valid action are required" }, { status: 400 });
  }

  const admin = createAdminClient();

  if (action === "revoke") {
    const { error } = await admin
      .from("certificates")
      .update({
        status: "revoked",
        revoked_at: new Date().toISOString(),
        revoke_reason: reason ?? null,
      })
      .eq("id", certificateId);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ success: true, message: "Certificate revoked. Its verification page now shows it as withdrawn." });
  }

  const { data: cert } = await admin
    .from("certificates")
    .select("id, user_id, recipient_name")
    .eq("id", certificateId)
    .maybeSingle();

  if (!cert) return Response.json({ error: "Certificate not found" }, { status: 404 });

  const { data: rows } = await admin
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", cert.user_id)
    .eq("completed", true);

  const eligibility = checkEligibility((rows ?? []).map((r) => r.lesson_id as string));
  if (!eligibility.eligible) {
    return Response.json(
      { error: `Not approved — ${eligibility.completed} of ${eligibility.total} lessons are complete.` },
      { status: 400 },
    );
  }

  const { error } = await admin
    .from("certificates")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: user.id,
      lessons_completed: eligibility.completed,
      lessons_total: eligibility.total,
    })
    .eq("id", certificateId);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true, message: `Approved. ${cert.recipient_name} can download it now.` });
}
