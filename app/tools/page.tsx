import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Tool Library",
  description: "A curated, honestly reviewed directory of AI tools for educators, with privacy notes on every entry.",
};

export default function ToolsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">AI Tool Library</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            A curated directory with honest educator reviews: what each tool is
            good for, a real limitation, pricing, and privacy notes. No
            pay-for-placement, ever.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl">
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              Opening at launch
            </h2>
            <p className="mt-3 text-muted">
              The library opens with our first reviewed set: tools for
              planning, assessment, communication, and accessibility, each with
              a two-to-three sentence honest review including a real
              limitation, a pricing badge, and a privacy note. Reviews are
              written by us, from classroom use, with no vendor involvement.
            </p>
            <p className="mt-3 text-sm text-muted">{site.legal.toolsPageNote}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/free" className="rounded-btn bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Get notified at launch
              </Link>
              <Link href="/disclosures" className="rounded-btn bg-paper px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-mist hover:bg-white">
                Read our independence policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
