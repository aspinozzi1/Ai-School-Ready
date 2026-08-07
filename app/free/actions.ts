"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { sendSamplePromptsEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export type FreeResult = { ok: boolean; message: string };

/** /free lead magnet: store the lead and email the 5 sample prompts. */
export async function captureLead(
  _prev: FreeResult | null,
  formData: FormData
): Promise<FreeResult> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid email." };
  }
  const email = parsed.data.email.toLowerCase();

  // Store the lead (dedupe on email). Skips cleanly if DB isn't configured yet.
  if (isSupabaseAdminConfigured) {
    try {
      const admin = createSupabaseAdminClient();
      await admin.from("leads").upsert({ email }, { onConflict: "email" });
    } catch (err) {
      console.error("[free] could not store lead:", err);
      // Non-fatal — still show the prompts.
    }
  }

  // Email the prompts (no-op if Resend isn't configured).
  await sendSamplePromptsEmail(email);

  return {
    ok: true,
    message: "You're in! Your 5 prompts are below — and on their way to your inbox.",
  };
}
