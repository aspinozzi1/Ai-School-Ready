import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { tracks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Member Library",
  description: "Every released PD kit, ready to download and run.",
};

export default async function LibraryPage() {
  const user = isSupabaseConfigured ? await getSessionUser() : null;

  if (!user) {
    return (
      <Gatehouse
        title="Sign in to open the library"
        body="The member library holds every released kit: script, deck, handouts, and follow-ups, ready to run."
        cta={{ href: "/login", label: "Sign in" }}
        secondary={{ href: "/pricing", label: "Become a member" }}
      />
    );
  }

  if (!user.hasActiveAccess) {
    return (
      <Gatehouse
        title="Your account is ready; your membership isn't active yet"
        body="Choose a membership to open the library, or ask your school admin for an invite if your building already has a School Membership."
        cta={{ href: "/pricing", label: "See memberships" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    );
  }

  const released = tracks
    .map((t) => ({ ...t, kits: t.kits.filter((k) => k.status === "released") }))
    .filter((t) => t.kits.length > 0);
  const inProduction = tracks
    .flatMap((t) => t.kits)
    .filter((k) => k.status === "production").length;

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">
            Member library
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">
            Your kits, ready to run
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Each kit is a complete 45–60 minute PD session: facilitator script,
            self-standing deck, handouts, and the follow-ups that make it stick.
            {inProduction > 0
              ? ` ${inProduction} more kits are in production and release into your membership at no extra cost.`
              : ""}
          </p>
        </div>

        {released.map((track) => (
          <div key={track.key} className="mt-10">
            <h2 className="text-xl font-bold text-navy">{track.title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {track.kits.map((kit) => (
                <Link
                  key={kit.slug}
                  href={`/library/${kit.slug}`}
                  className="group rounded-card border border-mist bg-white p-6 transition hover:border-teal"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                    Kit {kit.n}
                  </p>
                  <h3 className="mt-1 font-bold text-navy group-hover:text-teal">
                    {kit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{kit.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-teal">
                    Open kit →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10 rounded-card border border-mist bg-white p-6 text-center text-sm text-muted">
          Licensed for use within your school. Please don&apos;t redistribute
          kit files outside your building; that&apos;s what keeps membership
          affordable. Questions?{" "}
          <Link href="/contact" className="font-semibold text-teal hover:underline">
            Contact us
          </Link>
          .
        </div>
      </div>
    </section>
  );
}

function Gatehouse({
  title,
  body,
  cta,
  secondary,
}: {
  title: string;
  body: string;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-3 text-sm text-muted">{body}</p>
          <div className="mt-7 space-y-3">
            <Link
              href={cta.href}
              className="block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
            >
              {cta.label}
            </Link>
            <Link
              href={secondary.href}
              className="block rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
