"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

/** Supabase client for Client Components (login form, etc.). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
