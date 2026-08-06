"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAccess, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PILLAR_NAMES, COURSE_AUDIENCES } from "@/config/pillars";

export type PdResult = { ok: boolean; message: string };

const roleEnum = z.enum(["teacher", "school_admin", "owner"]);

// ---------- Learner: mark a lesson complete / not complete -------------------

export async function toggleLessonComplete(
  lessonId: string,
  complete: boolean
): Promise<PdResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, message: "Please sign in." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  if (complete) {
    const { error } = await supabase
      .from("pd_progress")
      .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: "user_id,lesson_id" });
    if (error) return { ok: false, message: "Could not save progress." };
  } else {
    const { error } = await supabase
      .from("pd_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId);
    if (error) return { ok: false, message: "Could not update progress." };
  }
  revalidatePath("/dashboard/pd");
  return { ok: true, message: "Saved." };
}

// ---------- Owner: manage courses + lessons ----------------------------------

const courseSchema = z.object({
  pillar: z.enum(PILLAR_NAMES as unknown as [string, ...string[]]),
  title: z.string().trim().min(1, "Title is required."),
  summary: z.string().trim().default(""),
  audience: z.enum(COURSE_AUDIENCES as unknown as [string, ...string[]]),
  est_minutes: z.coerce.number().int().min(1).max(600).default(30),
  min_role: roleEnum,
  sort_order: z.coerce.number().int().default(0),
});

export async function createCourse(
  _prev: PdResult | null,
  formData: FormData
): Promise<PdResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const parsed = courseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("pd_courses").insert(parsed.data);
  if (error) return { ok: false, message: "Could not save the course." };

  revalidatePath("/owner/pd");
  revalidatePath("/dashboard/pd");
  return { ok: true, message: `Added "${parsed.data.title}".` };
}

export async function deleteCourse(id: string): Promise<PdResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("pd_courses").delete().eq("id", id);
  if (error) return { ok: false, message: "Could not delete." };
  revalidatePath("/owner/pd");
  revalidatePath("/dashboard/pd");
  return { ok: true, message: "Deleted." };
}

const lessonSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().trim().min(1, "Lesson title is required."),
  body: z.string().trim().min(1, "Lesson content is required."),
  sort_order: z.coerce.number().int().default(0),
});

export async function createLesson(
  _prev: PdResult | null,
  formData: FormData
): Promise<PdResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const parsed = lessonSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("pd_lessons").insert(parsed.data);
  if (error) return { ok: false, message: "Could not save the lesson." };

  revalidatePath("/owner/pd");
  revalidatePath("/dashboard/pd");
  return { ok: true, message: `Added lesson "${parsed.data.title}".` };
}

export async function deleteLesson(id: string): Promise<PdResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("pd_lessons").delete().eq("id", id);
  if (error) return { ok: false, message: "Could not delete." };
  revalidatePath("/owner/pd");
  revalidatePath("/dashboard/pd");
  return { ok: true, message: "Deleted." };
}
