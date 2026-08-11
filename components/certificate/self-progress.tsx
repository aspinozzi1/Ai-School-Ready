"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { setCompletion } from "@/lib/actions/progress";

export interface SelfProgressKit {
  n: number;
  slug: string;
  title: string;
}

/**
 * An educator's own Track A progress.
 *
 * Individual members tick their own boxes; there is nobody else to do it.
 * School members see the same list read-only, because their admin's record is
 * the source of truth. That split is the locked product decision, enforced in
 * the server action and in RLS; here it is just how the list renders.
 */
export function SelfProgress({
  profileId,
  kits,
  completed,
  selfServe,
}: {
  profileId: string;
  kits: SelfProgressKit[];
  completed: string[];
  selfServe: boolean;
}) {
  const [done, setDone] = useState<string[]>(completed);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function toggle(slug: string, next: boolean) {
    setDone((prev) =>
      next ? [...prev, slug] : prev.filter((s) => s !== slug)
    );
    startTransition(async () => {
      const result = await setCompletion(profileId, slug, next);
      if (!result.ok) {
        setError(result.message ?? "That didn't save.");
        setDone((prev) =>
          next ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
      } else {
        setError(null);
      }
    });
  }

  return (
    <div>
      {error ? (
        <p className="mb-3 rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <ul className="space-y-2">
        {kits.map((k) => {
          const isDone = done.includes(k.slug);
          return (
            <li key={k.slug}>
              {selfServe ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-btn border border-mist bg-white px-4 py-3 text-sm hover:border-teal">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={(e) => toggle(k.slug, e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-teal"
                  />
                  <span className={isDone ? "text-muted" : "text-navy"}>
                    <span className="font-semibold">Kit {k.n}:</span> {k.title}
                  </span>
                </label>
              ) : (
                <div className="flex items-start gap-3 rounded-btn border border-mist bg-white px-4 py-3 text-sm">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm ${
                      isDone ? "bg-teal text-white" : "ring-1 ring-mist"
                    }`}
                    aria-hidden
                  >
                    {isDone ? <Check className="h-3 w-3" /> : null}
                  </span>
                  <span className={isDone ? "text-muted" : "text-navy"}>
                    <span className="font-semibold">Kit {k.n}:</span> {k.title}
                    <span className="sr-only">
                      {isDone ? " (complete)" : " (not yet recorded)"}
                    </span>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
