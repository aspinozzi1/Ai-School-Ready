import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { howItWorks, kitPillars } from "@/config/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Three steps: buy your license, download the kit and run the 45-minute training, and your staff use the Cookbook the same week.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From no plan to AI-ready in a week"
        lead="No recording, no consultants, no building it yourself."
      />

      <Section>
        <Container>
          <ol className="mx-auto max-w-3xl space-y-8">
            {howItWorks.map((step) => (
              <li key={step.step} className="flex gap-5">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                  aria-hidden
                >
                  {step.step}
                </div>
                <div className="pt-1">
                  <h2 className="text-xl font-semibold text-primary">{step.title}</h2>
                  <p className="mt-1 text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-secondary/40">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="Four pieces, already built"
            subtitle="You're not starting from a blank page — everything is ready to use."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {kitPillars.map((pillar) => (
              <Card key={pillar.title}>
                <CardContent className="flex gap-4 p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={pillar.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary">
              What a rollout week looks like
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                "Monday: Admin buys the School License and downloads the Governance Pack.",
                "Tuesday: Leadership reviews the AI policy and parent letter — edit names, done.",
                "Wednesday: One staff member runs the 45-minute PD deck with the included script.",
                "Thursday: Teachers open the Prompt Cookbook and try their first prompts.",
                "Friday: Staff are already saving time — safely, with guardrails in place.",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
