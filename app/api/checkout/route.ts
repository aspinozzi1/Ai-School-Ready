import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, priceIdFor } from "@/lib/stripe";
import { env } from "@/lib/env";

const schema = z.object({
  product: z.enum(["teacher_kit", "school_license"]),
});

/**
 * Starts a Stripe Checkout session.
 *  - teacher_kit    → one-time payment
 *  - school_license → yearly subscription (collects the school name)
 * The product id is stored in metadata so the webhook knows what to provision.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Payments aren't set up yet. Please check back soon." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }
  const product = parsed.data.product;

  const price = priceIdFor(product);
  if (!price) {
    return NextResponse.json(
      { error: "This product isn't configured yet." },
      { status: 503 }
    );
  }

  const isSubscription = product === "school_license";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price, quantity: 1 }],
      // Collect the buyer's email; Stripe creates/reuses a customer.
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: { product },
      // For subscriptions, also stamp the product onto the subscription so the
      // subscription.updated/deleted webhooks can find it.
      subscription_data: isSubscription
        ? { metadata: { product } }
        : undefined,
      // Ask school buyers for their school name.
      custom_fields: isSubscription
        ? [
            {
              key: "school_name",
              label: { type: "custom", custom: "School or district name" },
              type: "text",
            },
          ]
        : undefined,
      success_url: `${env.siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}/pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
