"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { curriculum } from "@/data/curriculum";

const TOTAL = curriculum.reduce(
  (s, w) => s + w.days.reduce((sd, d) => sd + d.lessons.length, 0),
  0,
);

type CertStatus = "none" | "pending" | "approved" | "revoked";

export default function CertificatePage() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(0);
  const [status, setStatus] = useState<CertStatus>("none");
  const [code, setCode] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return setLoading(false);

    const [{ data: rows }, { data: cert }, { data: profile }] = await Promise.all([
      supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
      supabase.from("certificates").select("code, status").eq("user_id", user.id).neq("status", "revoked").maybeSingle(),
      supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    ]);

    setCompleted(rows?.length ?? 0);
    setStatus((cert?.status as CertStatus) ?? "none");
    setCode(cert?.code ?? null);
    setName((profile?.full_name as string) ?? (user.user_metadata?.full_name as string) ?? "");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function request() {
    setRequesting(true);
    setMessage(null);
    const res = await fetch("/api/certificate/request", { method: "POST" });
    const json = await res.json();
    setMessage(json.message ?? json.error);
    if (res.ok) await load();
    setRequesting(false);
  }

  const pct = Math.round((completed / TOTAL) * 100);
  const eligible = completed >= TOTAL;

  if (loading) {
    return (
      <main className="min-h-screen bg-surface px-5 py-16">
        <p className="mx-auto max-w-2xl text-muted">Checking your progress…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/training" className="text-sm text-muted hover:text-ink">
          ← Back to training
        </Link>

        <h1 className="mt-6 text-3xl font-semibold text-ink">Your certificate</h1>
        <p className="mt-2 text-muted">
          Issued once you have completed every lesson and a member of the team has approved it.
        </p>

        {/* Progress */}
        <section className="mt-8 rounded-2xl border border-purple-100 bg-white p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink">Programme progress</span>
            <span className="text-sm tabular-nums text-muted">
              {completed} of {TOTAL} lessons
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-purple-50">
            <div
              className="h-full rounded-full bg-purple-600 transition-all"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
          {!eligible && (
            <p className="mt-3 text-sm text-muted">
              {TOTAL - completed} lesson{TOTAL - completed === 1 ? "" : "s"} to go.
            </p>
          )}
        </section>

        {/* State */}
        <section className="mt-5 rounded-2xl border border-purple-100 bg-white p-6">
          {status === "approved" ? (
            <>
              <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Approved
              </span>
              <h2 className="mt-3 text-xl font-semibold text-ink">
                {name ? `Congratulations, ${name.split(" ")[0]}.` : "Congratulations."}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Certificate {code}. Anyone can confirm it is genuine at{" "}
                <span className="text-ink">/verify/{code}</span>.
              </p>
              <a
                href="/api/certificate"
                className="mt-5 inline-flex rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700"
              >
                Download PDF
              </a>
            </>
          ) : status === "pending" ? (
            <>
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Awaiting approval
              </span>
              <h2 className="mt-3 text-xl font-semibold text-ink">With the team</h2>
              <p className="mt-2 text-sm text-muted">
                You have finished the programme. A trainer reviews the request before the
                certificate is released — you will be able to download it from this page.
              </p>
            </>
          ) : eligible ? (
            <>
              <h2 className="text-xl font-semibold text-ink">You have finished the programme</h2>
              <p className="mt-2 text-sm text-muted">
                Request your certificate and a trainer will review it.
              </p>
              <button
                onClick={request}
                disabled={requesting}
                className="mt-5 inline-flex rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {requesting ? "Requesting…" : "Request my certificate"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-ink">Not yet</h2>
              <p className="mt-2 text-sm text-muted">
                The certificate unlocks when every lesson is ticked off, including the
                roleplay sign-offs your trainer confirms in the live sessions.
              </p>
              <Link
                href="/training"
                className="mt-5 inline-flex rounded-xl border border-purple-200 px-5 py-3 text-sm font-medium text-ink hover:bg-purple-50"
              >
                Keep going
              </Link>
            </>
          )}

          {message && <p className="mt-4 text-sm text-muted">{message}</p>}
        </section>
      </div>
    </main>
  );
}
