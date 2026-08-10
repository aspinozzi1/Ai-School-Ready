"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Toggle a rollout-checklist step. RLS enforces the real boundary (own org's
 * school_admin, or owner); this just adds the session check and revalidates.
 */
export async function toggleRolloutStep(
  stepId: string,
  isComplete: boolean
): Promise<{ ok: boolean }> {
  const user = await getSessionUser();
  if (
    !user ||
    (user.profile.role !== "school_admin" && user.profile.role !== "owner")
  ) {
    return { ok: false };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false };

  const { error } = await supabase
    .from("rollout_steps")
    .update({ is_complete: isComplete })
    .eq("id", stepId);

  revalidatePath("/school");
  revalidatePath("/admin");
  return { ok: !error };
}
