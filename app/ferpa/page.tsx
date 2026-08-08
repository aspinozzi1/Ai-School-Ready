import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "FERPA & student privacy",
  description: "AI-Ready School stores no student information, and every kit teaches privacy-first AI practice.",
};

export default function FerpaPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">FERPA &amp; student privacy</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            The short version: we never touch student data, and we teach your
            staff not to either.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-8">
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              The platform stores no student information
            </h2>
            <p className="mt-3 text-muted">
              AI-Ready School serves adult educators only. There are no student
              accounts, no fields that capture information about K-12 students,
              and no student-facing features. The data we hold is limited to
              educator accounts (name, school email, progress through the
              kits) and school billing details. There is simply nothing here
              for a student-data review to review, which is exactly how we
              designed it.
            </p>
          </div>
          <div className="rounded-card bg-navy p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              The one hard rule
            </p>
            <p className="mt-3 text-2xl font-bold leading-snug">
              Never put student personally identifiable information into a
              public AI tool.
            </p>
            <p className="mt-4 text-sm text-mist">
              This is the first thing our curriculum teaches, in Kit 1, before
              any productivity technique. Every later kit reinforces it:
              de-identification habits, the &quot;could anyone who knows our
              school figure out who this is?&quot; test, and the rule that a
              human reviews everything AI-drafted before it reaches a student
              or family.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">
              Designed to be district-approvable
            </h2>
            <p className="mt-3 text-muted">
              Kits are tool-agnostic and require no student accounts on any AI
              platform. Sessions practice on teacher tasks: newsletters,
              rubrics, leveled texts, never on student records. Exit tickets
              double as PD documentation for your files, and the Admin
              One-Pager in every kit gives your district office the research
              base and scope at a glance.
            </p>
          </div>
          <div className="rounded-card border border-mist bg-white p-8">
            <h2 className="text-xl font-semibold text-navy">Questions</h2>
            <p className="mt-3 text-muted">
              Privacy questions to{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal hover:underline">
                {site.contactEmail}
              </a>
              . We answer them ourselves.
            </p>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            {site.legal.notLegalAdvice}
          </p>
        </div>
      </section>
    </>
  );
}
