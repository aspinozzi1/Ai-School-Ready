import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "For Business Offices",
  description: "Payment terms, accepted methods, W-9, and vendor details for school and district purchasing.",
};

export default function BusinessOfficesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">For business offices</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Everything your purchasing process needs on one page. We work with
            school accounts payable every week; this should be the easy part.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-lg font-semibold text-navy">Payment terms</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><strong className="text-navy">Terms:</strong> Net 30 from invoice date</li>
              <li><strong className="text-navy">Purchase orders:</strong> accepted; reference your PO number on the invoice request and it appears on all documents</li>
              <li><strong className="text-navy">Quotes:</strong> generated instantly when you submit an invoice request; formal PDF emailed to your billing contact</li>
            </ul>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-lg font-semibold text-navy">Accepted methods</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Purchase order / invoice (Net 30)</li>
              <li>ACH / bank transfer</li>
              <li>Paper check through accounts payable</li>
              <li>Credit card (online checkout or invoice link)</li>
            </ul>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-lg font-semibold text-navy">Vendor documents</h2>
            <p className="mt-3 text-sm text-muted">
              W-9 available for download below. Vendor forms and sole-source
              letters: email us and we&apos;ll return them within two school
              days.
            </p>
            <a
              href="/vendor/w9-placeholder.pdf"
              className="mt-4 inline-block rounded-btn bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Download W-9 (PDF)
            </a>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-lg font-semibold text-navy">Vendor contact</h2>
            <p className="mt-3 text-sm text-muted">
              AI-Ready School · {site.founders.display}
              <br />
              Email:{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal hover:underline">
                {site.contactEmail}
              </a>
            </p>
            <p className="mt-3 text-sm text-muted">
              What you&apos;re buying: an annual School Membership covering one
              school building, up to {site.schoolSeatLimit} staff accounts,
              all-access to the PD kit library including new releases during
              the term.
            </p>
          </div>
        </div>
        <div className="section-inner mt-10 max-w-4xl text-center">
          <Link
            href="/invoice-request"
            className="rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Request a quote / invoice
          </Link>
        </div>
      </section>
    </>
  );
}
