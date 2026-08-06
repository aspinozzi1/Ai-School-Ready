"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Starts a Stripe Checkout session for a product by POSTing to /api/checkout,
 * then redirects the browser to Stripe. Shows a clear error if something fails.
 * (The /api/checkout route is implemented in the payments phase.)
 */
export function CheckoutButton({
  product,
  children,
  ...buttonProps
}: {
  product: "teacher_kit" | "school_license";
  children: React.ReactNode;
} & ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout. Please try again.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Button
        {...buttonProps}
        onClick={startCheckout}
        disabled={loading}
        className={buttonProps.className}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Redirecting…
          </>
        ) : (
          children
        )}
      </Button>
      {error && (
        <p className="mt-2 text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
