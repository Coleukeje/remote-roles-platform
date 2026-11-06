import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PAYMENT_AMOUNT_KOBO, PAYMENT_CURRENCY } from "@/lib/access-constants";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user already has full access
    const { data: profile } = await supabase
      .from("profiles")
      .select("access_level, payment_status")
      .eq("id", user.id)
      .single();

    if (profile?.access_level === "full") {
      return Response.json(
        { error: "You already have full access" },
        { status: 400 },
      );
    }

    // A "pending" status just means a previous checkout was abandoned.
    // Starting a fresh transaction is always allowed.

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return Response.json(
        { error: "Payment system not configured" },
        { status: 500 },
      );
    }

    // Get callback URL from request
    const body = await request.json().catch(() => ({}));
    const callbackUrl =
      body.callback_url || `${request.nextUrl.origin}/training?payment=success`;

    // Initialize Paystack transaction
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: PAYMENT_AMOUNT_KOBO,
        currency: PAYMENT_CURRENCY,
        callback_url: callbackUrl,
        metadata: {
          user_id: user.id,
          full_name: user.user_metadata?.full_name || "",
        },
      }),
    });

    const paystackData = await res.json();

    if (!paystackData.status) {
      return Response.json(
        { error: paystackData.message || "Payment initialization failed" },
        { status: 400 },
      );
    }

    // Mark payment as pending
    await supabase
      .from("profiles")
      .update({
        payment_status: "pending",
        payment_reference: paystackData.data.reference,
      })
      .eq("id", user.id);

    return Response.json({
      authorization_url: paystackData.data.authorization_url,
      reference: paystackData.data.reference,
    });
  } catch (error) {
    console.error("Paystack init error:", error);
    return Response.json(
      { error: "Failed to initialize payment" },
      { status: 500 },
    );
  }
}
