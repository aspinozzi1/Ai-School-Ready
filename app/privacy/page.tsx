import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AI-Ready School collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <Container>
          <div className="prose-content mx-auto max-w-3xl text-foreground">
            <p className="text-sm text-muted-foreground">Last updated: August 2026</p>

            <p>
              This policy explains what {site.name} collects and why. In short: we
              collect the minimum needed to run your account, and we never collect
              information about K-12 students. See our{" "}
              <Link href="/ferpa">FERPA &amp; Data Safety statement</Link> for the
              student-privacy details.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Account information</strong> — your name and email when you
                sign up or are invited, and your school or organization name for
                School Licenses.
              </li>
              <li>
                <strong>Purchase information</strong> — which product you bought and a
                payment reference. Card payments are processed by Stripe; we never
                store full card numbers.
              </li>
              <li>
                <strong>Lead information</strong> — if you request the free sample, we
                store your email so we can send it and occasional updates.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> collect, request, or store any personal
              information about students.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To provide your dashboard, resources, and account access.</li>
              <li>To send transactional email (welcome, invites, receipts).</li>
              <li>To respond to your questions and support requests.</li>
            </ul>

            <h2>Service providers</h2>
            <p>
              We use a small set of trusted providers to operate: Supabase (accounts
              and data), Stripe (payments), Resend (email), and Vercel (hosting).
              Each processes data only to provide their service to us.
            </p>

            <h2>Your choices</h2>
            <p>
              You can request access to or deletion of your account data at any time
              by emailing{" "}
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. You can
              unsubscribe from non-essential email at any time.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
