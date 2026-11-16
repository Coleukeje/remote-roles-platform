"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * The page the printed link goes to. Someone holding a certificate types
 * the code from the bottom of it and gets a yes or a no. Public by design —
 * a login wall here would make the printed link worthless.
 */
export default function VerifyLookupPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = code.trim().toUpperCase().replace(/\s+/g, "");
    if (cleaned) router.push(`/verify/${encodeURIComponent(cleaned)}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-purple-100 bg-white p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-purple-600">
            Remote Roles Hub
          </p>
          <h1 className="mt-4 text-2xl font-semibold text-ink">Check a certificate</h1>
          <p className="mt-2 text-muted">
            Enter the certificate number printed at the bottom of the document.
          </p>

          <form onSubmit={submit} className="mt-6">
            <label htmlFor="code" className="text-sm font-medium text-ink">
              Certificate number
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="RR-2026-ABC123"
              autoComplete="off"
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-purple-100 bg-surface px-4 py-3 font-mono text-ink uppercase tracking-wide outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              disabled={!code.trim()}
              className="mt-4 w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
            >
              Check this certificate
            </button>
          </form>

          <p className="mt-6 border-t border-purple-100 pt-5 text-xs text-muted">
            Certificates are issued by Remote Roles Hub only after a trainee completes
            every lesson of the programme and a trainer approves the result.
          </p>
        </div>
      </div>
    </main>
  );
}
