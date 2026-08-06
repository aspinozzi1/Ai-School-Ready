import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { HARD_RULE } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI-Ready School is built by a full-time K-12 educator to help schools adopt AI safely — privacy-first and district-approvable.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by an educator, for educators"
        lead="Privacy-first, practical, and made for real classrooms and real schedules."
      />

      <Section>
        <Container>
          <div className="prose-content mx-auto max-w-3xl text-foreground">
            <p>
              AI-Ready School started in a real building, with a real problem:
              teachers were already using AI, and there was no plan, no training,
              and no privacy guardrails. That&apos;s a liability — and it&apos;s
              also a missed opportunity to give teachers hours of their week back.
            </p>
            <p>
              I&apos;m a full-time K-12 teacher. I built this because I needed it
              myself, and because most of what&apos;s out there is either hype,
              expensive consulting, or a pile of tools with no policy behind them.
              Schools don&apos;t need another vendor. They need a plan they can
              actually run — this week, with the staff they already have.
            </p>
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
