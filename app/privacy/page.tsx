import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What AI-Ready School collects, why, and what we never collect.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">Privacy policy</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Written in plain language on purpose. Effective August 2026.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-6 text-ink">
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">What we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Account information for educators: name, school email address, and role, so you can sign in and we can show your progress.</li>
              <li>Membership and billing information for schools: school name, billing contact, and payment records. Card payments are processed by Stripe; we never see or store full card numbers.</li>
              <li>Progress data: which kits you've marked complete, so certificates and school dashboards work.</li>
              <li>Email addresses you give us for the free resources list.</li>
              <li>Ordinary technical logs (page requests, errors) needed to keep the site running.</li>
            </ul>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">What we never collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Student information of any kind. There are no student accounts and no fields for data about K-12 students, anywhere.</li>
              <li>Data sold to third parties. We don't sell or rent personal information, full stop.</li>
              <li>Advertising trackers. No ad pixels, no cross-site tracking.</li>
            </ul>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">How we use it</h2>
            <p className="mt-3 text-sm text-muted">
              To run your membership: sign-in, downloads, progress,
              certificates, invoices, and support. To send transactional email
              (welcome messages, invites, receipts, certificates) and, if you
              opted in, occasional product updates you can unsubscribe from in
              one click. That's the list.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">Service providers</h2>
            <p className="mt-3 text-sm text-muted">
              We use a short list of processors to run the service: Supabase
              (database and authentication), Stripe (payments and invoicing),
              Resend (transactional email), and Vercel (hosting). Each receives
              only what it needs to do its job.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">Your choices</h2>
            <p className="mt-3 text-sm text-muted">
              You can ask us to export or delete your account data any time by
              emailing{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal hover:underline">
                {site.contactEmail}
              </a>
              . School admins control their staff roster and can remove
              accounts themselves. Free-list emails have an unsubscribe link in
              every message.
            </p>
          </div>
          <p className="text-xs text-muted">
            If we make material changes to this policy we'll post them here and
            email account holders. Questions welcome at {site.contactEmail}.
          </p>
        </div>
      </section>
    </>
  );
}
