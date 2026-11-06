"use client";

import { useState } from "react";
import { PAYMENT_AMOUNT_NAIRA } from "@/lib/access-constants";

export default function PaywallGate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePayment() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callback_url: `${window.location.origin}/payment/callback`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment failed. Please try again.");
        return;
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center p-4 sm:p-8 sm:py-14">
        <div className="max-w-lg w-full text-center">
          {/* Lock icon */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-6">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              className="text-purple-400"
            >
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 11V7a5 5 0 0 1 10 0v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-ink mb-3">
            Unlock Full Training Access
          </h2>

          <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
            You&apos;ve completed the free introductory module. To continue your
            training and access all lessons, exercises, quizzes, and
            role-play scenarios, upgrade to full access.
          </p>

          {/* What's included */}
          <div className="bg-surface rounded-xl border border-surface-dim p-5 mb-6 text-left">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">
              Full Access Includes
            </p>
            <ul className="space-y-2.5">
              {[
                "All 3 modules with 12 training days",
                "62 lessons covering cold calling mastery",
                "Interactive quizzes & role-play exercises",
                "Downloadable scripts & objection handlers",
                "CRM training & professional development",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-ink"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="mt-0.5 flex-shrink-0 text-green-500"
                  >
                    <path
                      d="M4 8L7 11L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Price + CTA */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-ink">
                ₦{PAYMENT_AMOUNT_NAIRA.toLocaleString()}
              </span>
              <span className="text-muted text-sm">one-time payment</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors shadow-lg shadow-purple-600/20"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 0 1 8-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="1"
                      y="4"
                      width="14"
                      height="9"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M1 7h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Pay with Paystack
                </>
              )}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <p className="text-xs text-muted mt-2">
              Secure payment powered by Paystack. Card, bank transfer, or USSD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
