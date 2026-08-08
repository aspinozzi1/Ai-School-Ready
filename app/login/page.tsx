import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in",
  description: "Member sign-in for the AI-Ready School library.",
};

export default function LoginPage() {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">Member sign-in</h1>
          <p className="mt-3 text-sm text-muted">
            Member accounts open with the launch of the library, within weeks.
            If your school has already arranged early access, use the link in
            your welcome email.
          </p>
          <div className="mt-7 space-y-3">
            <Link href="/pricing" className="block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
              Become a member
            </Link>
            <Link href="/free" className="block rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white">
              Get free resources meanwhile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
