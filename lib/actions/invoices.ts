"use server";

import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe, priceIdFor } from "@/lib/stripe";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { site } from "@/config/site";

export type InvoiceResult = { ok: boolean; message: string; hostedUrl?: string };

/** Net terms for school invoices. Business offices expect 30 days. */
const DAYS_UNTIL_DUE = 30;

interface QuoteRow {
  id: string;
  school_name: string;
  contact_name: string;
  contact_email: string;
  po_number: string | null;
  status: string;
  stripe_invoice_id: string | null;
}

/**
 * Issue a Stripe invoice for a School Membership against a quote request.
 *
 * This is the whole purchase-order path: the business office gets a real
 * invoice they can pay by card, ACH, or check. However they pay, invoice.paid
 * fires and provisions the school, so there is one flow rather than three.
 */
export async function createInvoiceForQuote(
  quoteId: string
): Promise<InvoiceResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) {
    return { ok: false, message: "Only an owner can issue invoices." };
  }

  const stripe = getStripe();
  if (!stripe) {
    return { ok: false, message: "Stripe isn't configured yet." };
  }
  if (!isSupabaseAdminConfigured) {
    return { ok: false, message: "Supabase service role isn't configured yet." };
  }

  const priceId = priceIdFor("school");
  if (!priceId) {
    return { ok: false, message: "STRIPE_PRICE_SCHOOL isn't set." };
  }

  const admin = createSupabaseAdminClient();
  const { data: quote } = await admin
    .from("quote_requests")
    .select("*")
    .eq("id", quoteId)
    .maybeSingle<QuoteRow>();

  if (!quote) return { ok: false, message: "That quote request is gone." };
  if (quote.stripe_invoice_id) {
    return {
      ok: false,
      message: "An invoice was already issued for this request.",
    };
  }

  try {
    const customer = await stripe.customers.create({
      email: quote.contact_email,
      name: quote.school_name,
      metadata: {
        airs_quote_id: quote.id,
        contact_name: quote.contact_name,
      },
    });

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: DAYS_UNTIL_DUE,
      // Finalizing is done explicitly below, after the line item is attached.
      // Letting Stripe auto-advance here can finalize an empty invoice.
      auto_advance: false,
      description: `${site.pricing.school.name}: one school building, up to ${site.schoolSeatLimit} staff accounts, one year.`,
      ...(quote.po_number
        ? { custom_fields: [{ name: "PO number", value: quote.po_number }] }
        : {}),
      // Read back by the invoice.paid webhook to provision the school.
      metadata: {
        product: "school",
        school_name: quote.school_name,
        airs_quote_id: quote.id,
      },
    });

    if (!invoice.id) throw new Error("Stripe returned an invoice with no id.");

    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      pricing: { price: priceId },
    });

    // Finalize, then send: the contact gets a hosted invoice they can pay.
    await stripe.invoices.finalizeInvoice(invoice.id);
    const sent = await stripe.invoices.sendInvoice(invoice.id);

    await admin
      .from("quote_requests")
      .update({ status: "invoiced", stripe_invoice_id: invoice.id })
      .eq("id", quote.id);

    revalidatePath("/admin");
    return {
      ok: true,
      message: `Invoice sent to ${quote.contact_email}, net ${DAYS_UNTIL_DUE}.`,
      hostedUrl: sent.hosted_invoice_url ?? undefined,
    };
  } catch (err) {
    console.error("[invoices] could not create invoice:", err);
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Stripe rejected that invoice.",
    };
  }
}

/** Move a quote request along the queue by hand. */
export async function setQuoteStatus(
  quoteId: string,
  status: "new" | "quoted" | "invoiced" | "won" | "closed"
): Promise<InvoiceResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Owners only." };
  if (!isSupabaseAdminConfigured) {
    return { ok: false, message: "Supabase service role isn't configured yet." };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("quote_requests")
    .update({ status })
    .eq("id", quoteId);

  if (error) return { ok: false, message: "That didn't save." };

  revalidatePath("/admin");
  return { ok: true, message: `Marked ${status}.` };
}
