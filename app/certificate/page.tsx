import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { site } from "@/config/site";
import {
  certificateEarnedAt,
  completedTrackACount,
  isCertificateEarned,
  recordableKits,
  trackASlugs,
  type ProgressRow,
} from "@/lib/progress";
import {
  NameForm,
  PrintButton,
} from "@/components/certificate/certificate-actions";
import { SelfProgress } from "@/components/certificate/self-progress";
import { CertificateSheet } from "@/components/certificate/certificate-sheet";

export const metadata: Metadata = {
  title: "Your progress and certificate",
  description:
    "Track A progress and the AI-Ready Educator Certificate of Completion.",
};

export default async function CertificatePage() {
  const user = isSupabaseConfigured ? await getSessionUser() : null;

  if (!user || !user.hasActiveAccess) {
    return (
      <section className="section bg-paper">
        <div className="mx-auto w-full max-w-md rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">
            Sign in to see your progress
          </h1>
          <p className="mt-3 text-sm text-muted">
            Your certificate lives here once you have completed all{" "}
            {trackASlugs.length} core kits.
          </p>
          <Link
            href={user ? "/pricing" : "/login?next=/certificate"}
            className="mt-7 block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            {user ? "See memberships" : "Sign in"}
          </Link>
        </div>
      </section>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: rows } = await supabase!
    .from("pd_progress")
    .select("*")
    .eq("profile_id", user.id)
    .returns<ProgressRow[]>();

  const progress = rows ?? [];
  const completedSlugs = new Set(progress.map((r) => r.kit_slug));
  const count = completedTrackACount(completedSlugs);
  const earned = isCertificateEarned(completedSlugs);
  const earnedAt = certificateEarnedAt(progress);

  const displayName = user.profile.full_name?.trim() || "";
  const isIndividual = !user.profile.org_id;

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-3xl">
        {earned ? (
          <>
            <div className="no-print text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">
                Track A complete
              </p>
              <h1 className="mt-2 text-3xl font-bold text-navy">
                Your certificate is ready
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                All {trackASlugs.length} core kits are recorded. Print it, or
                save it as a PDF for your district PD records.
              </p>
            </div>

            <CertificateSheet
              name={displayName || user.email}
              earnedAt={earnedAt}
            />

            <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
              <PrintButton />
              <Link
                href="/library"
                className="rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white"
              >
                Back to the library
              </Link>
            </div>

            <div className="no-print mx-auto mt-8 max-w-xl rounded-card border border-mist bg-white p-6">
              <p className="text-sm font-semibold text-navy">
                {displayName ? "Name on the certificate" : "Add your name first"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {displayName
                  ? "Change it here if it should read differently."
                  : "We only have your email on file, and that is what will print."}
              </p>
              <NameForm current={displayName} />
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">
                Your progress
              </p>
              <h1 className="mt-2 text-3xl font-bold text-navy">
                {count} of {trackASlugs.length} core kits complete
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                {isIndividual
                  ? "Tick each session off as you complete it. Finishing all of Track A earns the certificate."
                  : "Your school admin records each session on the school dashboard. Finishing all of Track A earns the certificate."}
              </p>
            </div>

            <div className="mt-8 rounded-card border border-mist bg-white p-7">
              <SelfProgress
                profileId={user.id}
                kits={recordableKits.map((k) => ({
                  n: k.n,
                  slug: k.slug,
                  title: k.title,
                }))}
                completed={Array.from(completedSlugs)}
                selfServe={isIndividual}
              />
              <p className="mt-5 text-xs text-muted">
                {site.certificate.name}. {site.certificate.disclaimer}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
