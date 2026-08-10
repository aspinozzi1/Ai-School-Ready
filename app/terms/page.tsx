import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms for AI-Ready School memberships, in plain language.",
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Terms of service</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Plain language, because you're busy. Effective August 2026.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-6">
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">The service</h2>
            <p className="mt-3 text-sm text-muted">
              AI-Ready School provides an annual membership giving access to a
              library of professional-development kits (decks, scripts,
              handouts, and related materials) for use by educators. Content
              releases on the schedule shown on our curriculum page; new kits
              and updates during your term are included.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">License and scope</h2>
            <p className="mt-3 text-sm text-muted">
              A School Membership licenses one school building and includes up
              to {site.schoolSeatLimit} staff accounts for employees of that
              school. Use across multiple buildings or a district requires a
              district agreement. An Individual Educator Membership licenses
              one named educator. Within your license you may download, print,
              present, and adapt kit materials for your school's internal PD.
              You may not resell, redistribute outside your school, or publish
              kit materials publicly. The kits remain our copyrighted work.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">Payment and renewal</h2>
            <p className="mt-3 text-sm text-muted">
              Memberships are annual. Card subscriptions renew automatically at
              the then-current price unless cancelled before the renewal date;
              cancel any time from the link in your Stripe receipt or by
              emailing{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal hover:underline">{site.contactEmail}</a>{" "}
              (cancellation takes effect at the end of the paid term, and you
              keep access until then). Schools paying by purchase order receive
              a renewal invoice and simply decline it to end the membership.{" "}
              {site.pricing.refundPolicy}
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">Your account</h2>
            <p className="mt-3 text-sm text-muted">
              Keep your sign-in credentials to yourself; you're responsible for
              activity under your account. School admins manage their
              building's seats and confirm that invited staff are employees of
              the licensed school. Tell us promptly about any unauthorized use
              and we'll help lock things down.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">
              Certificates and content
            </h2>
            <p className="mt-3 text-sm text-muted">
              Certificates issued by the platform are Certificates of
              Completion and do not by themselves confer CEUs, clock hours, or
              license-renewal credit; check with your district or state whether
              this PD qualifies for local credit. Policy-related content is
              provided for informational purposes by educators, not attorneys,
              and is not legal advice; consult your district's legal counsel
              before adopting any policy.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">Acceptable use</h2>
            <p className="mt-3 text-sm text-muted">
              Don't share accounts outside your licensed school, scrape the
              library, or use the materials to build a competing product. We
              may suspend accounts that do, after a warning where practical.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h2 className="text-lg font-semibold text-navy">The usual limits</h2>
            <p className="mt-3 text-sm text-muted">
              The service is provided as-is; to the fullest extent the law
              allows, our total liability is capped at the fees you paid in the
              current term, and we aren't liable for indirect or consequential
              damages. These terms are governed by the laws of the State of New
              Jersey. We'll give at least 30 days' notice of material
              changes to these terms. Questions to{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal hover:underline">{site.contactEmail}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
