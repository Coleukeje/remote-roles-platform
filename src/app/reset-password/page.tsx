"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Where a recovery or invite link lands once its session is established.
 *
 * Invited users arrive here too — they never get given a password, they
 * choose their own. The copy adapts, but the mechanism is the same:
 * the link grants a session, and updateUser sets the password on it.
 */
export default function ResetPasswordPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setHasSession(!!user);
      // An invited account has never signed in under its own password.
      setIsNewUser(!!user && !user.last_sign_in_at);
      setChecking(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those two passwords don't match.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/training"), 1400);
  }

  if (checking) {
    return (
      <Shell>
        <p className="text-sm text-muted">Checking your link…</p>
      </Shell>
    );
  }

  if (!hasSession) {
    return (
      <Shell>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink mb-2">
          This link has expired
        </h1>
        <p className="text-sm text-muted mb-6 leading-relaxed">
          Password links can only be used once, and they time out. Request a
          fresh one and it&apos;ll work.
        </p>
        <a
          href="/login"
          className="inline-flex w-full items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Back to sign in
        </a>
      </Shell>
    );
  }

  if (done) {
    return (
      <Shell>
        <div className="mx-auto w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink mb-2">
          Password set
        </h1>
        <p className="text-sm text-muted">Taking you to your training…</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink mb-2">
        {isNewUser ? "Choose your password" : "Set a new password"}
      </h1>
      <p className="text-sm text-muted mb-6 leading-relaxed">
        {isNewUser
          ? "Welcome to Remote Roles. Pick a password and you're in."
          : "Pick something you'll remember. You'll use it to sign in from now on."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-xs font-bold text-ink mb-1.5">
            New password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full px-3.5 py-2.5 pr-20 border border-surface-dim rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600 hover:text-purple-700"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink mb-1.5">
            Confirm password
          </label>
          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            className="w-full px-3.5 py-2.5 border border-surface-dim rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type it again"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          {saving ? "Saving…" : isNewUser ? "Create password and continue" : "Save new password"}
        </button>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-surface-dim rounded-2xl p-8 text-center">
        {children}
      </div>
    </div>
  );
}
