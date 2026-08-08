import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Resource Library",
  description: "Genuinely useful printable tools for educators: no login, no email wall.",
};

const resources: { title: string; blurb: string; badge: string; file: string }[] = [
  {
    title: "“The One Hard Rule” classroom poster",
    blurb: "Printable poster of the privacy rule every staff room should have on the wall, with the ten-second test underneath it.",
    badge: "Poster · PDF",
    file: "/free/one-hard-rule-poster.pdf",
  },
  {
    title: "10 Copy-Paste AI Prompts for Teachers",
    blurb: "A starter sheet of safe, tested prompts for the most common teacher tasks: planning, differentiation, assessment, and family communication.",
    badge: "Starter sheet · PDF",
    file: "/free/ten-ai-prompts-for-teachers.pdf",
  },
  {
    title: "AI Readiness Checklist for School Leaders",
    blurb: "A 15-minute self-audit for principals: four questions that show where your building actually stands.",
    badge: "Checklist · PDF",
    file: "/free/ai-readiness-checklist-for-leaders.pdf",
  },
  {
    title: "“Is This AI Tool Safe for My Classroom?”",
    blurb: "A six-question vetting checklist to run before any new tool touches your practice.",
    badge: "Checklist · PDF",
    file: "/free/ai-tool-safety-checklist.pdf",
  },
  {
    title: "Talking to Parents About AI",
    blurb: "A one-page conversation guide for the five questions families actually ask.",
    badge: "Guide · PDF",
    file: "/free/talking-to-parents-about-ai.pdf",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Free Resource Library</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Genuinely useful, no login, no email wall. These are the trust
            engine: if the free things aren&apos;t excellent, why would the
            paid ones be?
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <div key={r.title} className="flex flex-col rounded-card border border-mist bg-white p-7">
                <span className="self-start rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                  {r.badge}
                </span>
                <h2 className="mt-4 font-semibold text-navy">{r.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{r.blurb}</p>
                <a
                  href={r.file}
                  download
                  className="mt-5 inline-block self-start rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Download free
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-card border border-mist bg-white p-5 text-sm text-muted">
            Print and share these freely within your school community. Want the
            full kits behind them?{" "}
            <Link href="/curriculum" className="font-semibold text-teal hover:underline">
              See the curriculum
            </Link>{" "}
            or{" "}
            <Link href="/free" className="font-semibold text-teal hover:underline">
              get the free sample pack
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
}
