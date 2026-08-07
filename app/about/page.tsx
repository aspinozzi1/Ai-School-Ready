import type { Metadata } from "next";
import { Lock, Hammer, Blocks } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { HARD_RULE } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI-Ready School is built by two veteran teachers — Adam and Katelyn Spinozzi — to help schools adopt AI safely, privacy-first and district-approvable.",
};

const founders = [
  {
    name: "Katelyn Spinozzi",
    role: "Co-Founder · Early Childhood",
    icon: Blocks,
    bio: "Katelyn is a 10-year veteran preschool teacher. She has spent her career on the very first classroom a child ever walks into — where routines, play, and language are everything. She keeps AI-Ready School grounded in what is developmentally appropriate, warm, and genuinely useful for the youngest learners and the teachers who guide them.",
  },
  {
    name: "Adam Spinozzi",
    role: "Co-Founder · Career & Technical Education",
    icon: Hammer,
    bio: "Adam is an 8-year veteran high school Woodshop teacher (grades 10-12). He teaches hands-on, real-world skills and knows what it takes to get older students ready for careers and life after graduation. He builds AI-Ready School the way he builds a project in the shop: measured twice, practical, and safe by design.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by two teachers, for teachers"
        lead="From a child's first classroom to career-ready teens — a privacy-first AI plan any school can actually run."
      />

      <Section>
        <Container>
          <div className="prose-content mx-auto max-w-3xl text-foreground">
            <p>
              AI-Ready School started in real buildings, with a real problem:
              teachers were already using AI, and there was no plan, no training,
              and no privacy guardrails. That&apos;s a liability — and it&apos;s
              also a missed opportunity to give teachers hours of their week back.
            </p>
            <p>
              We&apos;re Adam and Katelyn Spinozzi — a married pair of full-time
              educators who happen to sit at opposite ends of K-12. Katelyn teaches
              preschool; Adam teaches high school woodshop. Between us we see the
              whole arc of a student&apos;s education, and we kept running into the
              same gap: most AI offerings are either hype, expensive consulting, or
              a pile of tools with no policy behind them. Schools don&apos;t need
              another vendor. They need a plan they can run this week, with the
              staff they already have.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {founders.map((f) => (
              <div key={f.name} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <f.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{f.name}</h3>
                    <p className="text-sm text-muted-foreground">{f.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {f.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="prose-content mx-auto mt-12 max-w-3xl text-foreground">
            <h2>What we believe</h2>
            <ul>
              <li>
                <strong>Teachers&apos; time is sacred.</strong> AI should take the
                boring, repetitive work — not the human parts of teaching.
              </li>
              <li>
                <strong>Privacy is non-negotiable.</strong> A school&apos;s AI plan
                has to protect students first, or it isn&apos;t a plan.
              </li>
              <li>
                <strong>Simple beats clever.</strong> A 45-minute training your own
                coach can run beats a six-figure consulting engagement.
              </li>
              <li>
                <strong>The whole grade span matters.</strong> What&apos;s right for
                a preschooler isn&apos;t right for a junior in the shop — so our
                guidance is built for every age, not just one.
              </li>
            </ul>
            <h2>The one hard rule</h2>
            <p>
              Everything here is designed around a single, non-negotiable rule.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-3xl">
            <div className="flex items-center gap-4 rounded-xl bg-primary p-6 text-primary-foreground">
              <Lock className="h-8 w-8 shrink-0 text-amber" aria-hidden />
              <p className="text-lg font-semibold">{HARD_RULE}</p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
