import { site } from "@/config/site";
import { LogoMark } from "@/components/brand/logo";
import { formatCompletionDate } from "@/lib/progress";

/**
 * The printable certificate. Brand fixtures only, and no claim beyond
 * completion: the name and the local-credit disclaimer both come from
 * config/site.ts so the legal wording has one home.
 */
export function CertificateSheet({
  name,
  earnedAt,
}: {
  name: string;
  earnedAt: string | null;
}) {
  return (
    <div className="certificate-sheet mt-8 rounded-card border-4 border-navy bg-white px-10 py-12 text-center">
      <LogoMark className="mx-auto h-14 w-auto" />

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
        {site.name}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
        {site.certificate.name}
      </h2>

      <p className="mt-8 text-sm uppercase tracking-wide text-muted">
        This certifies that
      </p>
      <p className="mx-auto mt-2 max-w-lg border-b-2 border-mist pb-3 text-3xl font-bold text-navy">
        {name}
      </p>

      <p className="mx-auto mt-6 max-w-xl text-sm text-ink">
        has completed all eight sessions of Track A: AI Foundations, covering
        AI safety and student privacy, prompting, planning and differentiation,
        assessment, academic integrity, family communication, workload, and
        building a school AI culture.
      </p>

      {earnedAt ? (
        <p className="mt-6 text-sm font-semibold text-navy">
          Completed {formatCompletionDate(earnedAt)}
        </p>
      ) : null}

      <div className="mt-10 flex justify-center">
        <div className="w-72 border-t border-navy pt-2">
          <p className="text-sm font-semibold text-navy">
            {site.founders.display}
          </p>
          <p className="text-xs text-muted">Founders, {site.name}</p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-xs text-muted">
        {site.certificate.disclaimer}
      </p>
    </div>
  );
}
