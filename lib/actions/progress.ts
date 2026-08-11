"use server";

import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { trackASlugs } from "@/lib/progress";

export type ProgressResult = { ok: boolean; message?: string };

/**
 * Record (or un-record) that an educator completed a kit session.
 *
 * The locked rule: school admins record attendance for their staff, and
 * school-member teachers do NOT self-report. Individual members have no admin,
 * so they self-serve. RLS enforces this at the database; this check exists so
 * the UI can say something useful instead of showing a silent failure.
 */
export async function setCompletion(
  profileId: string,
  kitSlug: string,
  complete: boolean
): Promise<ProgressResult> {
  const gate = await requireAccess("teacher");
  if (!gate.ok) {
    return { ok: false, message: "Sign in with an active membership." };
  }
  const { user } = gate;

  if (!trackASlugs.includes(kitSlug)) {
    return { ok: false, message: "Unknown kit." };
  }

  const isAdmin =
    user.profile.role === "school_admin" || user.profile.role === "owner";
  const isSelf = profileId === user.id;
  const isIndividual = !user.profile.org_id;

  if (!isAdmin && !(isSelf && isIndividual)) {
    return {
      ok: false,
      message:
        "Your school admin records completion for staff. Ask them to mark this session.",
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  if (complete) {
    const { error } = await supabase.from("pd_progress").upsert(
      {
        profile_id: profileId,
        kit_slug: kitSlug,
        completed_at: new Date().toISOString(),
        recorded_by: user.id,
      },
      { onConflict: "profile_id,kit_slug" }
    );
    if (error) return { ok: false, message: "We couldn't record that." };
  } else {
    const { error } = await supabase
      .from("pd_progress")
      .delete()
      .eq("profile_id", profileId)
      .eq("kit_slug", kitSlug);
    if (error) return { ok: false, message: "We couldn't undo that." };
  }

  revalidatePath("/school");
  revalidatePath("/account");
  revalidatePath("/certificate");
  return { ok: true };
}
