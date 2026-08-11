"use client";

import { useActionState, useState } from "react";
import { createPrompt, type PromptResult } from "@/lib/actions/prompts";
import { deIdentificationNudge } from "@/lib/prompts";
import { PromptFields } from "@/components/prompts/prompt-fields";

/**
 * Add a prompt to the library. The de-identification notice is a fixture of
 * this form: it renders above the fields every time, and saving requires the
 * confirmation, because a shared library is exactly where a student name
 * would do the most damage.
 */
export function PromptForm({ isPersonal }: { isPersonal: boolean }) {
  const [open, setOpen] = useState(false);
  const [result, formAction, pending] = useActionState<PromptResult | null, FormData>(
    createPrompt,
    null
  );

  if (!open) {
    return (
      <div className="rounded-card border border-mist bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-navy">Add a prompt</h2>
            <p className="mt-1 text-sm text-muted">
              {isPersonal
                ? "Save a prompt that worked, so you never rebuild it from scratch."
                : "Share a prompt that worked. Nobody at your school solves the same problem twice."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            Add a prompt
          </button>
        </div>
        {result?.ok ? (
          <p className="mt-4 rounded-btn bg-teal/10 px-4 py-3 text-sm text-navy">
            {result.message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-card border border-mist bg-white p-7">
      <h2 className="text-lg font-bold text-navy">Add a prompt</h2>

      <div className="mt-4 rounded-btn border-l-4 border-amber bg-amber/10 px-4 py-3">
        <p className="text-sm font-semibold text-navy">
          {deIdentificationNudge.heading}
        </p>
        <p className="mt-1 text-sm text-navy/80">{deIdentificationNudge.body}</p>
      </div>

      <form action={formAction} className="mt-5 space-y-4">
        <PromptFields idPrefix="new" />

        <label className="flex items-start gap-3 text-sm text-navy">
          <input
            type="checkbox"
            name="deidentified"
            required
            className="mt-0.5 h-4 w-4 accent-teal"
          />
          <span>
            This prompt contains no student names or identifying details.
          </span>
        </label>

        {result && !result.ok ? (
          <p className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">
            {result.message}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save to library"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
