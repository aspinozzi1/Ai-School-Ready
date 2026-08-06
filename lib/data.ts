import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Recipe, Resource, RolloutStep, Organization, Profile } from "@/lib/types";

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
    .order("category", { ascending: true })
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
