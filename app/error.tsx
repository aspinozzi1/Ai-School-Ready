"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in logs for debugging.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-primary">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        Sorry — an unexpected error occurred. You can try again, and if it keeps
        happening, please contact support.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <a href="/contact">Contact support</a>
        </Button>
      </div>
    </div>
  );
}
