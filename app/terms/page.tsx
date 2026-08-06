import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using AI-Ready School.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <Section>
        <Container>
          <div className="prose-content mx-auto max-w-3xl text-foreground">
            <p className="text-sm text-muted-foreground">Last updated: August 2026</p>

            <p>
              These terms govern your use of {site.name}. By purchasing or using the
              product, you agree to them.
            </p>

            <h2>Licenses</h2>
            <ul>
              <li>
                <strong>Teacher Kit</strong> — a one-time purchase granting one
                individual educator access to the Prompt Cookbook and handout.
              </li>
              <li>
                <strong>School License</strong> — an annual subscription for a school
                or district, including all kit assets and staff seats. It renews
                yearly until cancelled.
              </li>
              <li>
                <strong>Cohort-Leader License</strong> — available by application only.
              </li>
            </ul>

            <h2>Acceptable use</h2>
            <p>
              The materials are licensed for use within your school or classroom. You
              may not resell, publicly redistribute, or sublicense the kit assets
              without written permission. The Cohort-Leader License is the path for
              running the program across multiple schools.
            </p>

            <h2>Student privacy</h2>
            <p>
              You agree to follow the one hard rule: never put student personal
              information into public AI tools. See our{" "}
              <Link href="/ferpa">FERPA &amp; Data Safety statement</Link>. You remain
              responsible for compliance with your own district policies and
              applicable law.
            </p>

            <h2>Billing &amp; cancellation</h2>
            <p>
              School Licenses renew automatically each year. You can manage or cancel
              your subscription from your billing page at any time; access continues
              through the end of your paid period. The Teacher Kit is a one-time
              purchase.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The product is provided &quot;as is.&quot; AI outputs should always be
              reviewed by a human before use. Nothing here is legal advice; your
              district&apos;s policies and applicable law govern your use.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
