import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about AI-Ready School — pricing, privacy, training, and staff seats.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        lead="Still unsure? Reach out — we're happy to help you pick the right plan."
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 rounded-xl border bg-secondary/40 p-6 text-center">
              <h2 className="text-lg font-semibold text-primary">
                Didn&apos;t find your answer?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We usually reply within one business day.
              </p>
              <Button asChild className="mt-4">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
