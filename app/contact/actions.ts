"use server";

import { z } from "zod";
import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";
import { site } from "@/config/site";

const schema = z.object({
  name: z.string().trim().min(1, "Please tell us your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  topic: z.string().trim().optional(),
  message: z.string().trim().min(5, "Please add a short message."),
});

export type ContactResult = { ok: boolean; message: string };

/** Contact form: email the owner. Degrades gracefully without Resend. */
export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const { name, email, topic, message } = parsed.data;

  const to = env.ownerEmail || site.supportEmail;

  if (isResendConfigured && to) {
    try {
      const resend = new Resend(env.resendApiKey);
      await resend.emails.send({
        from: env.emailFrom,
        to,
        replyTo: email,
        subject: `Contact form${topic ? ` · ${topic}` : ""} — ${name}`,
        text: `From: ${name} <${email}>\nTopic: ${topic || "general"}\n\n${message}`,
      });
    } catch (err) {
      console.error("[contact] send failed:", err);
      return {
        ok: false,
        message: "Sorry — we couldn't send that. Please email us directly.",
      };
    }
  } else {
    console.info(`[contact] (not sent — Resend not configured) from ${email}: ${message}`);
  }

  return {
    ok: true,
    message: "Thanks! We got your message and will reply within one business day.",
  };
}
