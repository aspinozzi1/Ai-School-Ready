"use client";

import { useActionState } from "react";
import { Printer } from "lucide-react";
import { setFullName, type NameResult } from "@/lib/actions/profile";

/** Opens the browser print dialog, where "Save as PDF" is the destination. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
    >
      <Printer className="h-4 w-4" /> Download or print
    </button>
  );
}

/**
 * Shown when a member has earned the certificate but has no name on file.
 * The certificate prints whatever this sets, so it belongs to the member.
 */
export function NameForm({ current }: { current: string }) {
  const [result, formAction, pending] = useActionState<NameResult | null, FormData>(
    setFullName,
    null
  );

  return (
    <form
      action={formAction}
      className="no-print mt-4 flex flex-wrap items-end gap-3"
    >
      <div className="min-w-60 flex-1">
        <label
          htmlFor="fullName"
          className="mb-1 block text-sm font-semibold text-navy"
        >
          Name as it should read on the certificate
        </label>
        <input
          id="fullName"
          name="fullName"
          defaultValue={current}
          required
          maxLength={80}
          className="w-full rounded-btn border border-mist bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-teal"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-btn bg-paper px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-mist hover:bg-white disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save name"}
      </button>
      {result ? (
        <p
          className={`w-full text-sm ${result.ok ? "text-teal" : "text-red-700"}`}
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
