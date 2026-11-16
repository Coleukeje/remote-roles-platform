import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkEligibility, generateCertificateCode } from "@/lib/certificates";

/** POST — ask for a certificate. Eligibility is recomputed here from the
 *  progress table; the browser's opinion of it is never trusted. */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();

  const { data: rows } = await admin
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true);

  const eligibility = checkEligibility((rows ?? []).map((r) => r.lesson_id as string));

  if (!eligibility.eligible) {
    return Response.json(
      {
        error: `${eligibility.completed} of ${eligibility.total} lessons complete. Finish the programme first.`,
        ...eligibility,
      },
      { status: 400 },
    );
  }

  const { data: existing } = await admin
    .from("certificates")
    .select("id, status")
    .eq("user_id", user.id)
    .neq("status", "revoked")
    .maybeSingle();

  if (existing) {
    return Response.json({
      success: true,
      status: existing.status,
      message:
        existing.status === "approved"
          ? "Your certificate is already approved."
          : "Your request is already with the team.",
    });
  }

  const { data: profile } = await admin
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const recipientName =
    (profile?.full_name ?? "").trim() ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    (profile?.email ?? user.email ?? "Trainee").split("@")[0];

  const { error } = await admin.from("certificates").insert({
    user_id: user.id,
    code: generateCertificateCode(),
    recipient_name: recipientName,
    status: "pending",
    lessons_completed: eligibility.completed,
    lessons_total: eligibility.total,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({
    success: true,
    status: "pending",
    message: "Requested. The team will review it and you'll be able to download it once approved.",
  });
}
