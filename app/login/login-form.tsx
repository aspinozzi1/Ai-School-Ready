"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [magicSent, setMagicSent] = useState(false);

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Send the user to the dashboard that matches their role.
    router.push("/auth/post-login");
    router.refresh();
  }

  async function handleMagic(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setMagicSent(true);
  }

  if (magicSent) {
    return (
      <Alert variant="success">
        <CheckCircle2 />
        <AlertDescription>
          Check your inbox — we sent a magic sign-in link to <strong>{email}</strong>.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {mode === "password" ? (
        <form onSubmit={handlePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isSupabaseConfigured}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isSupabaseConfigured}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !isSupabaseConfigured}>
            {loading ? <><Loader2 className="animate-spin" /> Signing in…</> : "Log in"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleMagic} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isSupabaseConfigured}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !isSupabaseConfigured}>
            {loading ? (
              <><Loader2 className="animate-spin" /> Sending…</>
            ) : (
              <><Mail /> Email me a magic link</>
            )}
          </Button>
        </form>
      )}

      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === "password" ? "magic" : "password"));
          setError(null);
        }}
        className="mt-4 w-full text-center text-sm font-medium text-accent hover:underline"
      >
        {mode === "password" ? "Prefer a magic link instead?" : "Use a password instead"}
      </button>
    </div>
  );
}
