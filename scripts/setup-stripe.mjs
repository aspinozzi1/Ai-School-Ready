#!/usr/bin/env node
/**
 * One-shot Stripe setup for AI-Ready School. Idempotent: safe to re-run.
 *
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs [webhook-url]
 *
 * Creates (or finds, by product metadata) the two yearly subscription prices
 * and, if a webhook URL is given, the webhook endpoint with the right events.
 * Prints the env lines to copy. Works against a sandbox or live key alike.
 */
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY first.");
  process.exit(1);
}
const stripe = new Stripe(key);
const isLive = key.startsWith("sk_live");
console.log(`Mode: ${isLive ? "LIVE" : "test/sandbox"}\n`);

async function ensurePrice({ slug, name, amount }) {
  // Find an existing product we created earlier.
  const products = await stripe.products.search({
    query: `metadata['airs_slug']:'${slug}'`,
  });
  let product = products.data[0];
  if (!product) {
    product = await stripe.products.create({
      name,
      metadata: { airs_slug: slug },
    });
    console.log(`created product: ${name}`);
  }

  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 10 });
  let price = prices.data.find(
    (p) => p.unit_amount === amount && p.recurring?.interval === "year"
  );
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: "usd",
      recurring: { interval: "year" },
    });
    console.log(`created price: ${name} at $${amount / 100}/yr`);
  }
  return price.id;
}

const schoolPrice = await ensurePrice({
  slug: "school",
  name: "School Membership (one building, up to 75 staff)",
  amount: 149900,
});
const individualPrice = await ensurePrice({
  slug: "individual",
  name: "Individual Educator Membership",
  amount: 9900,
});

/**
 * Every event the webhook route handles. invoice.paid is what provisions a
 * school that bought by purchase order, including the ones whose invoice is
 * marked "paid outside Stripe" after a check clears.
 */
const REQUIRED_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.paid",
];

let webhookSecret = null;
const webhookUrl = process.argv[2];
if (webhookUrl) {
  const url = `${webhookUrl.replace(/\/$/, "")}/api/webhooks/stripe`;
  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  const dupe = existing.data.find((w) => w.url === url);
  if (dupe) {
    console.log(`webhook endpoint already exists for ${url}`);
    console.log("(its signing secret was shown when created; reuse it, or delete the endpoint and re-run)");
    const missing = REQUIRED_EVENTS.filter((e) => !dupe.enabled_events.includes(e));
    if (missing.length > 0) {
      console.log(`WARNING: this endpoint is missing ${missing.join(", ")}.`);
      console.log("Add it in the Stripe dashboard, or delete the endpoint and re-run this script.");
    }
  } else {
    const wh = await stripe.webhookEndpoints.create({
      url,
      enabled_events: REQUIRED_EVENTS,
    });
    webhookSecret = wh.secret;
    console.log(`created webhook endpoint: ${url}`);
  }
}

console.log("\n---- copy these env lines ----");
console.log(`STRIPE_PRICE_SCHOOL=${schoolPrice}`);
console.log(`STRIPE_PRICE_INDIVIDUAL=${individualPrice}`);
if (webhookSecret) console.log(`STRIPE_WEBHOOK_SECRET=${webhookSecret}`);
