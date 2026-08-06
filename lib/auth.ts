import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile, Role, SessionUser } from "@/lib/types";
import { roleAtLeast } from "@/lib/types";

/**
 * Load the current signed-in user with their profile and access status.
 * Returns null when logged out or when Supabase isn't configured.
 * This is the SERVER-SIDE source of truth for gating (flow-integrity rule #5).
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile) {
    // Authenticated but no profile row yet (e.g. mid-provisioning).
    return null;
  }

  const hasActiveAccess = await computeActiveAccess(supabase, profile);

  return {
    id: user.id,
    email: user.email ?? profile.email,
    profile,
    hasActiveAccess,
  };
}

async function computeActiveAccess(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  profile: Profile
): Promise<boolean> {
  // Owner always has access.
  if (profile.role === "owner") return true;

  // Direct (individual) active license.
  const { data: personal } = await supabase
    .from("licenses")
    .select("id")
    .eq("user_id", profile.id)
    .eq("status", "active")
    .limit(1);
  if (personal && personal.length > 0) return true;

  // Org-based license (school admin or invited teacher).
  if (profile.org_id) {
    const { data: org } = await supabase
      .from("organizations")
      .select("license_status")
      .eq("id", profile.org_id)
      .single<{ license_status: string }>();
    if (org?.license_status === "active") return true;
  }

  return false;
}

/**
 * Require a signed-in user with an active license AND at least `required` role.
 * Returns a discriminated result so pages can render the right screen:
 *  - { ok: true, user }              → render the gated content
 *  - { ok: false, reason: "auth" }   → not signed in
 *  - { ok: false, reason: "access" } → signed in but no active license
 *  - { ok: false, reason: "role" }   → signed in with access but wrong role
 */
export async function requireAccess(
  required: Role
): Promise<
  | { ok: true; user: SessionUser }
  | { ok: false; reason: "auth" | "access" | "role"; user: SessionUser | null }
> {
  const user = await getSessionUser();
  if (!user) return { ok: false, reason: "auth", user: null };

  // Owner bypasses role + access checks.
  if (user.profile.role === "owner") return { ok: true, user };

  if (!user.hasActiveAccess) return { ok: false, reason: "access", user };
  if (!roleAtLeast(user.profile.role, required))
    return { ok: false, reason: "role", user };

  return { ok: true, user };
}
