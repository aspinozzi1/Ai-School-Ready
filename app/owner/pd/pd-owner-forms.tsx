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
  createCourse,
  createLesson,
  deleteCourse,
  type PdResult,
} from "@/lib/actions/pd";
import { PILLAR_NAMES, COURSE_AUDIENCES } from "@/config/pillars";

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

function Feedback({ state }: { state: PdResult | null }) {
  if (!state) return null;
  return (
    <Alert variant={state.ok ? "success" : "destructive"}>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

export function AddCourseForm() {
  const [state, action] = useActionState<PdResult | null, FormData>(createCourse, null);
  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="c-pillar">Pillar</Label>
          <select id="c-pillar" name="pillar" className={selectCls} defaultValue={PILLAR_NAMES[0]}>
            {PILLAR_NAMES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-audience">Audience</Label>
          <select id="c-audience" name="audience" className={selectCls} defaultValue="All staff">
            {COURSE_AUDIENCES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="c-title">Title</Label>
          <Input id="c-title" name="title" required />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="c-summary">Summary</Label>
          <Input id="c-summary" name="summary" placeholder="One line describing the course" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-min">Estimated minutes</Label>
          <Input id="c-min" name="est_minutes" type="number" min={1} defaultValue={30} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-role">Minimum role</Label>
          <select id="c-role" name="min_role" className={selectCls} defaultValue="teacher">
            <option value="teacher">Teacher</option>
            <option value="school_admin">School Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>
      <input type="hidden" name="sort_order" value={0} />
      <Feedback state={state} />
      <SubmitButton label="Add course" />
    </form>
  );
}

export function AddLessonForm({ courses }: { courses: { id: string; title: string }[] }) {
  const [state, action] = useActionState<PdResult | null, FormData>(createLesson, null);
  return (
    <form action={action} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="l-course">Course</Label>
        <select id="l-course" name="course_id" className={selectCls} required defaultValue="">
          <option value="" disabled>Choose a course…</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
        <div className="space-y-1.5">
          <Label htmlFor="l-title">Lesson title</Label>
          <Input id="l-title" name="title" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="l-order">Order</Label>
          <Input id="l-order" name="sort_order" type="number" defaultValue={0} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="l-body">Lesson content (script)</Label>
        <Textarea id="l-body" name="body" rows={6} required placeholder="The scripted, self-paced lesson content teachers will read." />
      </div>
      <Feedback state={state} />
      <SubmitButton label="Add lesson" />
    </form>
  );
}

export function DeleteCourseButton({ id, label }: { id: string; label: string }) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!confirm(`Delete "${label}" and all its lessons? This can't be undone.`)) return;
    setLoading(true);
    await deleteCourse(id);
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
