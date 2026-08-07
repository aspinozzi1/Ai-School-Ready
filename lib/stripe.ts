import Stripe from "stripe";
import { env, isStripeConfigured } from "@/lib/env";

/** Server-side Stripe client. Returns null when Stripe isn't configured. */
export function getStripe(): Stripe | null {
  if (!isStripeConfigured) return null;
  return new Stripe(env.stripeSecretKey);
}

/** Map our product ids to their configured Stripe Price IDs. */
export function priceIdFor(product: "teacher_kit" | "school_license"): string {
  return product === "teacher_kit"
    ? env.stripePriceTeacherKit
    : env.stripePriceSchoolLicense;
}
