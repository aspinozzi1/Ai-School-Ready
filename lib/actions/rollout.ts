"use server";

import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Toggle a rollout step complete/incomplete. RLS ensures it's the admin's org. */
export async function toggleRolloutStep(stepId: string, complete: boolean) {
  const gate = await requireAccess("school_admin");
  if (!gate.ok) return { ok: false };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false };

  const { error } = await supabase
    .from("rollout_steps")
    .update({ is_complete: complete })
    .eq("id", stepId);

  if (error) return { ok: false };
  revalidatePath("/admin-school");
  return { ok: true };
}
