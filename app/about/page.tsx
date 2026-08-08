import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI-Ready School is built by Adam and Katelyn Spinozzi, certified educators with over 20 combined years in the classroom.",
};

const promises = [
  "Every kit is runnable cold by a first-time facilitator. If your coach can read aloud and keep time, they can deliver a great session.",
  "Every citation is real and verified against the live source before it ships. One invented statistic would end us, so there are none.",
  "No student data, ever. The platform serves adult educators only, and every kit teaches privacy-first practice.",
  "Honest about limits. Our kits name AI's real risks: fabrication, over-reliance, generic sameness, and teach the guardrails.",
  "Kits are drafted with AI assistance, the same way we teach educators to use it, then researched, fact-checked, revised, and approved by us. Nothing ships without a teacher's judgment on it.",
  "Membership includes updates. When AI changes (it changes monthly), your kits get refreshed, not stale.",
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            About AI-Ready School
          </p>
          <h1 className="mt-4 mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            PD built by two people who actually teach.
          </h1>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="section-inner grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-ink">
            <p>
              We&apos;re Adam and Katelyn Spinozzi, a husband-and-wife team of
              certified educators with over 20 combined years in the
              classroom. Adam is a certified CTE Carpentry teacher; Katelyn is
              a certified K-8 teacher. Between the two of us, we&apos;ve taught
              nearly every kind of learner a public school serves, from
              four-year-olds learning letters to seniors learning to read a
              tape measure.
            </p>
            <p>
              We built AI-Ready School because we watched schools get sold AI
              hype by people who don&apos;t teach. Consultants who&apos;d never
              managed a classroom charging thousands per day. Webinars full of
              buzzwords and empty of anything a teacher could use Monday
              morning. Meanwhile, our colleagues were quietly experimenting
              with AI on their own, with no guidance, no guardrails, and no
              idea what was safe to type into a chat box.
            </p>
            <p>
              Staff deserve practical, safe, run-it-yourself training. So we
              wrote it: complete PD sessions your own coach can present, with
              a word-for-word script, real research behind every claim, and at
              least fifteen minutes of hands-on practice in every hour.
            </p>
            <p>
              Our conviction, and you&apos;ll feel it in every kit: AI is a
              tool. It can take over the robotic parts of this job, the
              paperwork and the first drafts and the reformatting, precisely
              so teachers have more time for the human parts: relationships,
              feedback, actual teaching. It cannot greet a kid at the door by
              name and change that kid&apos;s day. Our whole company exists to
              help schools use the tool without ever confusing it for the
              teacher.
            </p>
            <p className="font-semibold text-navy">
              Human teaching. Life-changing tools.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex aspect-[4/3] items-center justify-center rounded-card border border-mist bg-white text-sm text-muted">
              Photo of Adam &amp; Katelyn (coming soon)
            </div>
            <div className="rounded-card border border-mist bg-white p-6 text-sm text-muted">
              <p className="font-semibold text-navy">Adam Spinozzi</p>
              <p>Certified CTE Carpentry teacher</p>
              <p className="mt-3 font-semibold text-navy">Katelyn Spinozzi</p>
              <p>Certified K-8 teacher</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="section-inner max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber">
            Our why
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Two teachers, walking into a room full of giants. On purpose.
          </h2>
          <div className="mt-6 space-y-5 text-white/85">
            <p>
              We're honest about who we're up against. The AI-in-education space
              is filling fast with large platforms and institutions, backed by
              money and &quot;credentials.&quot; We're two ordinary teachers. And
              here's what two decades in classrooms taught us: at the end of the
              day, the ordinary teachers are the most important people in the
              room. We came into this space to be disrupters, and we're not
              ashamed of that.
            </p>
            <p>
              We built this company with the aid of AI: the curriculum, the
              layout, the website you're reading right now. From conception to
              delivery, the thoughts and convictions are ours; AI helped us
              carry them. We don't hide that in a footnote, because it's
              exactly what we're selling: proof that, used correctly, AI is a
              tremendous tool in the hands of someone who knows what they're
              trying to build.
            </p>
            <p>
              And we'll say the quiet part out loud: the marketplace ultimately
              dictates what happens in schools, whether any of us likes that or
              not. AI is coming to your building either way. The only real
              question is what will steer it when it arrives. Our answer: let
              your ethics, your integrity, and your morals be the framework by
              which AI is directed. Not a vendor's roadmap.
            </p>
            <p className="font-semibold text-white">
              The goal is simple to say and worth a career to do: help teachers
              build amazing things with AI, the way we have, and then teach
              teachers how to teach students to do the same. Give every student
              the best possible chance to find success.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <h2 className="text-3xl font-bold text-navy">Our promise</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {promises.map((p) => (
              <li key={p} className="rounded-card bg-paper p-6 text-sm leading-relaxed text-ink">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href="/curriculum"
              className="rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              See what we&apos;ve built
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
