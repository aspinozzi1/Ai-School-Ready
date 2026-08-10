"use client";

import { useActionState } from "react";
import { requestQuote, type QuoteResult } from "@/lib/actions/quotes";

const field =
  "w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal";

export function QuoteForm() {
  const [result, formAction, pending] = useActionState<QuoteResult | null, FormData>(
    requestQuote,
    null
  );

  if (result?.ok) {
    return (
      <div className="rounded-btn bg-teal/10 px-5 py-4 text-sm text-navy">
        {result.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="schoolName" className="mb-1 block text-sm font-semibold text-navy">
            School name *
          </label>
          <input id="schoolName" name="schoolName" required className={field} />
        </div>
        <div>
          <label htmlFor="district" className="mb-1 block text-sm font-semibold text-navy">
            District
          </label>
          <input id="district" name="district" className={field} />
        </div>
        <div>
          <label htmlFor="contactName" className="mb-1 block text-sm font-semibold text-navy">
            Billing contact name *
          </label>
          <input id="contactName" name="contactName" required className={field} />
        </div>
        <div>
          <label htmlFor="contactEmail" className="mb-1 block text-sm font-semibold text-navy">
            Billing contact email *
          </label>
          <input id="contactEmail" name="contactEmail" type="email" required className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="poNumber" className="mb-1 block text-sm font-semibold text-navy">
            PO number <span className="font-normal text-muted">(if you have one already)</span>
          </label>
          <input id="poNumber" name="poNumber" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-1 block text-sm font-semibold text-navy">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className={field}
            placeholder="Anything your business office needs from us (W-9, vendor forms, sole-source letter)…"
          />
        </div>
      </div>

      {result && !result.ok ? (
        <p className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Request the quote"}
      </button>
    </form>
  );
}
