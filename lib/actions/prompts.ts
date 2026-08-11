"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { gradeBands, subjects, taskTypes } from "@/lib/prompts";

export type PromptResult = { ok: boolean; message: string };

const taskTypeValues = taskTypes.map((t) => t.value) as [string, ...string[]];

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Give the prompt a short title so colleagues can find it.")
    .max(120, "Titles work best under 120 characters."),
  body: z
    .string()
    .trim()
    .min(20, "Paste the whole prompt, brackets and all.")
    .max(4000, "That's longer than a prompt needs to be (4,000 character limit)."),
  subject: z.enum(subjects).optional(),
  gradeBand: z.enum(gradeBands).optional(),
  taskType: z.enum(taskTypeValues),
});

function parse(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    subject: formData.get("subject") || undefined,
    gradeBand: formData.get("gradeBand") || undefined,
    taskType: formData.get("taskType") || "other",
  });
}

/**
 * Add a prompt to the library. School members write into their school's
 * shared library; Individual members write into their personal one (org_id
 * null). RLS enforces both, so a tampered form can't cross that line.
 */
export async function createPrompt(
  _prev: PromptResult | null,
  formData: FormData
): Promise<PromptResult> {
  const gate = await requireAccess("teacher");
  if (!gate.ok) {
    return { ok: false, message: "Sign in with an active membership to add prompts." };
  }

  if (formData.get("deidentified") !== "on") {
    return {
      ok: false,
      message:
        "Please confirm the prompt carries no student names or identifying details.",
    };
  }

  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }
  const p = parsed.data;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { error } = await supabase.from("prompts").insert({
    org_id: gate.user.profile.org_id,
    author_id: gate.user.id,
    title: p.title,
    body: p.body,
    subject: p.subject ?? null,
    grade_band: p.gradeBand ?? null,
    task_type: p.taskType,
    source: "staff",
  });

  if (error) {
    return { ok: false, message: "We couldn't save that prompt. Please try again." };
  }

  revalidatePath("/prompts");
  return { ok: true, message: "Saved to your library." };
}

/**
 * Edit a prompt. RLS limits this to the author, their school admin, or an
 * owner; the id is all the client sends, so there is nothing to spoof.
 */
export async function updatePrompt(
  id: string,
  formData: FormData
): Promise<PromptResult> {
  const gate = await requireAccess("teacher");
  if (!gate.ok) return { ok: false, message: "Sign in to edit prompts." };

  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }
  const p = parsed.data;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { error } = await supabase
    .from("prompts")
    .update({
      title: p.title,
      body: p.body,
      subject: p.subject ?? null,
      grade_band: p.gradeBand ?? null,
      task_type: p.taskType,
    })
    .eq("id", id);

  if (error) {
    return { ok: false, message: "We couldn't save that change." };
  }

  revalidatePath("/prompts");
  return { ok: true, message: "Prompt updated." };
}

/** Remove a prompt. Same permission rule as editing, enforced by RLS. */
export async function deletePrompt(id: string): Promise<PromptResult> {
  const gate = await requireAccess("teacher");
  if (!gate.ok) return { ok: false, message: "Sign in to delete prompts." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "We couldn't delete that prompt." };
  }

  revalidatePath("/prompts");
  return { ok: true, message: "Prompt deleted." };
}
