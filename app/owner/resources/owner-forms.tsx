"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  createRecipe,
  createResource,
  deleteRecipe,
  deleteResource,
  type OwnerResult,
} from "@/lib/actions/owner";

const selectCls =
  "flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="animate-spin" /> Saving…</> : <><Plus /> {label}</>}
    </Button>
  );
}

function Feedback({ state }: { state: OwnerResult | null }) {
  if (!state) return null;
  return (
    <Alert variant={state.ok ? "success" : "destructive"}>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

export function AddRecipeForm() {
  const [state, action] = useActionState<OwnerResult | null, FormData>(createRecipe, null);
  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="r-title">Title</Label>
          <Input id="r-title" name="title" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-category">Category</Label>
          <Input id="r-category" name="category" placeholder="Planning, Assessment…" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-grade">Grade band</Label>
          <Input id="r-grade" name="grade_band" placeholder="K-2, 3-5, All grades…" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-role">Minimum role</Label>
          <select id="r-role" name="min_role" className={selectCls} defaultValue="teacher">
            <option value="teacher">Teacher</option>
            <option value="school_admin">School Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-summary">Summary</Label>
        <Input id="r-summary" name="summary" placeholder="One line describing the prompt" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-prompt">Prompt text</Label>
        <Textarea id="r-prompt" name="prompt_text" rows={4} required />
      </div>
      <Feedback state={state} />
      <SubmitButton label="Add recipe" />
    </form>
  );
}

export function AddResourceForm() {
  const [state, action] = useActionState<OwnerResult | null, FormData>(createResource, null);
  const [type, setType] = useState<"file" | "link">("file");

  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="res-title">Title</Label>
          <Input id="res-title" name="title" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="res-category">Category</Label>
          <Input id="res-category" name="category" placeholder="Governance, Training…" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="res-role">Minimum role</Label>
          <select id="res-role" name="min_role" className={selectCls} defaultValue="teacher">
            <option value="teacher">Teacher</option>
            <option value="school_admin">School Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="res-type">Type</Label>
          <select
            id="res-type"
            name="type"
            className={selectCls}
            value={type}
            onChange={(e) => setType(e.target.value as "file" | "link")}
          >
            <option value="file">File upload</option>
            <option value="link">External link</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="res-desc">Description</Label>
        <Input id="res-desc" name="description" placeholder="Shown under the title" />
      </div>
      {type === "file" ? (
        <div className="space-y-1.5">
          <Label htmlFor="res-file">File</Label>
          <Input id="res-file" name="file" type="file" />
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label htmlFor="res-url">URL</Label>
          <Input id="res-url" name="link_url" type="url" placeholder="https://…" />
        </div>
      )}
      <Feedback state={state} />
      <SubmitButton label="Add resource" />
    </form>
  );
}

export function DeleteButton({
  id,
  kind,
  label,
}: {
  id: string;
  kind: "recipe" | "resource";
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${label}"? This can't be undone.`)) return;
    setLoading(true);
    if (kind === "recipe") await deleteRecipe(id);
    else await deleteResource(id);
    setLoading(false);
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleDelete}
      disabled={loading}
      aria-label={`Delete ${label}`}
      className="text-muted-foreground hover:text-destructive"
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </Button>
  );
}
