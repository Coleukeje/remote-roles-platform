import { NextRequest } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { PAYMENT_AMOUNT_KOBO } from "@/lib/access-constants";

/** Constant-time comparison so the signature can't be probed byte by byte. */
function signatureMatches(expected: string, received: string | null): boolean {
  if (!received) return false;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return Response.json({ error: "Not configured" }, { status: 500 });
    }

    // Verify webhook signature
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(body)
      .digest("hex");

    if (!signatureMatches(hash, signature)) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Only handle successful charges
    if (event.event !== "charge.success") {
      return Response.json({ received: true });
    }

    const { reference, metadata, customer, amount } = event.data;
    const userId = metadata?.user_id;

    if (!userId) {
      console.error("Paystack webhook: no user_id in metadata", { reference });
      return Response.json({ received: true });
    }

    // Don't unlock on a short payment
    if (Number(amount) < PAYMENT_AMOUNT_KOBO) {
      console.error("Paystack webhook: amount below full-access price", {
        reference,
        amount,
      });
      return Response.json({ received: true });
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Upgrade user to full access
    const { error } = await supabase
      .from("profiles")
      .update({
        access_level: "full",
        payment_status: "paid",
        payment_reference: reference,
        paid_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Failed to upgrade user:", error);
      return Response.json(
        { error: "Failed to update profile" },
        { status: 500 },
      );
    }

    console.log(
      `User ${userId} (${customer?.email}) upgraded to full access. Ref: ${reference}`,
    );

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
