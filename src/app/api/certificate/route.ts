import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { buildCertificatePdf } from "@/lib/certificate-pdf";
import { NextRequest } from "next/server";

/** GET — download your own certificate. Only ever serves an approved one. */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const admin = createAdminClient();
  const { data: cert } = await admin
    .from("certificates")
    .select("code, recipient_name, status, approved_at")
    .eq("user_id", user.id)
    .neq("status", "revoked")
    .maybeSingle();

  if (!cert || cert.status !== "approved") {
    return new Response("No approved certificate for this account", { status: 403 });
  }

  const origin = new URL(request.url).origin.replace(/^https?:\/\//, "");
  const pdf = await buildCertificatePdf({
    recipientName: cert.recipient_name,
    code: cert.code,
    issuedOn: cert.approved_at ? new Date(cert.approved_at) : new Date(),
    verifyUrl: `${origin}/verify`,
  });

  const safeName = cert.recipient_name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Remote-Roles-Certificate-${safeName}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
