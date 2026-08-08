import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "Affiliate disclosure, independence statement, and how our kits are made.",
};

export default function DisclosuresPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">Disclosures</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Plain statements of how we make money, whose products we mention,
            and how our content is made.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-8">
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">Affiliate links</h2>
            <p className="mt-3 text-muted">{site.legal.affiliateDisclosure}</p>
            <p className="mt-3 text-muted">
              As of today, no links on this site are affiliate links. If that
              changes, affected pages will carry the disclosure above directly
              beside the links, and this page will say so.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">Independence</h2>
            <p className="mt-3 text-muted">
              Third-party tools mentioned anywhere on this site or in our kits
              (including ChatGPT, Claude, Gemini, Copilot, and MagicSchool) are
              referenced factually for educational purposes. We have no
              partnership, sponsorship, or endorsement relationship with any AI
              tool vendor, and no vendor pays for placement in our kits or our
              tool library. Our reviews include real limitations because that
              is what makes them useful.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              How our kits are made
            </h2>
            <p className="mt-3 text-muted">
              Every AI-Ready School kit is drafted with AI assistance, the same
              way we teach educators to use it, then researched, fact-checked,
              revised, and approved by Adam and Katelyn Spinozzi, certified
              educators with 20+ combined years in classrooms. Nothing ships
              without a teacher&apos;s judgment on it.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              Certificates and legal content
            </h2>
            <p className="mt-3 text-muted">
              Certificates issued by this platform are Certificates of
              Completion. They do not confer CEUs, clock hours, or
              license-renewal credit by themselves; check with your district or
              state whether this PD qualifies for local credit.
            </p>
            <p className="mt-3 text-muted">{site.legal.notLegalAdvice}</p>
          </div>
        </div>
      </section>
    </>
  );
}
