import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PAYMENT_AMOUNT_KOBO } from "@/lib/access-constants";

export const instant = false;

type VerifyOutcome =
  | { state: "success" }
  | { state: "already" }
  | { state: "failed"; reason: string };

async function verifyPayment(reference: string): Promise<VerifyOutcome> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Already upgraded (webhook may have landed first)
  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", user.id)
    .single();

  if (profile?.access_level === "full") return { state: "already" };

  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) {
    return { state: "failed", reason: "Payment system is not configured." };
  }

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${paystackSecret}` },
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!data.status || data.data?.status !== "success") {
    return {
      state: "failed",
      reason:
        data.data?.gateway_response ||
        data.message ||
        "The payment was not completed.",
    };
  }

  // Guard against a short-paid or mismatched transaction
  if (Number(data.data.amount) < PAYMENT_AMOUNT_KOBO) {
    return {
      state: "failed",
      reason: "The amount paid does not cover full access.",
    };
  }

  const metaUserId = data.data.metadata?.user_id;
  if (metaUserId && metaUserId !== user.id) {
    return {
      state: "failed",
      reason: "This payment belongs to a different account.",
    };
  }

  // Upgrade via admin client so RLS can't block the write
  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({
      access_level: "full",
      payment_status: "paid",
      payment_reference: reference,
      paid_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    // Log the real Postgres/PostgREST error — without this a failed unlock
    // is undiagnosable from the UI alone.
    console.error("Payment unlock failed", {
      reference,
      userId: user.id,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return {
      state: "failed",
      reason:
        "Payment went through but we couldn't unlock your account automatically. Contact support and we'll sort it out.",
    };
  }

  return { state: "success" };
}

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const { reference, trxref } = await searchParams;
  const ref = reference || trxref;

  const outcome: VerifyOutcome = ref
    ? await verifyPayment(ref)
    : { state: "failed", reason: "No payment reference was provided." };

  const ok = outcome.state === "success" || outcome.state === "already";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-surface-dim rounded-2xl p-8 text-center">
        <div
          className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
            ok ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {ok ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="text-green-600"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-600"
            >
              <path
                d="M7 7l10 10M17 7L7 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink mb-2">
          {ok ? "You're all set" : "Payment not completed"}
        </h1>

        <p className="text-sm text-muted leading-relaxed mb-6">
          {outcome.state === "success"
            ? "Your payment went through and your full training access is unlocked. All 3 modules, 12 training days and 62 lessons are open."
            : outcome.state === "already"
              ? "Your account already has full access. Jump straight back into the training."
              : outcome.reason}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/training"
            className="flex-1 inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            {ok ? "Go to Training" : "Back to Training"}
          </Link>
        </div>

        {ref && (
          <p className="text-[10px] text-muted/70 mt-5 font-mono">
            Ref: {ref}
          </p>
        )}
      </div>
    </div>
  );
}
