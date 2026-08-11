"use client";

import { useState, useTransition } from "react";
import { createInvoiceForQuote, setQuoteStatus } from "@/lib/actions/invoices";

/**
 * The quote queue's actions: issue a Stripe invoice for a School Membership,
 * or move the request along by hand. Paying that invoice provisions the
 * school automatically, so this is the only manual step in a PO sale.
 */
export function QuoteActions({
  quoteId,
  status,
  stripeInvoiceId,
}: {
  quoteId: string;
  status: string;
  stripeInvoiceId: string | null;
}) {
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    hostedUrl?: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  function issue() {
    if (
      !window.confirm(
        "Create and send a School Membership invoice to this contact?"
      )
    ) {
      return;
    }
    startTransition(async () => {
      setResult(await createInvoiceForQuote(quoteId));
    });
  }

  function mark(next: "quoted" | "won" | "closed") {
    startTransition(async () => {
      setResult(await setQuoteStatus(quoteId, next));
    });
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {!stripeInvoiceId ? (
          <button
            type="button"
            onClick={issue}
            disabled={pending}
            className="rounded-btn bg-teal px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Working…" : "Create invoice"}
          </button>
        ) : (
          <span className="rounded-btn bg-paper px-3 py-1.5 text-xs font-semibold text-muted ring-1 ring-mist">
            Invoice {stripeInvoiceId}
          </span>
        )}

        {status !== "won" ? (
          <button
            type="button"
            onClick={() => mark("won")}
            disabled={pending}
            className="rounded-btn bg-paper px-3 py-1.5 text-xs font-semibold text-navy ring-1 ring-mist hover:bg-white disabled:opacity-50"
          >
            Mark won
          </button>
        ) : null}

        {status !== "closed" ? (
          <button
            type="button"
            onClick={() => mark("closed")}
            disabled={pending}
            className="rounded-btn bg-paper px-3 py-1.5 text-xs font-semibold text-muted ring-1 ring-mist hover:bg-white disabled:opacity-50"
          >
            Close
          </button>
        ) : null}
      </div>

      {result ? (
        <p
          className={`mt-2 text-xs ${result.ok ? "text-teal" : "text-red-700"}`}
        >
          {result.message}
          {result.hostedUrl ? (
            <>
              {" "}
              <a
                href={result.hostedUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                View invoice
              </a>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
