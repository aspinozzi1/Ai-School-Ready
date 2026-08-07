import type { Metadata } from "next";
import { Lock, ShieldCheck } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { HARD_RULE } from "@/config/site";

export const metadata: Metadata = {
  title: "FERPA & Data Safety",
  description:
    "AI-Ready School stores no student information. Plain-language statement of our privacy design and the one hard rule.",
};

export default function FerpaPage() {
  return (
    <>
      <PageHero
        eyebrow="FERPA & data safety"
        title="Zero student data. Ever."
        lead="Plain language, no legalese. Here's exactly how this product protects students."
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-4 rounded-xl bg-primary p-6 text-primary-foreground">
              <Lock className="h-8 w-8 shrink-0 text-amber" aria-hidden />
              <p className="text-lg font-semibold">{HARD_RULE}</p>
            </div>

            <div className="prose-content text-foreground">
              <h2>We don&apos;t collect student information</h2>
              <p>
                AI-Ready School is a training and policy product for adults —
                teachers and school leaders. It has <strong>no fields, forms, or
                features that capture information about K-12 students</strong>. We
                don&apos;t ask for it, we don&apos;t store it, and we never will.
                This is a compliance commitment, not a preference.
              </p>

              <h2>The one hard rule</h2>
              <p>
                Every prompt, policy, and piece of training in this product is built
                around a single rule:
              </p>
              <blockquote>
                Never put student personal information into a public AI tool.
              </blockquote>
              <p>
                Student personal information (sometimes called PII) includes things
                like a student&apos;s name, ID number, grades tied to a name, IEP or
                504 details, behavior records, or identifiable student work. Our
                Prompt Cookbook is written to use placeholders (like &quot;Student
                A&quot;) and generic descriptions so you get the benefit of AI
                without ever exposing a real student.
              </p>

              <h2>What we <em>do</em> store</h2>
              <p>
                To run your account, we store the ordinary things any software needs:
                the email address and name of the educator or administrator who signs
                up, which product you purchased, and your school or organization name
                if you bought a School License. Payments are handled by Stripe; we
                never see or store full card numbers.
              </p>

              <h2>Designed to be district-approvable</h2>
              <p>
                The Governance Pack — the AI policy, the FERPA-safe one-pager, the
                parent letter, and the staff agreement — is written so it can pass a
                board or district review. It centers student privacy and gives your
                leadership language they can adopt with confidence.
              </p>
              <div className="not-prose my-6 flex items-start gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  This page is a plain-language summary of how the product treats
                  data. It isn&apos;t legal advice. Your district&apos;s own policies
                  and applicable laws (including FERPA and state privacy laws) always
                  govern your use.
                </p>
              </div>

              <h2>Questions?</h2>
              <p>
                If your district needs anything specific for its review, reach out
                through our{" "}
                <a href="/contact">contact page</a> and we&apos;ll help.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
