"use client";

import { useState, useTransition } from "react";
import { setCompletion } from "@/lib/actions/progress";

export interface RosterMember {
  id: string;
  name: string;
}

export interface RosterKit {
  n: number;
  slug: string;
  title: string;
}

/**
 * The attendance roster: one row per educator, one column per released kit.
 * School admins tick a box when a teacher completes a session, which is the
 * record the certificate is built from.
 */
export function ProgressRoster({
  members,
  kits,
  completed,
  readOnly = false,
}: {
  members: RosterMember[];
  kits: RosterKit[];
  completed: Record<string, string[]>;
  readOnly?: boolean;
}) {
  const [rows, setRows] = useState<Record<string, string[]>>(completed);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function toggle(profileId: string, slug: string, next: boolean) {
    setRows((prev) => {
      const current = new Set(prev[profileId] ?? []);
      if (next) current.add(slug);
      else current.delete(slug);
      return { ...prev, [profileId]: Array.from(current) };
    });

    startTransition(async () => {
      const result = await setCompletion(profileId, slug, next);
      if (!result.ok) {
        setError(result.message ?? "That didn't save.");
        // Put the box back where it was.
        setRows((prev) => {
          const current = new Set(prev[profileId] ?? []);
          if (next) current.delete(slug);
          else current.add(slug);
          return { ...prev, [profileId]: Array.from(current) };
        });
      } else {
        setError(null);
      }
    });
  }

  const total = kits.length;

  return (
    <div>
      {error ? (
        <p className="mb-3 rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white py-2 pr-3 text-left font-semibold text-navy">
                Educator
              </th>
              {kits.map((k) => (
                <th
                  key={k.slug}
                  scope="col"
                  title={k.title}
                  className="px-2 py-2 text-center text-xs font-semibold text-muted"
                >
                  {k.n}
                </th>
              ))}
              <th className="py-2 pl-3 text-right text-xs font-semibold text-muted">
                Done
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const done = rows[m.id] ?? [];
              return (
                <tr key={m.id} className="border-t border-mist">
                  <td className="sticky left-0 bg-white py-2 pr-3 text-navy">
                    {m.name}
                  </td>
                  {kits.map((k) => {
                    const checked = done.includes(k.slug);
                    return (
                      <td key={k.slug} className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={readOnly}
                          onChange={(e) => toggle(m.id, k.slug, e.target.checked)}
                          aria-label={`${m.name}, Kit ${k.n}: ${k.title}`}
                          className="h-4 w-4 accent-teal disabled:opacity-40"
                        />
                      </td>
                    );
                  })}
                  <td className="py-2 pl-3 text-right text-xs font-semibold text-muted">
                    {done.filter((s) => kits.some((k) => k.slug === s)).length}/
                    {total}
                    {done.filter((s) => kits.some((k) => k.slug === s)).length ===
                    total ? (
                      <span className="ml-2 rounded-full bg-teal/15 px-2 py-0.5 text-teal">
                        Certificate
                      </span>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted">
        Columns are kit numbers; hover a number for its title. Tick a box when
        that educator completes the session. Completing all {total} earns the
        certificate.
      </p>
    </div>
  );
}
