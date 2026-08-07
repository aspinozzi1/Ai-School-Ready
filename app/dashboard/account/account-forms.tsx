"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updateName, updatePassword, type ActionResult } from "./actions";

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="animate-spin" /> Saving…</> : label}
    </Button>
  );
}

function Feedback({ state }: { state: ActionResult | null }) {
  if (!state) return null;
  return (
    <Alert variant={state.ok ? "success" : "destructive"}>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

export function NameForm({ defaultName }: { defaultName: string }) {
  const [state, action] = useActionState<ActionResult | null, FormData>(updateName, null);
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" defaultValue={defaultName} required />
      </div>
      <Feedback state={state} />
      <SaveButton label="Save name" />
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState<ActionResult | null, FormData>(updatePassword, null);
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">At least 8 characters.</p>
      </div>
      <Feedback state={state} />
      <SaveButton label="Update password" />
    </form>
  );
}
