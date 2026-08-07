import Link from "next/link";
import { site } from "@/config/site";

/** Phase 0 placeholder home; Phase 1 replaces this with the full page. */
export default function HomePage() {
  return (
    <section className="section">
      <div className="section-inner max-w-3xl py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
          Launching this school year
        </p>
        <h1 className="mt-4 text-4xl font-bold text-navy md:text-5xl">
          Professional development your school runs itself.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/pricing"
            className="rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            See Membership Plans
          </Link>
          <Link
            href="/curriculum"
            className="rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Browse the Curriculum
          </Link>
        </div>
      </div>
    </section>
  );
}
