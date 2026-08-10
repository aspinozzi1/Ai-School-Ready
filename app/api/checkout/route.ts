import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, priceIdFor } from "@/lib/stripe";
import { env } from "@/lib/env";

const schema = z.object({
  product: z.enum(["individual", "school"]),
});

/**
 * Starts a Stripe Checkout session. Both memberships are yearly
 * subscriptions; school checkout also collects the school name so the
 * webhook can create the organization.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Card checkout isn't open quite yet. Email us and we'll set you up directly." },
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
      { error: "This membership isn't configured yet. Email us and we'll set you up directly." },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: { product },
      subscription_data: { metadata: { product } },
      custom_fields:
        product === "school"
          ? [
              {
                key: "school_name",
                label: { type: "custom", custom: "School name (one building)" },
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
