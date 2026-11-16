import Link from "next/link";
import { connection } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const instant = false;

/**
 * Public certificate check. No login — this is the link printed on the
 * certificate itself, for an employer who wants to know the thing is real.
 * It deliberately shows the name and the date and nothing else: no email,
 * no account, no progress detail.
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
    .eq("code", decodeURIComponent(code).toUpperCase())
    .maybeSingle();

  const valid = cert?.status === "approved";

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-purple-100 bg-white p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-purple-600">
          Remote Roles · Certificate check
        </p>

        {valid ? (
          <>
            <div className="mt-5 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              Genuine
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-ink">{cert!.recipient_name}</h1>
            <p className="mt-2 text-muted">
              completed the Remote Roles Remote Work and Real Estate Cold Calling Programme.
            </p>
            <dl className="mt-6 grid gap-3 border-t border-purple-100 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Certificate</dt>
                <dd className="font-medium text-ink">{cert!.code}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Issued</dt>
                <dd className="font-medium text-ink">
                  {cert!.approved_at
                    ? new Date(cert!.approved_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Africa/Lagos",
                      })
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Lessons completed</dt>
                <dd className="font-medium text-ink">{cert!.lessons_total ?? "—"}</dd>
              </div>
            </dl>
          </>
        ) : cert?.status === "revoked" ? (
          <>
            <div className="mt-5 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
              Withdrawn
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-ink">This certificate was withdrawn</h1>
            <p className="mt-2 text-muted">
              It was issued and has since been revoked by Remote Roles. Treat it as invalid.
            </p>
          </>
        ) : (
          <>
            <div className="mt-5 inline-flex rounded-full bg-surface-dim px-3 py-1 text-xs font-medium text-muted">
              Not found
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-ink">No certificate with that code</h1>
            <p className="mt-2 text-muted">
              Check the code on the document — it looks like RR-2026-ABC123. A code that
              has never been issued will not appear here.
            </p>
          </>
        )}

        <p className="mt-8 border-t border-purple-100 pt-5 text-xs text-muted">
          Remote Roles ·{" "}
          <Link href="/" className="text-purple-600 hover:underline">
            remoteroles.online
          </Link>
        </p>
      </div>
    </main>
  );
}
