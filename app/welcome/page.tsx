import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Your AI-Ready School membership is active.",
};

export default async function WelcomePage() {
  const user = isSupabaseConfigured ? await getSessionUser() : null;

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-card border border-mist bg-white p-9 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">
            Welcome to AI-Ready School
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">
            Your library is opening
          </h1>
          {user?.hasActiveAccess ? (
            <>
              <p className="mt-3 text-sm text-muted">
                Your membership is active. Start with Kit 1 if your building is
                running the series in order; each kit&apos;s prep guide takes
                about 15 minutes.
              </p>
              <Link href="/library" className="mt-7 inline-block rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90">
                Open the library
              </Link>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted">
                Thanks for your purchase! We&apos;re setting up your account
                now: a welcome email with your one-click sign-in link is on its
                way (usually under a minute). Already got it? Sign in and your
                library is open.
              </p>
              <div className="mt-7 space-y-3">
                <Link href="/login" className="block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
                  Sign in
                </Link>
                <Link href="/contact" className="block rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white">
                  Didn&apos;t get the email? Contact us
                </Link>
              </div>
            </>
          )}
          <p className="mt-6 text-xs text-muted">
            School admins: your dashboard (Account → School dashboard) is where
            you invite your staff; every seat is covered by your membership.
          </p>
        </div>
      </div>
    </section>
  );
}
