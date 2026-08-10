import Link from "next/link";
import { CheckoutButton } from "@/components/pricing/checkout-button";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "School Membership $1,499/yr for your whole staff, or Individual Educator $99/yr. Schools can pay by card or purchase order.",
};

const schoolFeatures = [
  `All-access for your whole staff: one school building, up to ${site.schoolSeatLimit} staff accounts`,
  "Unlimited kits, downloads, and sessions",
  "Certificates and school-wide progress tracking",
  "New kits and content updates all year",
  "Pay by card, or by purchase order / invoice (Net 30, ACH, or check)",
  "Automated staff invites; teachers manage their own accounts",
];

const individualFeatures = [
  "Full library access for one educator",
  "Every kit, handout, and script",
  "Personal progress tracking and certificates",
  "New kits and updates all year",
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Simple, school-friendly pricing</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            One flat annual price. The library grows all year; your price
            doesn&apos;t. {site.pricing.refundPolicy.split(".")[0]}.
          </p>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="section-inner grid gap-8 lg:grid-cols-2">
          {/* School */}
          <div className="relative rounded-card border-2 border-teal bg-white p-9 shadow-sm">
            <span className="absolute -top-3.5 left-8 rounded-full bg-teal px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Most popular
            </span>
            <h2 className="text-2xl font-bold text-navy">
              {site.pricing.school.name}
            </h2>
            <p className="mt-2 text-muted">{site.pricing.school.blurb}</p>
            <p className="mt-6">
              <span className="text-5xl font-bold text-navy">
                ${site.pricing.school.priceYearly.toLocaleString()}
              </span>
              <span className="text-muted"> / year</span>
            </p>
            <ul className="mt-8 space-y-3">
              {schoolFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <CheckoutButton
                product="school"
                className="w-full rounded-btn bg-teal px-5 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Pay by card
              </CheckoutButton>
              <Link
                href="/invoice-request"
                className="rounded-btn bg-navy px-5 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90"
              >
                Request an invoice / pay by PO
              </Link>
            </div>
            <p className="mt-3 text-center text-xs text-muted">
              Renews yearly; cancel anytime before renewal.{" "}
              {site.pricing.refundPolicy}
            </p>
            <p className="mt-4 text-center text-xs text-muted">
              Most schools pay by purchase order. It&apos;s a first-class
              option here:{" "}
              <Link href="/business-offices" className="font-semibold text-teal hover:underline">
                see our page for business offices
              </Link>
              .
            </p>
          </div>

          {/* Individual */}
          <div className="rounded-card border border-mist bg-white p-9">
            <h2 className="text-2xl font-bold text-navy">
              {site.pricing.individual.name}
            </h2>
            <p className="mt-2 text-muted">{site.pricing.individual.blurb}</p>
            <p className="mt-6">
              <span className="text-5xl font-bold text-navy">
                ${site.pricing.individual.priceYearly}
              </span>
              <span className="text-muted"> / year</span>
            </p>
            <ul className="mt-8 space-y-3">
              {individualFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <CheckoutButton
                product="individual"
                className="w-full rounded-btn bg-navy px-5 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Start your membership
              </CheckoutButton>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Card-only. Renews yearly; cancel anytime before renewal.
            </p>
          </div>
        </div>

        <div className="section-inner mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-mist bg-white p-7">
            <h3 className="font-semibold text-navy">
              District or multiple schools?
            </h3>
            <p className="mt-2 text-sm text-muted">
              A School Membership covers one building. For districts and
              multi-school networks we set up a district agreement with
              per-building pricing.{" "}
              <Link href="/contact" className="font-semibold text-teal hover:underline">
                Contact us
              </Link>{" "}
              and we&apos;ll take care of it.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-7">
            <h3 className="font-semibold text-navy">Our refund policy, plainly</h3>
            <p className="mt-2 text-sm text-muted">{site.pricing.refundPolicy}</p>
          </div>
        </div>
      </section>
    </>
  );
}
