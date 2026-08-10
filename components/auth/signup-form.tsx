"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-btn bg-teal/10 px-4 py-4 text-sm text-navy">
          Almost there — check your inbox and click the confirmation link to
          activate your account.
        </p>
        <p className="text-sm text-muted">
          Confirmed already?{" "}
          <Link href="/login" className="font-semibold text-teal hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={signUp} className="space-y-4 text-left">
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-navy">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-navy">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
          placeholder="you@school.org"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-navy">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
          placeholder="At least 8 characters"
        />
      </div>

      {error ? (
        <p className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="block w-full rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "Creating your account…" : "Create account"}
      </button>

      <p className="pt-1 text-center text-sm text-muted">
        Already a member?{" "}
        <Link href="/login" className="font-semibold text-teal hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
