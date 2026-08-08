import Link from "next/link";
import type { Metadata } from "next";
import { tracks } from "@/lib/catalog";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "A sequenced 20-kit AI curriculum for K-12 educators across four tracks, from safety foundations to a year-long integration roadmap.",
};

export default function CurriculumPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">The curriculum</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Twenty kits across four tracks, built in order so each session
            stands on the last. Track A is live now; the library grows all
            year, and every release is included in your membership.
          </p>
        </div>
      </section>

      {tracks.map((track, ti) => (
        <section
          key={track.key}
          className={`section ${ti % 2 === 0 ? "bg-paper" : "bg-white"}`}
        >
          <div className="section-inner">
            <h2 className="text-2xl font-bold text-navy">{track.title}</h2>
            <p className="mt-2 max-w-2xl text-muted">{track.blurb}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {track.kits.map((kit) => (
                <article
                  key={kit.n}
                  className="flex flex-col rounded-card border border-mist bg-white p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                      {kit.n}
                    </span>
                    <h3 className="font-semibold leading-snug text-navy">
                      {kit.title}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {kit.summary}
                  </p>
                  {kit.objectives.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-sm text-ink">
                      {kit.objectives.map((o) => (
                        <li key={o} className="flex gap-2">
                          <span aria-hidden className="text-teal">✓</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5">
                    {kit.status === "released" ? (
                      <span className="inline-block rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                        Available now
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-navy">
                        In production · included in your membership as it releases
                      </span>
                    )}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section bg-navy text-white">
        <div className="section-inner text-center">
          <h2 className="text-3xl font-bold">
            Complete Track A. Earn the certificate.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-mist">
            Every educator who completes Kits 1 through 8 earns the{" "}
            {site.certificate.name}: real documentation of real professional
            learning. {site.certificate.disclaimer}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90">
              See Membership Plans
            </Link>
            <Link href="/free" className="rounded-btn border border-mist/40 px-6 py-3 font-semibold text-white hover:bg-white/5">
              Get free sample pages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
