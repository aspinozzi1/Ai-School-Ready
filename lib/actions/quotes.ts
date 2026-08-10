"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { sendQuoteRequestEmail } from "@/lib/email";

export type QuoteResult = { ok: boolean; message: string };

const schema = z.object({
  schoolName: z.string().trim().min(2, "Please add your school's name."),
  district: z.string().trim().optional(),
  contactName: z.string().trim().min(2, "Please add the billing contact's name."),
  contactEmail: z.string().trim().email("Please use a valid email address."),
  poNumber: z.string().trim().optional(),
  notes: z.string().trim().max(2000).optional(),
});

/**
 * Quote / PO request: stores the request (service role; the form is public)
 * and emails the owners. Works when either half is configured; fails only
 * when neither can record the request.
 */
export async function requestQuote(
  _prev: QuoteResult | null,
  formData: FormData
): Promise<QuoteResult> {
  const parsed = schema.safeParse({
    schoolName: formData.get("schoolName"),
    district: formData.get("district") || undefined,
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    poNumber: formData.get("poNumber") || undefined,
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }
  const q = parsed.data;

  let stored = false;
  if (isSupabaseAdminConfigured) {
    try {
      const admin = createSupabaseAdminClient();
      const { error } = await admin.from("quote_requests").insert({
        school_name: q.schoolName,
        district: q.district ?? null,
        contact_name: q.contactName,
        contact_email: q.contactEmail,
        po_number: q.poNumber ?? null,
        notes: q.notes ?? null,
      });
      stored = !error;
    } catch {
      stored = false;
    }
  }

  const emailed = await sendQuoteRequestEmail({
    schoolName: q.schoolName,
    district: q.district,
    contactName: q.contactName,
    contactEmail: q.contactEmail,
    poNumber: q.poNumber,
    notes: q.notes,
  });

  if (!stored && !emailed) {
    return {
      ok: false,
      message:
        "We couldn't submit the form just now. Please email us directly and we'll send your quote within one school day.",
    };
  }

  return {
    ok: true,
    message:
      "Request received. A formal quote goes to your billing contact within one school day, and your membership can activate before the paperwork clears.",
  };
}
