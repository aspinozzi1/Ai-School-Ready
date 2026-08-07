"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured, env } from "@/lib/env";
import { sendTeacherInviteEmail } from "@/lib/email";

export type InviteResult = {
  ok: boolean;
  message: string;
};

const emailSchema = z.string().trim().email();

/**
 * Invite teachers by pasting a list of emails. Each gets a magic sign-in link
 * that, once accepted, joins them to this school with Cookbook access — no
 * separate payment (Flow B, steps 4–5).
 */
export async function inviteTeachers(
  _prev: InviteResult | null,
  formData: FormData
): Promise<InviteResult> {
  const gate = await requireAccess("school_admin");
  if (!gate.ok || !gate.user.profile.org_id) {
    return { ok: false, message: "Only a school admin can invite teachers." };
  }
  const orgId = gate.user.profile.org_id;

  if (!isSupabaseAdminConfigured) {
    return { ok: false, message: "Invites aren't configured yet (see the README)." };
  }

  const raw = String(formData.get("emails") ?? "");
  const candidates = Array.from(
    new Set(
      raw
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  const emails = candidates.filter((e) => emailSchema.safeParse(e).success);
  const invalid = candidates.filter((e) => !emailSchema.safeParse(e).success);

  if (emails.length === 0) {
    return { ok: false, message: "Please enter at least one valid email address." };
  }

  const supabase = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();

  // Org name for the email.
  const { data: org } = await supabase!
    .from("organizations")
    .select("name, seats_limit")
    .eq("id", orgId)
    .single<{ name: string; seats_limit: number | null }>();
  const orgName = org?.name ?? "Your school";

  // Soft seat-limit check.
  if (org?.seats_limit) {
    const { count } = await supabase!
      .from("invites")
      .select("*", { count: "exact", head: true })
      .eq("org_id", orgId);
    if ((count ?? 0) + emails.length > org.seats_limit) {
      return {
        ok: false,
        message: `That would exceed your ${org.seats_limit} seats. Contact us to add more.`,
      };
    }
  }

  let sent = 0;
  for (const email of emails) {
    try {
      // Reuse an existing invite row (and token) if one exists.
      const { data: existing } = await supabase!
        .from("invites")
        .select("token")
        .eq("org_id", orgId)
        .eq("email", email)
        .maybeSingle<{ token: string }>();

      const token = existing?.token ?? globalThis.crypto.randomUUID();
      if (!existing) {
        await supabase!.from("invites").insert({
          org_id: orgId,
          email,
          status: "pending",
          token,
        });
      }

      const redirectTo = `${env.siteUrl}/auth/callback?next=${encodeURIComponent(
        `/invite/accept?token=${token}`
      )}`;

      // Create the user + link. If they already exist, fall back to magiclink.
      let actionUrl = `${env.siteUrl}/login`;
      let linkRes = await admin.auth.admin.generateLink({
        type: "invite",
        email,
        options: { redirectTo },
      });
      if (linkRes.error) {
        linkRes = await admin.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: { redirectTo },
        });
      }
      if (linkRes.data?.properties?.action_link) {
        actionUrl = linkRes.data.properties.action_link;
      }

      await sendTeacherInviteEmail(email, actionUrl, orgName);
      sent++;
    } catch (err) {
      console.error(`[staff] invite failed for ${email}:`, err);
    }
  }

  revalidatePath("/admin-school/staff");

  const parts = [`Invited ${sent} teacher${sent === 1 ? "" : "s"}.`];
  if (invalid.length) parts.push(`Skipped ${invalid.length} invalid address(es).`);
  return { ok: sent > 0, message: parts.join(" ") };
}
