"use client";

import { useState } from "react";

/**
 * Starts Stripe Checkout for a membership. When checkout isn't configured
 * yet, the API's friendly error is shown with the existing contact paths.
 */
export function CheckoutButton({
  product,
  className,
  children,
}: {
  product: "individual" | "school";
  className: string;
  children: React.ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Could not start checkout. Please try again.");
    } catch {
      setError("Could not start checkout. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div>
      <button type="button" onClick={start} disabled={busy} className={className}>
        {busy ? "Opening checkout…" : children}
      </button>
      {error ? (
        <p className="mt-2 text-center text-xs text-red-700">{error}</p>
      ) : null}
    </div>
  );
}
