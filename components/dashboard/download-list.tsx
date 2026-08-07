"use client";

import { useState } from "react";
import { Download, Loader2, ExternalLink, FileText, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDownloadUrl } from "@/lib/actions/downloads";
import type { Resource } from "@/lib/types";

/** Groups resources by category and lets the user download each (signed URL). */
export function DownloadList({ resources }: { resources: Resource[] }) {
  const grouped = resources.reduce<Record<string, Resource[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {category}
          </h2>
          <div className="space-y-3">
            {items.map((r) => (
              <DownloadRow key={r.id} resource={r} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DownloadRow({ resource }: { resource: Resource }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    const res = await getDownloadUrl(resource.id);
    setLoading(false);
    if (!res.ok || !res.url) {
      setError(res.error ?? "Could not open this file.");
      return;
    }
    window.open(res.url, "_blank", "noopener,noreferrer");
  }

  const isLink = resource.type === "link";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground">
          {isLink ? <LinkIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-foreground">{resource.title}</p>
            {resource.min_role === "school_admin" && (
              <Badge variant="muted">Admin</Badge>
            )}
          </div>
          {resource.description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{resource.description}</p>
          )}
          {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </div>
      </div>
      <Button onClick={handleDownload} disabled={loading} size="sm" className="shrink-0">
        {loading ? (
          <><Loader2 className="animate-spin" /> Opening…</>
        ) : isLink ? (
          <><ExternalLink /> Open</>
        ) : (
          <><Download /> Download</>
        )}
      </Button>
    </div>
  );
}
