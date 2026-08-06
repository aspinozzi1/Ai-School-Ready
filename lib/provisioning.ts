import type Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import { products } from "@/config/site";
import { defaultRolloutSteps } from "@/lib/rollout";
import { sendWelcomeEmail, scheduleTeacherOnboarding } from "@/lib/email";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

/** Find an existing auth user by email, or create one (email pre-confirmed). */
async function findOrCreateUser(
  admin: Admin,
  email: string,
  fullName?: string
): Promise<{ id: string; created: boolean }> {
  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = data?.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
  if (existing) return { id: existing.id, created: false };

  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: fullName ? { full_name: fullName } : undefined,
  });
  if (error || !created.user) {
    throw new Error(`Could not create user: ${error?.message}`);
  }
  return { id: created.user.id, created: true };
}

/** Ensure a profile row exists; only UPGRADE role, never downgrade. */
async function ensureProfileRole(
  admin: Admin,
  userId: string,
  email: string,
  role: "teacher" | "school_admin",
  orgId?: string
) {
  const { data: existing } = await admin
    .from("profiles")
    .select("role, org_id")
    .eq("id", userId)
    .single<{ role: string; org_id: string | null }>();

  const rank = { teacher: 1, school_admin: 2, owner: 3 } as const;
  const currentRank = existing ? rank[existing.role as keyof typeof rank] ?? 0 : 0;
  const nextRole = rank[role] > currentRank ? role : (existing?.role ?? role);

  await admin.from("profiles").upsert(
    {
      id: userId,
      email,
      role: nextRole,
      // Only set org_id when provisioning a school admin (keep existing otherwise).
      ...(orgId ? { org_id: orgId } : {}),
    },
    { onConflict: "id" }
  );
}

/** Email the buyer a set-password / magic sign-in link to /welcome. */
async function sendSetPasswordEmail(admin: Admin, email: string, productName: string) {
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: `${env.siteUrl}/auth/callback?next=/welcome` },
  });
  const actionUrl = data?.properties?.action_link ?? `${env.siteUrl}/login`;
  if (error) console.error("[provisioning] generateLink failed:", error.message);
  await sendWelcomeEmail(email, actionUrl, productName);
}

/**
 * Provision access after a successful Stripe Checkout. Idempotent: if a license
 * already exists for this Stripe reference, it does nothing. Handles the
 * "user already exists" case by attaching the license to that account.
 * (Flows A & B; flow-integrity rule #6.)
 */
export async function provisionFromCheckout(session: Stripe.Checkout.Session) {
  const admin = createSupabaseAdminClient();

  const product = (session.metadata?.product ?? "") as "teacher_kit" | "school_license";
  const email =
    session.customer_details?.email ?? session.customer_email ?? "";
  if (!product || !email) {
    console.error("[provisioning] missing product or email on session", session.id);
    return;
  }

  if (product === "teacher_kit") {
    const stripeRef = session.id;

    // Idempotency guard.
    const { data: dupe } = await admin
      .from("licenses")
      .select("id")
      .eq("stripe_ref", stripeRef)
      .maybeSingle();
    if (dupe) return;

    const fullName = session.customer_details?.name ?? undefined;
    const { id: userId } = await findOrCreateUser(admin, email, fullName);
    await ensureProfileRole(admin, userId, email, "teacher");

    await admin.from("licenses").insert({
      user_id: userId,
      product: "teacher_kit",
      status: "active",
      stripe_ref: stripeRef,
    });

    await sendSetPasswordEmail(admin, email, products.teacher_kit.name);
    await scheduleTeacherOnboarding(email);
    return;
  }

  if (product === "school_license") {
    const stripeRef = (session.subscription as string) ?? session.id;

    const { data: dupe } = await admin
      .from("licenses")
      .select("id")
      .eq("stripe_ref", stripeRef)
      .maybeSingle();
    if (dupe) return;

    // School name comes from the checkout custom field.
    const schoolField = session.custom_fields?.find((f) => f.key === "school_name");
    const schoolName =
      schoolField?.text?.value ||
      session.customer_details?.name ||
      "Your School";

    // Create the organization.
    const { data: org, error: orgErr } = await admin
      .from("organizations")
      .insert({
        name: schoolName,
        plan: "school_license",
        license_status: "active",
        stripe_customer_id: (session.customer as string) ?? null,
      })
      .select("id")
      .single<{ id: string }>();
    if (orgErr || !org) {
      console.error("[provisioning] could not create org:", orgErr?.message);
      return;
    }

    const fullName = session.customer_details?.name ?? undefined;
    const { id: userId } = await findOrCreateUser(admin, email, fullName);
    await ensureProfileRole(admin, userId, email, "school_admin", org.id);

    await admin.from("licenses").insert({
      user_id: userId,
      org_id: org.id,
      product: "school_license",
      status: "active",
      stripe_ref: stripeRef,
    });

    // Seed this school's rollout checklist.
    await admin.from("rollout_steps").upsert(
      defaultRolloutSteps.map((s) => ({ ...s, org_id: org.id, is_complete: false })),
      { onConflict: "org_id,step_key" }
    );

    await sendSetPasswordEmail(admin, email, products.school_license.name);
    return;
  }
}

/**
 * Keep license + org status in sync when a subscription changes.
 * Cancels/expirations revoke access gracefully (Flow B step 6).
 */
export async function syncSubscription(subscription: Stripe.Subscription) {
  const admin = createSupabaseAdminClient();

  const active = subscription.status === "active" || subscription.status === "trialing";
  const status = active ? "active" : "inactive";
  const customerId = subscription.customer as string;
  const periodEnd = subscription.items?.data?.[0]?.current_period_end
    ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
    : null;

  // Update the license by its Stripe reference (subscription id).
  await admin
    .from("licenses")
    .update({ status, current_period_end: periodEnd })
    .eq("stripe_ref", subscription.id);

  // Update the organization's license status so gating flips immediately.
  if (customerId) {
    await admin
      .from("organizations")
      .update({ license_status: status })
      .eq("stripe_customer_id", customerId);
  }
}
