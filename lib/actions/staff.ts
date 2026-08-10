"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { env, isSupabaseAdminConfigured } from "@/lib/env";
import { sendStaffInviteEmail } from "@/lib/email";
import { site } from "@/config/site";

export type InviteResult = {
  ok: boolean;
  message: string;
  /** When email isn't configured, links come back here for manual sharing. */
  manualLinks?: Array<{ email: string; url: string }>;
};

const emailSchema = z.string().trim().email();

/**
 * Invite staff by pasting a list of emails. Each invitee gets a sign-in link
 * that joins them to this school with library access — no separate payment.
 * The 75-seat cap (site.schoolSeatLimit / organizations.seats_limit) is
 * enforced here against current members + pending invites.
 */
export async function inviteStaff(
  _prev: InviteResult | null,
  formData: FormData
): Promise<InviteResult> {
  const gate = await requireAccess("school_admin");
  if (!gate.ok || !gate.user.profile.org_id) {
    return { ok: false, message: "Only a school admin can invite staff." };
  }
  const orgId = gate.user.profile.org_id;

  if (!isSupabaseAdminConfigured) {
    return {
      ok: false,
      message: "Invites aren't configured yet (missing SUPABASE_SERVICE_ROLE_KEY).",
    };
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
  if (!supabase) return { ok: false, message: "Not available." };
  const admin = createSupabaseAdminClient();

  const { data: org } = await supabase
    .from("organizations")
    .select("name, seats_limit")
    .eq("id", orgId)
    .single<{ name: string; seats_limit: number | null }>();
  const orgName = org?.name ?? "Your school";
  const seatsLimit = org?.seats_limit ?? site.schoolSeatLimit;

  // Seat cap: current members + pending invites + this batch must fit.
  const { count: memberCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId);
  const { count: pendingCount } = await supabase
    .from("invites")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("status", "pending");

  const seatsUsed = (memberCount ?? 0) + (pendingCount ?? 0);
  if (seatsUsed + emails.length > seatsLimit) {
    const left = Math.max(0, seatsLimit - seatsUsed);
    return {
      ok: false,
      message: `That would exceed your ${seatsLimit}-seat membership (${left} seat${left === 1 ? "" : "s"} left). Contact us about district options.`,
    };
  }

  let sent = 0;
  const manualLinks: Array<{ email: string; url: string }> = [];

  for (const email of emails) {
    // Reuse an existing invite row (and token) if one exists.
    const { data: existing } = await supabase
      .from("invites")
      .select("token, status")
      .eq("org_id", orgId)
      .eq("email", email)
      .maybeSingle<{ token: string; status: string }>();

    if (existing?.status === "accepted") continue;

    const token = existing?.token ?? globalThis.crypto.randomUUID();
    if (!existing) {
      const { error } = await supabase.from("invites").insert({
        org_id: orgId,
        email,
        status: "pending",
        token,
      });
      if (error) continue;
    }

    const redirectTo = `${env.siteUrl}/auth/callback?next=${encodeURIComponent(
      `/invite/accept?token=${token}`
    )}`;

    // Create the user + one-click link. If they already exist, fall back to a
    // magic link for the same redirect.
    let actionUrl: string | null = null;
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

    if (!actionUrl) continue;

    const emailed = await sendStaffInviteEmail({
      to: email,
      orgName,
      actionUrl,
    });
    if (!emailed) {
      manualLinks.push({ email, url: actionUrl });
    }
    sent += 1;
  }

  revalidatePath("/school");

  const parts: string[] = [];
  if (sent > 0) {
    parts.push(
      manualLinks.length > 0
        ? `${sent} invite${sent === 1 ? "" : "s"} created. Email sending isn't configured yet, so copy each link below and send it to that teacher directly.`
        : `${sent} invite${sent === 1 ? "" : "s"} sent.`
    );
  } else {
    parts.push("No new invites were created (they may already be members).");
  }
  if (invalid.length > 0) {
    parts.push(`Skipped ${invalid.length} invalid: ${invalid.join(", ")}.`);
  }

  return {
    ok: sent > 0,
    message: parts.join(" "),
    manualLinks: manualLinks.length > 0 ? manualLinks : undefined,
  };
}

/**
 * Accept an invite: called server-side from the invite-accept page once the
 * invitee is signed in. Joins them to the org and marks the invite accepted.
 * Uses the service role because the invitee can't update their own org_id or
 * read the invite row under RLS.
 */
export async function acceptInvite(token: string): Promise<{
  ok: boolean;
  orgName?: string;
  error?: string;
}> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Not available." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth" };

  if (!isSupabaseAdminConfigured) {
    return { ok: false, error: "Invites aren't configured yet." };
  }
  const admin = createSupabaseAdminClient();

  const { data: invite } = await admin
    .from("invites")
    .select("id, org_id, email, status")
    .eq("token", token)
    .maybeSingle<{ id: string; org_id: string; email: string; status: string }>();

  if (!invite) return { ok: false, error: "This invite link isn't valid." };

  const userEmail = (user.email ?? "").toLowerCase();
  if (invite.email.toLowerCase() !== userEmail) {
    return {
      ok: false,
      error: `This invite was sent to ${invite.email}. Sign in with that email to accept it.`,
    };
  }

  const { data: org } = await admin
    .from("organizations")
    .select("name, seats_limit")
    .eq("id", invite.org_id)
    .single<{ name: string; seats_limit: number | null }>();

  // Final seat check at accept time (members only; this invite stops being
  // "pending" the moment it flips to accepted).
  const { count: memberCount } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("org_id", invite.org_id);
  const seatsLimit = org?.seats_limit ?? site.schoolSeatLimit;
  const alreadyMember =
    (
      await admin
        .from("profiles")
        .select("org_id")
        .eq("id", user.id)
        .single<{ org_id: string | null }>()
    ).data?.org_id === invite.org_id;

  if (!alreadyMember && (memberCount ?? 0) >= seatsLimit) {
    return {
      ok: false,
      error: `${org?.name ?? "This school"} has used all ${seatsLimit} seats. Ask your admin to contact us.`,
    };
  }

  await admin.from("profiles").update({ org_id: invite.org_id }).eq("id", user.id);
  if (invite.status !== "accepted") {
    await admin.from("invites").update({ status: "accepted" }).eq("id", invite.id);
  }

  return { ok: true, orgName: org?.name };
}
