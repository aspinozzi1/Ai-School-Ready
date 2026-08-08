import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Join",
  description: "Start an AI-Ready School membership.",
};

export default function SignupPage() {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-card border border-mist bg-white p-9">
          <h1 className="text-center text-2xl font-bold text-navy">
            Memberships open at launch
          </h1>
          <p className="mt-3 text-center text-sm text-muted">
            Online checkout goes live with the member library, within weeks.
            Two ways to be first in line:
          </p>
          <div className="mt-7 space-y-4">
            <div className="rounded-card bg-paper p-5">
              <h2 className="font-semibold text-navy">Schools</h2>
              <p className="mt-1 text-sm text-muted">
                Request a quote now and your membership activates the day we
                launch; your PO paperwork can run in parallel.
              </p>
              <Link href="/invoice-request" className="mt-3 inline-block rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Request a quote
              </Link>
            </div>
            <div className="rounded-card bg-paper p-5">
              <h2 className="font-semibold text-navy">Individual educators</h2>
              <p className="mt-1 text-sm text-muted">
                Email us and we&apos;ll notify you the morning checkout opens
                (${site.pricing.individual.priceYearly}/year).
              </p>
              <a href={`mailto:${site.contactEmail}?subject=Individual%20membership`} className="mt-3 inline-block rounded-btn bg-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
