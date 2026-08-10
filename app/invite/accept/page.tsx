import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { acceptInvite } from "@/lib/actions/staff";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Accept your invite",
  description: "Join your school's AI-Ready School membership.",
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function InviteAcceptPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!isSupabaseConfigured || !token) {
    return (
      <Shell title="This invite link isn't valid">
        <p className="mt-3 text-sm text-muted">
          Ask your school admin to send a fresh invite, or contact us and
          we&apos;ll sort it out.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
          Contact us
        </Link>
      </Shell>
    );
  }

  const result = await acceptInvite(token);

  if (!result.ok && result.error === "auth") {
    // Signed out (e.g. opened on a different device). Send through login and
    // come back here.
    redirect(`/login?next=${encodeURIComponent(`/invite/accept?token=${token}`)}`);
  }

  if (!result.ok) {
    return (
      <Shell title="We couldn't connect your seat">
        <p className="mt-3 text-sm text-muted">{result.error}</p>
        <Link href="/contact" className="mt-6 inline-block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
          Contact us
        </Link>
      </Shell>
    );
  }

  return (
    <Shell title={`Welcome to ${result.orgName ?? "your school"}'s membership`}>
      <p className="mt-3 text-sm text-muted">
        Your seat is connected. The full kit library is open to you: start with
        Kit 1 if your building is running the series in order.
      </p>
      <Link href="/library" className="mt-6 inline-block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
        Open the library
      </Link>
    </Shell>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
