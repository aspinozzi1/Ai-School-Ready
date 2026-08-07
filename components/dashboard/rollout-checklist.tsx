"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RolloutStep } from "@/lib/types";
import { toggleRolloutStep } from "@/lib/actions/rollout";

export function RolloutChecklist({ steps }: { steps: RolloutStep[] }) {
  const [items, setItems] = useState(steps);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const done = items.filter((s) => s.is_complete).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  function toggle(step: RolloutStep) {
    const next = !step.is_complete;
    setItems((prev) =>
      prev.map((s) => (s.id === step.id ? { ...s, is_complete: next } : s))
    );
    setPendingId(step.id);
    startTransition(async () => {
      const res = await toggleRolloutStep(step.id, next);
      if (!res.ok) {
        // Revert on failure.
        setItems((prev) =>
          prev.map((s) => (s.id === step.id ? { ...s, is_complete: !next } : s))
        );
      }
      setPendingId(null);
    });
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {done} of {items.length} steps complete
          </span>
          <span className="text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <ol className="space-y-2">
        {items.map((step, i) => (
          <li key={step.id}>
            <button
              type="button"
              onClick={() => toggle(step)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-secondary/40",
                step.is_complete && "border-accent/40 bg-accent/5"
              )}
              aria-pressed={step.is_complete}
            >
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  step.is_complete
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-muted-foreground/40 text-transparent"
                )}
              >
                {pendingId === step.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  step.is_complete ? "text-muted-foreground line-through" : "text-foreground"
                )}
              >
                <span className="mr-1 text-muted-foreground">{i + 1}.</span>
                {step.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
