import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Free sample pack",
  description: "Real pages from real kits: judge our quality before you spend a dollar.",
};

export default function FreePage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">The free sample pack</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Real pages from real kits: script pages, a handout, an admin
            one-pager. The fastest way to judge whether we&apos;re worth your
            budget.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl">
          <div className="rounded-card border border-mist bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-navy">
              Get the pack by email
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Email us with the subject line &quot;Sample pack&quot; and
              we&apos;ll send it over, along with occasional free resources for
              educators. No spam, unsubscribe anytime, and we never share your
              address.
            </p>
            <a
              href={`mailto:${site.contactEmail}?subject=Sample%20pack`}
              className="mt-6 inline-block rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Email us for the sample pack
            </a>
            <p className="mt-4 text-xs text-muted">
              One-click signup is coming with the member launch; until then,
              a real teacher answers this inbox.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-card bg-white p-6 ring-1 ring-mist">
              <h3 className="font-semibold text-navy">While you&apos;re here</h3>
              <p className="mt-2 text-sm text-muted">
                The Free Resource Library has printable classroom tools with no
                login and no email wall.
              </p>
              <Link href="/resources" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
                Browse free resources
              </Link>
            </div>
            <div className="rounded-card bg-white p-6 ring-1 ring-mist">
              <h3 className="font-semibold text-navy">Ready to look deeper?</h3>
              <p className="mt-2 text-sm text-muted">
                The full curriculum page shows every kit, its objectives, and
                its release status, honestly.
              </p>
              <Link href="/curriculum" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
                See the curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
