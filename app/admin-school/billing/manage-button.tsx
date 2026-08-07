"use client";

import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortalSession } from "@/lib/actions/billing";

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    setLoading(true);
    setError(null);
    const res = await createPortalSession();
    if (!res.ok || !res.url) {
      setError(res.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }
    window.location.href = res.url;
  }

  return (
    <div>
      <Button onClick={open} disabled={loading}>
        {loading ? (
          <><Loader2 className="animate-spin" /> Opening…</>
        ) : (
          <><ExternalLink /> Manage subscription</>
        )}
      </Button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
