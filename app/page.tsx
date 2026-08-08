import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Professional development your school runs itself",
};

const steps = [
  {
    n: "1",
    title: "Pick a kit",
    body: "Download everything: facilitator deck, word-for-word script, handouts, follow-up plan.",
  },
  {
    n: "2",
    title: "Your coach runs the scripted session",
    body: "Any confident teacher-leader presents it cold. 45 to 60 minutes, with 15 minutes hands-on.",
  },
  {
    n: "3",
    title: "Staff earn certificates",
    body: "Progress is tracked per teacher. Completing the core track earns the AI-Ready Educator Certificate of Completion.",
  },
];

const inside = [
  {
    title: "A sequenced curriculum",
    body: "20 kits across four tracks, from AI safety foundations to a year-long integration roadmap. Built in order, so each session stands on the last.",
  },
  {
    title: "Scripts anyone can present",
    body: "Word-for-word facilitator scripts with stage directions and a running clock. Your coach reads it aloud and delivers a great session, first time.",
  },
  {
    title: "Handouts built for desks",
    body: "Participant handouts, first-48-hours action sheets, and 30-day follow-up plans. PD that survives past Friday.",
  },
  {
    title: "Certificates and progress",
    body: "Mark sessions complete, watch school-wide progress, and print professional certificates your PD records can actually use.",
  },
  {
    title: "New kits all year",
    body: "Membership includes every new kit and every update as AI changes. The library grows; your price doesn't.",
  },
  {
    title: "Verified research only",
    body: "Every statistic in every kit is checked against the live source before it ships, and each kit lists its full references. No invented citations, ever.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber">
            Ready-to-run PD kits for K-12 schools
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Professional development your school runs itself.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            An all-access library of ready-to-run PD kits: facilitator decks,
            word-for-word scripts, and handouts. Your own coach presents; no
            consultants, no scheduling, no prep. Starting with a complete AI
            curriculum for teachers, built by two educators with 20+ years in
            the classroom.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              See Membership Plans
            </Link>
            <Link
              href="/curriculum"
              className="rounded-btn border border-mist/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
            >
              Browse the Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="section bg-paper">
        <div className="section-inner grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy">
              Great PD is expensive, hard to schedule, and forgotten by Friday.
            </h2>
            <p className="mt-5 text-muted">
              A consultant day runs $2,000 to $5,000, books out months ahead,
              and leaves when the parking lot empties. Pre-recorded videos are
              cheaper, and staff treat them accordingly. Meanwhile AI is
              already in your building: most teachers now use it, and more
              than half of teens use it for schoolwork. The training gap is
              real, and it is growing every semester.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal">
              The middle path
            </p>
            <p className="mt-3 text-lg font-semibold text-navy">
              Turnkey sessions your own people run.
            </p>
            <p className="mt-3 text-muted">
              More engaging than a video, a fraction of the cost of a
              consultant, and available the moment your staff meeting starts.
              Every kit is built to be presented cold by a first-time
              facilitator.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-white">
        <div className="section-inner">
          <h2 className="text-center text-3xl font-bold text-navy">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-card bg-paper p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-muted">
            No recording yourself. No consultants. No building it from scratch.{" "}
            <Link href="/how-it-works" className="font-semibold text-teal hover:underline">
              See the full walkthrough
            </Link>
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="section bg-paper">
        <div className="section-inner">
          <h2 className="text-center text-3xl font-bold text-navy">
            What&apos;s inside a membership
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inside.map((f) => (
              <div
                key={f.title}
                className="rounded-card border border-mist bg-white p-7"
              >
                <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built by educators */}
      <section className="section bg-navy text-white">
        <div className="section-inner grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber">
              Built by educators
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Two teachers. Twenty-plus years of classrooms.
            </h2>
          </div>
          <div className="text-mist">
            <p>
              AI-Ready School is built by {site.founders.display}, a
              husband-and-wife team of certified educators. Adam is a certified
              CTE Carpentry teacher; Katelyn is a certified K-8 teacher.
              Everything in the library is written the way they run their own
              classrooms: practical, honest about AI&apos;s limits, and
              respectful of a teacher&apos;s time.
            </p>
            <p className="mt-4">
              Their range shows in the content: examples run from the wood shop
              to the kindergarten rug, so every kit lands with your whole
              staff, not just the core classrooms.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block font-semibold text-teal hover:underline"
            >
              Read their story
            </Link>
          </div>
        </div>
      </section>

      {/* Why it's safe */}
      <section className="section bg-white">
        <div className="section-inner grid gap-12 md:grid-cols-2 md:items-center">
          <div className="rounded-card bg-navy p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              The one hard rule
            </p>
            <p className="mt-4 text-2xl font-bold leading-snug">
              Never put student personally identifiable information into a
              public AI tool.
            </p>
            <p className="mt-4 text-sm text-mist">
              Taught in Kit 1. Reinforced in every kit after.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy">
              Safe by design. District-approvable by default.
            </h2>
            <ul className="mt-6 space-y-3 text-muted">
              <li>
                <strong className="text-navy">Zero student data, ever.</strong>{" "}
                The platform serves adult educators only: no student accounts,
                no student information, nothing to vet.
              </li>
              <li>
                <strong className="text-navy">Privacy-first practice.</strong>{" "}
                Every kit teaches educators to keep student information out of
                AI tools, with the habits that make it automatic.
              </li>
              <li>
                <strong className="text-navy">Honest about limits.</strong>{" "}
                Kits name AI&apos;s real risks (fabrication, over-reliance,
                generic sameness) and teach the guardrails.
              </li>
            </ul>
            <Link
              href="/ferpa"
              className="mt-6 inline-block font-semibold text-teal hover:underline"
            >
              Read our student-privacy commitments
            </Link>
          </div>
        </div>
      </section>

      {/* Membership + FAQ teaser */}
      <section className="section bg-paper">
        <div className="section-inner text-center">
          <h2 className="text-3xl font-bold text-navy">
            One membership. Your whole staff.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {site.pricing.school.name}: $
            {site.pricing.school.priceYearly.toLocaleString()}/year for one
            school building, up to {site.schoolSeatLimit} staff accounts.
            Individual educators: ${site.pricing.individual.priceYearly}/year.
            Schools can pay by purchase order; {site.pricing.refundPolicy.split(".")[0].toLowerCase()}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              See Membership Plans
            </Link>
            <Link
              href="/faq"
              className="rounded-btn bg-white px-6 py-3 font-semibold text-navy ring-1 ring-mist transition-colors hover:bg-paper"
            >
              Common questions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
