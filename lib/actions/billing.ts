"use server";

import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export type PortalResult = { ok: boolean; url?: string; error?: string };

/**
 * Create a Stripe Customer Portal session so admins can update payment details,
 * see invoices, or cancel — without us rebuilding any of that.
 */
export async function createPortalSession(): Promise<PortalResult> {
  const gate = await requireAccess("school_admin");
  if (!gate.ok || !gate.user.profile.org_id) {
    return { ok: false, error: "Only a school admin can manage billing." };
  }

  const stripe = getStripe();
  if (!stripe) return { ok: false, error: "Billing isn't configured yet." };

  const supabase = await createSupabaseServerClient();
  const { data: org } = await supabase!
    .from("organizations")
    .select("stripe_customer_id")
    .eq("id", gate.user.profile.org_id)
    .single<{ stripe_customer_id: string | null }>();

  if (!org?.stripe_customer_id) {
    return {
      ok: false,
      error: "No billing account is linked yet. Contact support if this looks wrong.",
    };
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: org.stripe_customer_id,
      return_url: `${env.siteUrl}/admin-school/billing`,
    });
    return { ok: true, url: session.url };
  } catch (err) {
    console.error("[billing] portal failed:", err);
    return { ok: false, error: "Could not open the billing portal. Please try again." };
  }
}
