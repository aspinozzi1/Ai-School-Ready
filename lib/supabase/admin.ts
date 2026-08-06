import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseAdminConfigured } from "@/lib/env";

/**
 * Service-role Supabase client. BYPASSES row-level security.
 * Use ONLY on the server for trusted operations: the Stripe webhook
 * (provisioning users/licenses) and the seed script. Never import this
 * into client code.
 */
export function createSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured) {
    throw new Error(
      "Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
