import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { starterPrompts } from "@/lib/prompts";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

/**
 * Where a starter set is being planted: a school's shared library, or an
 * Individual member's personal one (which is scoped by author, not org).
 */
export type SeedTarget = { orgId: string } | { authorId: string };

function rowsFor(target: SeedTarget) {
  const owned =
    "orgId" in target
      ? { org_id: target.orgId, author_id: null }
      : { org_id: null, author_id: target.authorId };

  return starterPrompts.map((p) => ({ ...p, ...owned, source: "starter" }));
}

/**
 * Plant the founder starter set. Idempotent: a library that already has
 * starter rows is left exactly as it is, so this is safe to call on every
 * provisioning event and on every page load.
 *
 * Uses the service role because seeding writes rows nobody authored: a
 * school's starter prompts belong to the school, not to whoever logs in first.
 */
export async function seedStarterPrompts(
  admin: Admin,
  target: SeedTarget
): Promise<void> {
  const query = admin.from("prompts").select("id", { count: "exact", head: true }).eq("source", "starter");

  const scoped =
    "orgId" in target
      ? query.eq("org_id", target.orgId)
      : query.is("org_id", null).eq("author_id", target.authorId);

  const { count, error } = await scoped;
  if (error || (count ?? 0) > 0) return;

  const { error: insertError } = await admin.from("prompts").insert(rowsFor(target));
  if (insertError) {
    console.error("[prompt-seed] could not seed starter prompts:", insertError.message);
  }
}

/**
 * Same thing, for callers that don't already hold an admin client (the
 * prompts page). Degrades to a no-op without a service-role key, and covers
 * libraries created before this release, including manually provisioned
 * PO schools and the demo school.
 */
export async function ensureStarterPrompts(target: SeedTarget): Promise<void> {
  if (!isSupabaseAdminConfigured) return;
  try {
    await seedStarterPrompts(createSupabaseAdminClient(), target);
  } catch (err) {
    console.error("[prompt-seed] seeding failed:", err);
  }
}
