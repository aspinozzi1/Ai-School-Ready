"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { inviteTeachers, type InviteResult } from "@/lib/actions/staff";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="animate-spin" /> Sending invites…</> : <><Send /> Send invites</>}
    </Button>
  );
}

export function InviteForm() {
  const [state, action] = useActionState<InviteResult | null, FormData>(
    inviteTeachers,
    null
  );

  return (
    <form action={action} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="emails">Teacher emails</Label>
        <Textarea
          id="emails"
          name="emails"
          rows={4}
          placeholder="Paste emails separated by commas, spaces, or new lines&#10;jsmith@school.edu, mlee@school.edu"
          required
        />
        <p className="text-xs text-muted-foreground">
          Each teacher gets an invite link. Accepting joins them to your school with
          Cookbook access — no extra payment.
        </p>
      </div>
      {state && (
        <Alert variant={state.ok ? "success" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
