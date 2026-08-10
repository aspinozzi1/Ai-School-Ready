"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ next = "/library" }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "That email and password don't match. Try again, or use the email link below."
          : error.message
      );
      setBusy(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  async function sendMagicLink() {
    if (!email) {
      setError("Enter your email first, then request the sign-in link.");
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("Check your inbox: we sent you a one-click sign-in link.");
  }

  return (
    <form onSubmit={signInWithPassword} className="space-y-4 text-left">
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
          placeholder="Your password"
        />
      </div>

      {error ? (
        <p className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}
      {notice ? (
        <p className="rounded-btn bg-teal/10 px-4 py-3 text-sm text-navy">{notice}</p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="block w-full rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <button
        type="button"
        onClick={sendMagicLink}
        disabled={busy}
        className="block w-full rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white disabled:opacity-50"
      >
        Email me a sign-in link instead
      </button>

      <p className="pt-1 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-teal hover:underline">
          Create your account
        </Link>
      </p>
    </form>
  );
}
