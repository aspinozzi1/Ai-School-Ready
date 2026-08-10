import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { QuoteForm } from "@/components/pricing/quote-form";

export const metadata: Metadata = {
  title: "Request an invoice",
  description: "Get a formal quote for a School Membership and pay by purchase order.",
};

export default function InvoiceRequestPage() {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-card border border-mist bg-white p-9">
          <h1 className="text-2xl font-bold text-navy">
            Request a quote / pay by PO
          </h1>
          <p className="mt-3 text-sm text-muted">
            School Membership: ${site.pricing.school.priceYearly.toLocaleString()}
            /year for one school building, up to {site.schoolSeatLimit} staff
            accounts. Terms are Net 30; we accept POs, ACH, check, and card.
          </p>
          <p className="mb-6 mt-3 text-sm text-muted">
            Fill this in and a formal quote PDF goes to your billing contact
            within one school day. Prefer email? Write to{" "}
            <a
              href={`mailto:${site.contactEmail}?subject=Quote%20request%3A%20School%20Membership`}
              className="font-semibold text-teal hover:underline"
            >
              {site.contactEmail}
            </a>
            .
          </p>
          <QuoteForm />
          <p className="mt-6 text-xs text-muted">
            Business office needs vendor details first? Everything is on{" "}
            <Link href="/business-offices" className="font-semibold text-teal hover:underline">
              For Business Offices
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
