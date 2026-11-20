import Link from "next/link";
import { connection } from "next/server";
import { Playfair_Display } from "next/font/google";
import { createAdminClient } from "@/lib/supabase/admin";

// Same face as the printed certificate, so the page and the document read
// as one object. Loaded only here — no other page pays for it.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });

export const instant = false;

type Verdict = "valid" | "revoked" | "missing";

const SEAL: Record<Verdict, { ring: string; glyph: string; label: string; tone: string }> = {
  valid: { ring: "#A97BFF", glyph: "#6EE7B7", label: "Verified certificate", tone: "#6EE7B7" },
  revoked: { ring: "#F87171", glyph: "#FCA5A5", label: "Withdrawn", tone: "#FCA5A5" },
  missing: { ring: "#6B6280", glyph: "#A79FBD", label: "Not found", tone: "#A79FBD" },
};

/**
 * Public certificate check — the link printed on the document itself, for
 * an employer who wants to know it is real. Deliberately shows the name,
 * the date and the code and nothing else: no email, no account, no
 * progress detail. A verification page that leaked more than the
 * certificate does would be worse than no verification page.
 */
export default async function VerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  await connection();
  const { code } = await params;

  const admin = createAdminClient();
  const { data: cert } = await admin
    .from("certificates")
    .select("code, recipient_name, status, approved_at, lessons_total")
    .eq("code", decodeURIComponent(code).trim().toUpperCase())
    .maybeSingle();

  const verdict: Verdict =
    cert?.status === "approved" ? "valid" : cert?.status === "revoked" ? "revoked" : "missing";
  const seal = SEAL[verdict];

  const issued =
    cert?.approved_at
      ? new Date(cert.approved_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Africa/Lagos",
        })
      : "—";

  const headline =
    verdict === "valid"
      ? cert!.recipient_name
      : verdict === "revoked"
        ? "This certificate was withdrawn"
        : "No certificate with that code";

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5 py-14">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-purple-100 bg-white">
        {/* Stamp */}
        <div className="px-7 py-9 text-center" style={{ background: "#1C0A38" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300">
            Remote Roles Hub
          </p>

          <div
            className="mx-auto mt-5 grid h-[58px] w-[58px] place-items-center rounded-full"
            style={{ background: "rgba(124,58,237,0.22)", border: `1.5px solid ${seal.ring}` }}
          >
            {verdict === "valid" ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={seal.glyph} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : verdict === "revoked" ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={seal.glyph} strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={seal.glyph} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" />
              </svg>
            )}
          </div>

          <p
            className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: seal.tone }}
          >
            {seal.label}
          </p>

          <h1
            className={`${playfair.className} mt-2 text-[27px] leading-tight text-white`}
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h1>
        </div>

        {/* Record */}
        <div className="px-7 pb-7 pt-6">
          {verdict === "valid" ? (
            <>
              <p className="text-center text-sm text-muted">
                completed the Remote Work and Real Estate Cold Calling Programme — sixteen
                days of training, assessment and live roleplay.
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Certificate", cert!.code],
                  ["Issued", issued],
                  ["Lessons", cert!.lessons_total ? `${cert!.lessons_total} of ${cert!.lessons_total}` : "—"],
                  ["Status", "Active"],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0 rounded-xl bg-purple-50 px-4 py-3">
                    <dt className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">
                      {label}
                    </dt>
                    <dd className="mt-0.5 break-words text-sm font-semibold tabular-nums text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : verdict === "revoked" ? (
            <p className="text-center text-sm text-muted">
              It was issued and has since been revoked by Remote Roles Hub. Treat it as
              invalid.
            </p>
          ) : (
            <p className="text-center text-sm text-muted">
              Check the number printed on the document — it looks like RR-2026-ABC123. A
              code that was never issued will not appear here.
            </p>
          )}

          <p className="mt-7 border-t border-purple-100 pt-5 text-center text-xs text-muted">
            <Link href="/verify" className="text-purple-600 hover:underline">
              Check another certificate
            </Link>
            <span className="px-2">·</span>
            Remote Roles Hub
          </p>
        </div>
      </div>
    </main>
  );
}
