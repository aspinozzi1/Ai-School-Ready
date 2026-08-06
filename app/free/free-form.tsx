"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { captureLead, type FreeResult } from "./actions";
import { samplePrompts } from "@/lib/sample-prompts";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="animate-spin" /> Sending…
        </>
      ) : (
        "Send me the prompts"
      )}
    </Button>
  );
}

export function FreeForm() {
  const [state, formAction] = useActionState<FreeResult | null, FormData>(
    captureLead,
    null
  );

  if (state?.ok) {
    return (
      <div>
        <Alert variant="success" className="mb-8">
          <CheckCircle2 />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
        <div className="space-y-4">
          {samplePrompts.map((p, i) => (
            <div key={p.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-primary">
                  {i + 1}. {p.title}
                </h3>
                <span className="text-xs text-muted-foreground">{p.grade}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap rounded-md bg-secondary/60 p-3 text-sm text-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Your email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@school.edu"
          aria-describedby="email-help"
        />
        <p id="email-help" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> We&apos;ll never share your email. No student data, ever.
        </p>
      </div>
      {state && !state.ok && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
