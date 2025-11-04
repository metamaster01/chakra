"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

// Simple SVG icons (Google + Eye)
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M21.35 11.1h-9.17v2.98h5.37c-.23 1.52-1.82 4.46-5.37 4.46a6.21 6.21 0 1 1 0-12.42c1.77 0 3.02.75 3.72 1.4l2.53-2.44C17.3 3.69 15.19 2.8 12.18 2.8 6.93 2.8 2.67 7.06 2.67 12.31s4.26 9.51 9.51 9.51c5.49 0 9.1-3.86 9.1-9.3 0-.62-.07-1.07-.16-1.42z"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
      />
    </svg>
  );
}

// Main auth card component
export default function AuthCard() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup-only fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  async function onSignUp(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: fullName, phone },
        },
      });
      if (error) throw error;
      router.push("/check-email"); // a simple page telling users to confirm email
    } catch (e: any) {
      setErr(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.replace("/account");
    } catch (e: any) {
      setErr(e.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

async function onGoogle() {
  setErr(null); setLoading(true);
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
    if (error) throw error;
    // Supabase redirects to /auth/callback
  } catch (e:any) {
    setErr(e.message || 'Google sign-in failed'); setLoading(false);
  }
}



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mx-auto rounded-2xl shadow-xl bg-white p-6 sm:p-8 border border-slate-200">
          {/* logo / mark */}
          <div className="mx-auto mb-6 h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
            <span className="text-xl">✦</span>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 text-center">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            {mode === "signup"
              ? "Fill in the details to get started."
              : "Sign in to continue."}
          </p>

          {/* OAuth row */}
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={onGoogle}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 active:scale-[.99]"
            >
              <GoogleIcon className="h-4 w-4" /> Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Forms */}
          {mode === "signup" ? (
            <form onSubmit={onSignUp} className="space-y-3">
              <div>
                <label className="text-xs text-slate-600">Full name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91xxxxxxxxxx"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {err && <p className="text-sm text-red-600">{err}</p>}
              <button
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800 active:scale-[.99]"
              >
                {loading ? "Creating..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={onSignIn} className="space-y-3">
              <div>
                <label className="text-xs text-slate-600">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {err && <p className="text-sm text-red-600">{err}</p>}
              <button
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800 active:scale-[.99]"
              >
                {loading ? "Signing in..." : "Continue"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            {mode === "signup" ? (
              <button
                className="text-slate-600 hover:underline"
                onClick={() => setMode("signin")}
              >
                Already have an account?{" "}
                <span className="font-medium">Sign in</span>
              </button>
            ) : (
              <button
                className="text-slate-600 hover:underline"
                onClick={() => setMode("signup")}
              >
                New here? <span className="font-medium">Create an account</span>
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Secured by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
