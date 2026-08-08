import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about memberships, district pricing, or purchase orders. We answer everything ourselves.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">Contact us</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            We&apos;re two full-time teachers, so email beats phone tag. We
            read everything and answer within two school days, usually faster.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">Email us</h2>
            <p className="mt-3 text-muted">
              For everything: memberships, district pricing, purchase orders,
              kit questions, press.
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-5 inline-block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
            >
              {site.contactEmail}
            </a>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              Fast paths for common asks
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <strong className="text-navy">Business office?</strong> Payment
                terms, W-9, and vendor details live on{" "}
                <Link href="/business-offices" className="font-semibold text-teal hover:underline">
                  For Business Offices
                </Link>
                .
              </li>
              <li>
                <strong className="text-navy">Need an invoice or PO?</strong>{" "}
                Use the{" "}
                <Link href="/invoice-request" className="font-semibold text-teal hover:underline">
                  invoice request form
                </Link>{" "}
                and a formal quote goes to your billing contact automatically.
              </li>
              <li>
                <strong className="text-navy">District or multiple schools?</strong>{" "}
                Say so in your email and we&apos;ll send district pricing.
              </li>
              <li>
                <strong className="text-navy">Just exploring?</strong> The{" "}
                <Link href="/free" className="font-semibold text-teal hover:underline">
                  free sample pack
                </Link>{" "}
                is the fastest way to judge us.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
