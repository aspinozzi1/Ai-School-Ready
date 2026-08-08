import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Start your membership, download a kit, and let your own coach run the scripted session. No consultants, no recordings, no prep.",
};

const kitContents = [
  ["Facilitator Prep Guide", "What the session is, a 15-minute prep checklist, timing map, FAQ, and troubleshooting. Built to make a nervous first-timer feel safe."],
  ["Presentation Deck", "25 to 40 professional slides with speaker notes, readable from the back of a library."],
  ["Word-for-Word Script", "The full session, keyed to slide numbers, with stage directions and a running clock. Read it aloud verbatim and it works."],
  ["Participant Handout", "Key takeaways, tools, and prompts, designed to live on a teacher's desk."],
  ["First 48 Hours Action Sheet", "Three concrete actions within two days, each under 15 minutes."],
  ["30-Day Implementation Plan", "Week-by-week follow-up with three ready-to-run 10-minute PLC activities. The part a school shows its board."],
  ["Exit Ticket & Feedback Form", "Reflection plus feedback; doubles as your PD documentation."],
  ["Admin One-Pager", "The internal sales sheet for principals and superintendents: why it matters, what staff will be able to do, the research base."],
  ["References & Further Reading", "Full APA citations for every source used, each verified before it shipped."],
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">How it works</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            No recording yourself, no consultants, no building it from scratch.
            Three steps, and the first one takes five minutes.
          </p>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="section-inner space-y-8">
          {[
            {
              n: "1",
              title: "Start your membership",
              body: "Join online by card, or request an invoice and pay by purchase order like any other vendor; most schools do. Invite your staff by pasting their email addresses; everyone gets full library access with their own account. No per-seat math, no separate logins to manage.",
            },
            {
              n: "2",
              title: "Download any kit; your coach runs the session",
              body: "Pick a kit and download all nine components. A coach, teacher-leader, media specialist, or AP presents the 45-to-60-minute session using the word-for-word script. They don't need to be an AI expert; the script carries the words and the deck carries the structure. Every session includes at least 15 minutes of hands-on practice.",
            },
            {
              n: "3",
              title: "Staff earn certificates; add the next kit when ready",
              body: "Teachers mark sessions complete, progress rolls up school-wide, and completing the core track earns each educator the AI-Ready Educator Certificate of Completion. The 30-day plan keeps each session alive in your existing PLC time until you're ready for the next kit.",
            },
          ].map((s) => (
            <div key={s.n} className="flex gap-6 rounded-card border border-mist bg-white p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-xl font-bold text-white">
                {s.n}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-navy">{s.title}</h2>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <h2 className="text-3xl font-bold text-navy">
            What&apos;s in every kit
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Nine finished files, identical structure across the whole catalog.
            Once your coach has run one kit, they can run them all.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {kitContents.map(([title, body]) => (
              <div key={title} className="rounded-card bg-paper p-6">
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="section-inner text-center">
          <h2 className="text-3xl font-bold text-navy">
            See it before you buy it
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            The free sample pack includes real pages from real kits, and the
            Free Resource Library is open to everyone, no login required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/free" className="rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90">
              Get the free sample pack
            </Link>
            <Link href="/pricing" className="rounded-btn bg-navy px-6 py-3 font-semibold text-white hover:opacity-90">
              See Membership Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
