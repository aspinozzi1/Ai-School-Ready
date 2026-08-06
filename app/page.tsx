import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  GraduationCap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Icon } from "@/components/icon";
import { site, kitPillars, products, faqs } from "@/config/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background pt-20">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-5">
              For K-12 teachers &amp; school leaders
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
              {site.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {site.description}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/pricing">
                  See Pricing <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/free">Get 5 free prompts</Link>
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
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-foreground/70">
              The problem
            </p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              Teachers are already using AI. Most schools have no policy, no
              training, and no privacy guardrails.
            </p>
            <p className="mt-4 text-lg font-medium text-destructive">
              That&apos;s a liability.
            </p>
          </div>
        </Container>
      </Section>

      {/* What's inside */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What's inside"
            title="Everything you need to roll out AI safely"
            subtitle="Four battle-tested pieces — not another thing for you to build from scratch."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kitPillars.map((pillar) => (
              <Card key={pillar.title} className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={pillar.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pillar.description}
                  </p>
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
                Built by an educator, privacy-first, and district-approvable.
                The whole product is designed around one hard rule: never put
                student personal information into public AI.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Teachers and school leaders, K-12" />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="flex gap-4 p-6">
                <GraduationCap className="h-8 w-8 shrink-0 text-accent" aria-hidden />
                <div>
                  <h3 className="font-semibold text-primary">Teachers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get 50 classroom-ready prompts and a handout you can use this
                    week — safely.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-4 p-6">
                <Users className="h-8 w-8 shrink-0 text-accent" aria-hidden />
                <div>
                  <h3 className="font-semibold text-primary">School leaders</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a board-ready policy, staff training, and a rollout plan
                    your whole team can follow.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section className="bg-secondary/40">
        <Container>
          <SectionHeading
            eyebrow="Simple pricing"
            title="Start where you are"
            subtitle="One teacher or a whole district — pick the plan that fits."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {[products.teacher_kit, products.school_license].map((p) => (
              <Card key={p.id} className="relative flex flex-col">
                {"badge" in p && p.badge && (
                  <Badge variant="amber" className="absolute -top-3 right-6">
                    {p.badge}
                  </Badge>
                )}
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">{p.name}</h3>
                  <p className="mt-2">
                    <span className="text-3xl font-bold text-foreground">
                      {p.priceLabel}
                    </span>{" "}
                    <span className="text-sm text-muted-foreground">
                      {p.cadence}
                    </span>
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/pricing">{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Questions?{" "}
            <Link href="/faq" className="font-medium text-accent hover:underline">
              Read the FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              contact us
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaBand />

      {/* Quiet FAQ preview for SEO + trust */}
      <Section className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-primary">
              Common questions
            </h2>
            <div className="mt-6 space-y-4">
              {faqs.slice(0, 3).map((f) => (
                <div key={f.q} className="rounded-lg border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
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
