import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { CheckoutButton } from "@/components/marketing/checkout-button";
import { products, faqs } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Teacher Kit $49 one-time, School License $999/year, or a Cohort-Leader License for coaches and district leaders.",
};

const cards = [products.teacher_kit, products.school_license, products.cohort_leader];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Straightforward pricing, real value"
        lead="One teacher or a whole district — pick the plan that fits. No sales calls, no surprises."
      />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {cards.map((p) => {
              const featured = "badge" in p && Boolean(p.badge);
              return (
                <Card
                  key={p.id}
                  className={cn(
                    "relative flex flex-col",
                    featured && "border-accent ring-2 ring-accent/30 shadow-md"
                  )}
                >
                  {featured && (
                    <Badge variant="amber" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      {"badge" in p ? p.badge : ""}
                    </Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold text-primary">{p.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.audience}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-foreground">
                        {p.priceLabel}
                      </span>
                      {p.cadence && (
                        <span className="ml-1 text-sm text-muted-foreground">
                          {p.cadence}
                        </span>
                      )}
                    </p>

                    <ul className="mt-6 flex-1 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      {p.id === "teacher_kit" && (
                        <CheckoutButton
                          product="teacher_kit"
                          className="w-full"
                          size="lg"
                        >
                          {p.cta}
                        </CheckoutButton>
                      )}
                      {p.id === "school_license" && (
                        <CheckoutButton
                          product="school_license"
                          className="w-full"
                          size="lg"
                          variant="accent"
                        >
                          {p.cta}
                        </CheckoutButton>
                      )}
                      {p.id === "cohort_leader" && (
                        <Button asChild size="lg" variant="outline" className="w-full">
                          <Link href="/contact?topic=cohort">{p.cta}</Link>
                        </Button>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      <span className="font-semibold">Which is right for me?</span>{" "}
                      {p.fit}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already purchased?{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Log in to your dashboard
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Reassurance strip */}
      <Section className="bg-secondary/40 py-12">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 text-center sm:grid-cols-3">
            {[
              ["Zero student data", "Every prompt and policy is privacy-first by design."],
              ["District-approvable", "The Governance Pack is built to pass a board review."],
              ["No consultants", "Your own coach runs the 45-minute training with our script."],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="font-semibold text-primary">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <SectionHeading title="Pricing questions" />
          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>
    </>
  );
}
