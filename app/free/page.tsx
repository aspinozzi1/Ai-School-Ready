import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { FreeForm } from "./free-form";

export const metadata: Metadata = {
  title: "Get 5 free prompts",
  description:
    "Enter your email and get 5 classroom-ready AI prompts — every one privacy-safe by design. A free taste of the 50-prompt Cookbook.",
};

export default function FreePage() {
  return (
    <>
      <PageHero
        eyebrow="Free sample"
        title="Get 5 free classroom-ready prompts"
        lead="A taste of the 50-prompt Cookbook. Every prompt is built to use zero student data."
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <FreeForm />
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Ready for all 50, plus a policy and staff training?{" "}
              <Link href="/pricing" className="font-medium text-accent hover:underline">
                See pricing
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
