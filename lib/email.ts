import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";
import { site } from "@/config/site";
import { samplePrompts } from "@/lib/sample-prompts";

/**
 * Thin wrapper around Resend. If Resend isn't configured, we log and no-op
 * so local development and the public site keep working. Returns whether the
 * email was actually sent.
 */
async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!isResendConfigured) {
    console.info(`[email] (not sent — Resend not configured) → ${opts.to}: ${opts.subject}`);
    return false;
  }
  try {
    const resend = new Resend(env.resendApiKey);
    await resend.emails.send({
      from: env.emailFrom,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

/** Minimal, safe HTML shell for transactional emails. */
function layout(heading: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:#173a5e;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;font-weight:700;font-size:18px;">${site.name}</div>
    <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;">
      <h1 style="font-size:20px;margin:0 0 12px;color:#173a5e;">${heading}</h1>
      ${body}
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">
      ${site.name} · One hard rule: zero student data, ever.
    </p>
  </div></body></html>`;
}

/** /free — deliver the 5 sample prompts. */
export function sendSamplePromptsEmail(to: string) {
  const promptsHtml = samplePrompts
    .map(
      (p) => `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;margin:10px 0;">
        <div style="font-weight:600;color:#0d9488;">${p.title} <span style="color:#94a3b8;font-weight:400;">· ${p.grade}</span></div>
        <div style="margin-top:6px;font-size:14px;white-space:pre-wrap;">${escapeHtml(p.text)}</div>
      </div>`
    )
    .join("");
  return sendEmail({
    to,
    subject: "Your 5 free AI prompts (privacy-safe)",
    html: layout(
      "Here are your 5 free prompts",
      `<p style="font-size:14px;">Every one is written to use <strong>no student personal information</strong> — that's the whole idea.</p>
       ${promptsHtml}
       <p style="font-size:14px;">Want all 50, plus a board-ready policy and staff training?
         <a href="${env.siteUrl}/pricing" style="color:#0d9488;font-weight:600;">See pricing →</a></p>`
    ),
  });
}

/** Welcome / set-password email after a purchase (used in the payments phase). */
export function sendWelcomeEmail(to: string, actionUrl: string, productName: string) {
  return sendEmail({
    to,
    subject: `Welcome to ${site.name} — set your password`,
    html: layout(
      "You're in! Let's set your password",
      `<p style="font-size:14px;">Thanks for getting the <strong>${escapeHtml(productName)}</strong>. Click below to set your password and unlock your dashboard.</p>
       <p style="margin:20px 0;"><a href="${actionUrl}" style="background:#173a5e;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block;">Set my password</a></p>
       <p style="font-size:13px;color:#64748b;">If the button doesn't work, paste this link into your browser:<br>${actionUrl}</p>`
    ),
  });
}

/** Teacher invite email (used in the administration phase). */
export function sendTeacherInviteEmail(to: string, actionUrl: string, schoolName: string) {
  return sendEmail({
    to,
    subject: `You've been invited to ${site.name}`,
    html: layout(
      `${escapeHtml(schoolName)} added you to AI-Ready School`,
      `<p style="font-size:14px;">Your school set you up with the Prompt Cookbook and teacher resources — no payment needed.</p>
       <p style="margin:20px 0;"><a href="${actionUrl}" style="background:#173a5e;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block;">Accept your invite</a></p>
       <p style="font-size:13px;color:#64748b;">If the button doesn't work, paste this link into your browser:<br>${actionUrl}</p>`
    ),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
