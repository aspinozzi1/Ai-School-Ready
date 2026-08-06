/**
 * Central place to read environment variables.
 * The public marketing site (Phases 0–1) runs WITHOUT any of these set,
 * so nothing here throws at import time — callers check the `*Configured`
 * booleans and degrade gracefully.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",

  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  stripePriceTeacherKit: process.env.STRIPE_PRICE_TEACHER_KIT ?? "",
  stripePriceSchoolLicense: process.env.STRIPE_PRICE_SCHOOL_LICENSE ?? "",

  resendApiKey: process.env.RESEND_API_KEY ?? "",
  emailFrom: process.env.EMAIL_FROM ?? "AI-Ready School <onboarding@resend.dev>",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ownerEmail: process.env.OWNER_EMAIL ?? "",
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
);

export const isSupabaseAdminConfigured = Boolean(
  env.supabaseUrl && env.supabaseServiceRoleKey
);

export const isStripeConfigured = Boolean(env.stripeSecretKey);

export const isResendConfigured = Boolean(env.resendApiKey);
