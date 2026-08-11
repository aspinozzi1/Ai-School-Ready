import { tracks } from "@/lib/catalog";
import type { KitMeta } from "@/lib/catalog";

/**
 * PD progress and the certificate rule.
 *
 * Locked product decision: one capstone certificate, earned by completing all
 * of Track A. No per-kit certificates. Track A is the source of that rule, so
 * it is read from the catalog rather than restated here.
 */

export interface ProgressRow {
  id: string;
  profile_id: string;
  kit_slug: string;
  completed_at: string;
  recorded_by: string | null;
}

/** The eight core kits, in order. */
export const trackAKits: KitMeta[] =
  tracks.find((t) => t.key === "a")?.kits ?? [];

export const trackASlugs: string[] = trackAKits.map((k) => k.slug);

/** Kits an educator can be marked complete on today. */
export const recordableKits: KitMeta[] = trackAKits.filter(
  (k) => k.status === "released"
);

export function completedTrackACount(completed: Set<string>): number {
  return trackASlugs.filter((slug) => completed.has(slug)).length;
}

/** The certificate is earned only at 8 of 8. */
export function isCertificateEarned(completed: Set<string>): boolean {
  return trackASlugs.length > 0 && trackASlugs.every((s) => completed.has(s));
}

/** The date the certificate was earned: the last Track A kit completed. */
export function certificateEarnedAt(rows: ProgressRow[]): string | null {
  const trackARows = rows.filter((r) => trackASlugs.includes(r.kit_slug));
  if (!isCertificateEarned(new Set(trackARows.map((r) => r.kit_slug)))) {
    return null;
  }
  return trackARows
    .map((r) => r.completed_at)
    .sort()
    .at(-1) ?? null;
}

export function formatCompletionDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
