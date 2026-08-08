import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Resource Library",
  description: "Genuinely useful printable tools for educators: no login, no email wall.",
};

const planned = [
  ["“The One Hard Rule” classroom poster", "Printable poster of the privacy rule every staff room should have on the wall.", "Poster · PDF"],
  ["10 Copy-Paste AI Prompts for Teachers", "A starter sheet of safe, tested prompts for the most common teacher tasks.", "Starter sheet · PDF"],
  ["AI Readiness Checklist for School Leaders", "A 15-minute self-audit for principals: where your building actually stands.", "Checklist · PDF"],
  ["“Is This AI Tool Safe for My Classroom?”", "A six-question vetting checklist to run before any new tool touches your practice.", "Checklist · PDF"],
  ["Talking to Parents About AI", "A one-page conversation guide for the questions families actually ask.", "Guide · PDF"],
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">Free Resource Library</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Genuinely useful, no login, no email wall. These are the trust
            engine: if the free things aren&apos;t excellent, why would the
            paid ones be?
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner">
          <div className="mb-8 rounded-card border border-amber/40 bg-amber/10 p-5 text-sm text-navy">
            The library opens alongside member launch, within weeks. Every
            resource below is in final production. Want them the moment
            they&apos;re live?{" "}
            <Link href="/free" className="font-semibold text-teal hover:underline">
              Get on the free list
            </Link>
            .
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {planned.map(([title, blurb, badge]) => (
              <div key={title} className="flex flex-col rounded-card border border-mist bg-white p-7">
                <span className="self-start rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                  {badge}
                </span>
                <h2 className="mt-4 font-semibold text-navy">{title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{blurb}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Coming at launch
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
