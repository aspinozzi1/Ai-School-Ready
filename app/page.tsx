import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Lock,
  MessagesSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { LogoMark } from "@/components/brand/logo";
import { CtaBand } from "@/components/marketing/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Professional development your school runs itself",
};

const steps = [
  {
    icon: BookOpenCheck,
    title: "Pick a kit",
    body: "Download everything: facilitator deck, word-for-word script, handouts, follow-up plan.",
  },
  {
    icon: MessagesSquare,
    title: "Your coach runs the scripted session",
    body: "Any confident teacher-leader presents it cold. 45 to 60 minutes, with 15 minutes hands-on.",
  },
  {
    icon: GraduationCap,
    title: "Staff earn certificates",
    body: "Progress is tracked per teacher. Completing the core track earns the AI-Ready Educator Certificate of Completion.",
  },
];

const inside = [
  {
    icon: ClipboardList,
    title: "A sequenced curriculum",
    body: "20 kits across four tracks, from AI safety foundations to a year-long integration roadmap. Built in order, so each session stands on the last.",
  },
  {
    icon: FileText,
    title: "Scripts anyone can present",
    body: "Word-for-word facilitator scripts with stage directions and a running clock. Your coach reads it aloud and delivers a great session, first time.",
  },
  {
    icon: BookOpenCheck,
    title: "Handouts built for desks",
    body: "Participant handouts, first-48-hours action sheets, and 30-day follow-up plans. PD that survives past Friday.",
  },
  {
    icon: GraduationCap,
    title: "Certificates and progress",
    body: "Mark sessions complete, watch school-wide progress, and print professional certificates your PD records can actually use.",
  },
  {
    icon: RefreshCw,
    title: "New kits all year",
    body: "Membership includes every new kit and every update as AI changes. The library grows; your price doesn't.",
  },
  {
    icon: ShieldCheck,
    title: "Verified research only",
    body: "Every statistic in every kit is checked against the live source before it ships, and each kit lists its full references. No invented citations, ever.",
  },
];

const homeFaqs = [
  [
    "Who actually presents the PD sessions?",
    "Your own people: a coach, teacher-leader, media specialist, or AP. The script is word-for-word; if they can read aloud and keep time, they can deliver a great session.",
  ],
  [
    "Can we pay by purchase order?",
    "Yes, and most schools do. Request an invoice and your business office gets a formal quote immediately. Net 30, ACH, check, or card.",
  ],
  [
    "Is student data involved anywhere?",
    "No. The platform serves adult educators only, and the very first kit teaches every educator the one hard rule about student information and AI tools.",
  ],
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-secondary/70 to-background pt-20">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <LogoMark className="mx-auto mb-7 h-16 w-auto sm:h-20" />
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Human teaching.
              <br />
              <span className="text-accent">Life-changing tools.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Ready-to-run AI professional development for K-12 schools, built
              by two certified teachers. Your own staff presents it.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/pricing">
                  See Membership Plans <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/curriculum">Browse the Curriculum</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-accent">
              <Lock className="h-4 w-4" /> Zero student data. Ever.
            </p>
          </div>
        </Container>
      </Section>

      {/* The problem */}
      <Section className="py-14">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              The problem
            </p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              Great PD is expensive, hard to schedule, and forgotten by Friday.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A consultant day runs $2,000 to $5,000 and leaves when the
              parking lot empties. Pre-recorded videos are cheaper, and staff
              treat them accordingly. Meanwhile AI is already in your building:
              most teachers now use it, and more than half of teens use it for
              schoolwork.
            </p>
            <p className="mt-4 text-lg font-medium text-accent">
              The middle path: turnkey sessions your own people run.
            </p>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps. No consultants."
            subtitle="No recording yourself, no scheduling an outside presenter, no building it from scratch."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={s.title} className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link
              href="/how-it-works"
              className="font-medium text-accent hover:underline"
            >
              See the full walkthrough
            </Link>
          </p>
        </Container>
      </Section>

      {/* What's inside */}
      <Section className="bg-secondary/40">
        <Container>
          <SectionHeading
            eyebrow="What's inside"
            title="Everything a membership includes"
            subtitle="Nine finished files in every kit, one consistent system across the whole catalog."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inside.map((f) => (
              <Card key={f.title} className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why it's safe */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-primary-foreground/10">
              <Lock className="h-10 w-10 text-amber" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber">
                Why it&apos;s safe
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Zero student data. Ever.
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                The platform serves adult educators only: no student accounts,
                no student information, nothing to vet. And the very first kit
                teaches the one hard rule: never put student personally
                identifiable information into a public AI tool.
              </p>
              <Link
                href="/ferpa"
                className="mt-5 inline-block font-semibold text-amber hover:underline"
              >
                Read our student-privacy commitments
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Built by educators */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Built by educators"
            title="Two teachers. Twenty-plus years of classrooms."
          />
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border bg-card p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="text-muted-foreground">
                <p>
                  AI-Ready School is built by {site.founders.display}, a
                  husband-and-wife team of certified educators. Adam is a
                  certified CTE Carpentry teacher; Katelyn is a certified K-8
                  teacher. Everything in the library is written the way they
                  run their own classrooms: practical, honest about AI&apos;s
                  limits, and respectful of a teacher&apos;s time.
                </p>
                <p className="mt-3">
                  Their range shows in the content: examples run from the wood
                  shop to the kindergarten rug, so every kit lands with your
                  whole staff, not just the core classrooms.
                </p>
                <p className="mt-4 border-l-2 border-accent pl-4 font-medium text-primary">
                  &quot;Let your ethics, your integrity, and your morals be the
                  framework by which AI is directed.&quot;
                </p>
                <Link
                  href="/about"
                  className="mt-4 inline-block font-medium text-accent hover:underline"
                >
                  Read their story
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section className="bg-secondary/40">
        <Container>
          <SectionHeading
            eyebrow="Simple pricing"
            title="One membership. Your whole staff."
            subtitle="One flat annual price. The library grows all year; your price doesn't."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <Card className="relative flex flex-col">
              <Badge variant="amber" className="absolute -top-3 right-6">
                Most popular
              </Badge>
              <CardContent className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-primary">
                  {site.pricing.school.name}
                </h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-foreground">
                    ${site.pricing.school.priceYearly.toLocaleString()}
                  </span>{" "}
                  <span className="text-sm text-muted-foreground">/ year</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {[
                    `One school building, up to ${site.schoolSeatLimit} staff accounts`,
                    "Unlimited kits, downloads, and certificates",
                    "Pay by card or purchase order (Net 30)",
                  ].map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="accent" className="mt-6 w-full">
                  <Link href="/pricing">See school pricing</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-primary">
                  {site.pricing.individual.name}
                </h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-foreground">
                    ${site.pricing.individual.priceYearly}
                  </span>{" "}
                  <span className="text-sm text-muted-foreground">/ year</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {[
                    "Full library access for one educator",
                    "Personal progress and certificates",
                    "New kits and updates all year",
                  ].map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-6 w-full">
                  <Link href="/pricing">See individual pricing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {site.pricing.districtContact}{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Contact us
            </Link>
            . {site.pricing.refundPolicy.split(".")[0]}.
          </p>
        </Container>
      </Section>

      <CtaBand />

      {/* Quiet FAQ preview */}
      <Section className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-primary">
              Common questions
            </h2>
            <div className="mt-6 space-y-4">
              {homeFaqs.map(([q, a]) => (
                <div key={q} className="rounded-lg border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/faq">See all FAQs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
