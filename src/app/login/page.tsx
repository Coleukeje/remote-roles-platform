"use client";

import { useState, useTransition } from "react";
import { login, signup, signInWithGoogle, resetPassword } from "@/app/actions/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      if (mode === "forgot") {
        const result = await resetPassword(formData);
        if (result?.error) setError(result.error);
        if (result?.success) {
          setSuccess(result.success);
          setTimeout(() => setMode("login"), 3000);
        }
        return;
      }

      if (mode === "signup") {
        const result = await signup(formData);
        if (result?.error) setError(result.error);
        if (result?.success) setSuccess(result.success);
        return;
      }

      // Login
      const result = await login(formData);
      if (result?.error) setError(result.error);
      // On success, login() redirects — no result returned
    });
  }

  function handleGoogleSignIn() {
    setError(null);
    startTransition(async () => {
      const result = await signInWithGoogle();
      if (result?.error) setError(result.error);
      // On success, signInWithGoogle() redirects — no result returned
    });
  }

  return (
    <div className="min-h-screen flex">
      {/* ─── Left panel: branding ─── */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-ink via-ink-light to-purple-900 flex-col justify-between p-10 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-purple-500/8 blur-2xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <span className="text-white font-[family-name:var(--font-display)] text-base font-bold">
                RR
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] font-bold text-lg text-white leading-tight">
                Remote Roles
              </p>
              <p className="text-xs text-purple-300/60">Training Academy</p>
            </div>
          </div>

          {/* Tagline */}
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-white leading-tight mb-4">
            Master remote work.
            <br />
            <span className="text-purple-300">Launch your career.</span>
          </h1>
          <p className="text-purple-100/60 text-base max-w-sm leading-relaxed">
            3 weeks of intensive training in communication, sales psychology,
            and cold calling mastery — from anywhere in the world.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-purple-300/50 uppercase tracking-wider">Weeks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-purple-300/50 uppercase tracking-wider">Days</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-xs text-purple-300/50 uppercase tracking-wider">Lessons</p>
          </div>
        </div>
      </div>

      {/* ─── Right panel: form ─── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-[family-name:var(--font-display)] text-sm font-bold">
                RR
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] font-bold text-base text-ink">
                Remote Roles
              </p>
              <p className="text-[11px] text-muted">Training Academy</p>
            </div>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink mb-1">
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
          </h2>
          <p className="text-sm text-muted mb-8">
            {mode === "login" && "Sign in to continue your training."}
            {mode === "signup" && "Get started with your training journey."}
            {mode === "forgot" && "Enter your email and we'll send a reset link."}
          </p>

          {/* Error / Success messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-ink mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-surface-dim bg-white text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  required
                  disabled={isPending}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-surface-dim bg-white text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                required
                disabled={isPending}
              />
            </div>

            {mode !== "forgot" && (
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-ink mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-surface-dim bg-white text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  required
                  disabled={isPending}
                />
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setMode("forgot"); setError(null); setSuccess(null); }}
                  className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "login" && "Signing in…"}
                  {mode === "signup" && "Creating account…"}
                  {mode === "forgot" && "Sending reset link…"}
                </span>
              ) : (
                <>
                  {mode === "login" && "Sign In"}
                  {mode === "signup" && "Create Account"}
                  {mode === "forgot" && "Send Reset Link"}
                </>
              )}
            </button>
          </form>

          {mode !== "forgot" && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-surface-dim" />
                <span className="text-xs text-muted">or</span>
                <div className="flex-1 h-px bg-surface-dim" />
              </div>

              {/* Google button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isPending}
                className="w-full py-3 rounded-xl border border-surface-dim bg-white text-sm font-semibold text-ink hover:bg-surface-dim transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15.68 8.18c0-.57-.05-1.12-.15-1.64H8v3.1h4.31a3.68 3.68 0 01-1.6 2.42v2h2.59c1.51-1.39 2.38-3.44 2.38-5.88z" fill="#4285F4" />
                  <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2c-.72.48-1.63.76-2.71.76-2.09 0-3.86-1.41-4.49-3.31H.84v2.07A7.99 7.99 0 008 16z" fill="#34A853" />
                  <path d="M3.51 9.51A4.81 4.81 0 013.26 8c0-.53.09-1.04.25-1.51V4.42H.84A7.99 7.99 0 000 8c0 1.29.31 2.51.84 3.58l2.67-2.07z" fill="#FBBC05" />
                  <path d="M8 3.18c1.18 0 2.24.4 3.07 1.2l2.3-2.3C11.97.79 10.16 0 8 0A7.99 7.99 0 00.84 4.42l2.67 2.07C4.14 4.59 5.91 3.18 8 3.18z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Toggle mode */}
          <p className="text-center text-sm text-muted mt-6">
            {mode === "login" && (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Sign up
                </button>
              </>
            )}
            {mode === "signup" && (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Sign in
                </button>
              </>
            )}
            {mode === "forgot" && (
              <>
                Remember your password?{" "}
                <button
                  onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Back to sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
