import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Recipe,
  Resource,
  RolloutStep,
  Organization,
  Profile,
  PdCourse,
  PdLesson,
} from "@/lib/types";

/**
 * Read helpers. All queries run through the user's own Supabase client, so
 * row-level security decides what comes back — these never leak rows a user
 * shouldn't see.
 */

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .order("subject", { ascending: true })
    .order("grade_band", { ascending: true })
    .order("title", { ascending: true });
  return (data as Recipe[]) ?? [];
}

export async function getResources(): Promise<Resource[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("resources")
    .select("*")
    .order("category", { ascending: true })
    .order("title", { ascending: true });
  return (data as Resource[]) ?? [];
}

export async function getOrganization(orgId: string): Promise<Organization | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgId)
    .single();
  return (data as Organization) ?? null;
}

export async function getRolloutSteps(orgId: string): Promise<RolloutStep[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("rollout_steps")
    .select("*")
    .eq("org_id", orgId)
    .order("sort_order", { ascending: true });
  return (data as RolloutStep[]) ?? [];
}

export async function getOrgStaff(orgId: string): Promise<Profile[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: true });
  return (data as Profile[]) ?? [];
}

export async function getPendingInvites(orgId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("invites")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ---------- Self-paced PD ----------------------------------------------------

export async function getCourses(): Promise<PdCourse[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("pd_courses")
    .select("*")
    .order("pillar", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });
  return (data as PdCourse[]) ?? [];
}

export async function getCourse(
  id: string
): Promise<{ course: PdCourse; lessons: PdLesson[] } | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: course } = await supabase
    .from("pd_courses")
    .select("*")
    .eq("id", id)
    .single<PdCourse>();
  if (!course) return null;
  const { data: lessons } = await supabase
    .from("pd_lessons")
    .select("*")
    .eq("course_id", id)
    .order("sort_order", { ascending: true });
  return { course, lessons: (lessons as PdLesson[]) ?? [] };
}

/** The lesson ids the current user has marked complete. */
export async function getCompletedLessonIds(): Promise<Set<string>> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Set();
  const { data } = await supabase.from("pd_progress").select("lesson_id");
  return new Set((data ?? []).map((r: { lesson_id: string }) => r.lesson_id));
}
