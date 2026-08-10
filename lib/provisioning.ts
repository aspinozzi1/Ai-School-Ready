import type Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import { site } from "@/config/site";
import { defaultRolloutSteps } from "@/lib/rollout";
import { sendWelcomeEmail } from "@/lib/email";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

/** Find an existing auth user by email, or create one (email pre-confirmed). */
async function findOrCreateUser(
  admin: Admin,
  email: string,
  fullName?: string
): Promise<{ id: string }> {
  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = data?.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
  if (existing) return { id: existing.id };

  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: fullName ? { full_name: fullName } : undefined,
  });
  if (error || !created.user) {
    throw new Error(`Could not create user: ${error?.message}`);
  }
  return { id: created.user.id };
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
    .select("role")
    .eq("id", userId)
    .maybeSingle<{ role: string }>();

  const rank = { teacher: 1, school_admin: 2, owner: 3 } as const;
  const currentRank = existing
    ? (rank[existing.role as keyof typeof rank] ?? 0)
    : 0;
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

/** Email the buyer a one-click sign-in link into their new library. */
async function sendSetupEmail(admin: Admin, email: string, productName: string) {
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: `${env.siteUrl}/auth/callback?next=/welcome` },
  });
  if (error) {
    console.error("[provisioning] generateLink failed:", error.message);
  }
  const actionUrl = data?.properties?.action_link ?? `${env.siteUrl}/login`;
  await sendWelcomeEmail({ to: email, productName, actionUrl });
}

/**
 * Provision access after a successful Stripe Checkout. Idempotent: if a
 * license already exists for this Stripe reference, it does nothing — safe
 * against webhook re-delivery. Existing accounts get the license attached.
 */
export async function provisionFromCheckout(session: Stripe.Checkout.Session) {
  const admin = createSupabaseAdminClient();

  const product = (session.metadata?.product ?? "") as "individual" | "school";
  const email = session.customer_details?.email ?? session.customer_email ?? "";
  if (!product || !email) {
    console.error("[provisioning] missing product or email on session", session.id);
    return;
  }

  const stripeRef = (session.subscription as string) ?? session.id;

  // Idempotency guard.
  const { data: dupe } = await admin
    .from("licenses")
    .select("id")
    .eq("stripe_ref", stripeRef)
    .maybeSingle();
  if (dupe) return;

  const fullName = session.customer_details?.name ?? undefined;

  if (product === "individual") {
    const { id: userId } = await findOrCreateUser(admin, email, fullName);
    await ensureProfileRole(admin, userId, email, "teacher");

    await admin.from("licenses").insert({
      user_id: userId,
      product: "individual",
      status: "active",
      stripe_ref: stripeRef,
    });

    await sendSetupEmail(admin, email, site.pricing.individual.name);
    return;
  }

  if (product === "school") {
    // School name comes from the checkout custom field.
    const schoolField = session.custom_fields?.find((f) => f.key === "school_name");
    const schoolName =
      schoolField?.text?.value || session.customer_details?.name || "Your School";

    const { data: org, error: orgErr } = await admin
      .from("organizations")
      .insert({
        name: schoolName,
        license_status: "active",
        seats_limit: site.schoolSeatLimit,
        stripe_customer_id: (session.customer as string) ?? null,
        stripe_subscription_id:
          typeof session.subscription === "string" ? session.subscription : null,
      })
      .select("id")
      .single<{ id: string }>();
    if (orgErr || !org) {
      console.error("[provisioning] could not create org:", orgErr?.message);
      throw new Error("org creation failed");
    }

    const { id: userId } = await findOrCreateUser(admin, email, fullName);
    await ensureProfileRole(admin, userId, email, "school_admin", org.id);

    await admin.from("licenses").insert({
      user_id: userId,
      org_id: org.id,
      product: "school",
      status: "active",
      stripe_ref: stripeRef,
    });

    // Seed this school's rollout checklist.
    await admin.from("rollout_steps").upsert(
      defaultRolloutSteps.map((s) => ({ ...s, org_id: org.id, is_complete: false })),
      { onConflict: "org_id,step_key" }
    );

    await sendSetupEmail(admin, email, site.pricing.school.name);
    return;
  }
}

/**
 * Keep license + org status in sync when a subscription changes.
 * Cancellations and lapses revoke access; reactivations restore it.
 */
export async function syncSubscription(subscription: Stripe.Subscription) {
  const admin = createSupabaseAdminClient();

  const active =
    subscription.status === "active" || subscription.status === "trialing";
  const status = active ? "active" : "inactive";
  const customerId = subscription.customer as string;
  const periodEnd = subscription.items?.data?.[0]?.current_period_end
    ? new Date(
        subscription.items.data[0].current_period_end * 1000
      ).toISOString()
    : null;

  await admin
    .from("licenses")
    .update({ status, current_period_end: periodEnd })
    .eq("stripe_ref", subscription.id);

  if (customerId) {
    await admin
      .from("organizations")
      .update({ license_status: status, current_period_end: periodEnd })
      .eq("stripe_customer_id", customerId);
  }
}
