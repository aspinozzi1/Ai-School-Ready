import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "./contact-form";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about AI-Ready School? We usually reply within one business day.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        lead="Questions about a plan, a district rollout, or the Cohort-Leader License? We're here."
      />
      <Section>
        <Container>
          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-lg font-semibold text-primary">Reach us directly</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer email? We read every message.
              </p>
              <a
                href={`mailto:${site.supportEmail}`}
                className="mt-4 inline-flex items-center gap-2 font-medium text-accent hover:underline"
              >
                <Mail className="h-4 w-4" /> {site.supportEmail}
              </a>
              <div className="mt-8 rounded-xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Cohort leaders</p>
                <p className="mt-1">
                  The Cohort-Leader License is application-only right now. Send us a
                  note with your organization and we&apos;ll be in touch.
                </p>
              </div>
            </div>
            <div>
              <ContactForm defaultTopic={topic} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
