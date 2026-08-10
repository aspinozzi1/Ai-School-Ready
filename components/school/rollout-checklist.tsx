"use client";

import { useState, useTransition } from "react";
import { toggleRolloutStep } from "@/lib/actions/rollout";

export interface RolloutStepRow {
  id: string;
  title: string;
  is_complete: boolean;
  sort_order: number;
}

export function RolloutChecklist({ steps }: { steps: RolloutStepRow[] }) {
  const [local, setLocal] = useState(steps);
  const [, startTransition] = useTransition();

  function toggle(id: string, next: boolean) {
    setLocal((rows) =>
      rows.map((r) => (r.id === id ? { ...r, is_complete: next } : r))
    );
    startTransition(() => {
      void toggleRolloutStep(id, next);
    });
  }

  const done = local.filter((s) => s.is_complete).length;

  return (
    <div>
      <p className="text-sm text-muted">
        {done} of {local.length} complete
      </p>
      <ul className="mt-3 space-y-2">
        {local
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((step) => (
            <li key={step.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-btn border border-mist bg-white px-4 py-3 text-sm hover:border-teal">
                <input
                  type="checkbox"
                  checked={step.is_complete}
                  onChange={(e) => toggle(step.id, e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-teal"
                />
                <span
                  className={
                    step.is_complete ? "text-muted line-through" : "text-navy"
                  }
                >
                  {step.title}
                </span>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}
