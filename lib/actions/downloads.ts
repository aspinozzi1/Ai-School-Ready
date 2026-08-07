"use server";

import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";
import type { Resource } from "@/lib/types";

export type DownloadResult = { ok: boolean; url?: string; error?: string };

/**
 * Mint a short-lived download link for a resource — but only after verifying
 * the caller is signed in with access AND that RLS lets them see the row.
 * Signed URLs are created with the service role, so the storage bucket stays
 * private and files are never publicly listable.
 */
export async function getDownloadUrl(resourceId: string): Promise<DownloadResult> {
  const gate = await requireAccess("teacher");
  if (!gate.ok) {
    return { ok: false, error: "You don't have access to this download." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Not available." };

  // RLS ensures the user can only read a resource their role is entitled to.
  const { data: resource } = await supabase
    .from("resources")
    .select("*")
    .eq("id", resourceId)
    .single<Resource>();

  if (!resource) {
    return { ok: false, error: "This resource isn't available to your account." };
  }

  // External links: just hand back the URL.
  if (resource.type === "link") {
    return resource.file_path
      ? { ok: true, url: resource.file_path }
      : { ok: false, error: "This link isn't set up yet." };
  }

  // Files: create a signed URL to the private storage object.
  if (!resource.file_path) {
    return { ok: false, error: "This file hasn't been uploaded yet." };
  }
  if (!isSupabaseAdminConfigured) {
    return { ok: false, error: "Downloads aren't configured yet." };
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.storage
    .from("resources")
    .createSignedUrl(resource.file_path, 60 * 10); // valid 10 minutes

  if (error || !data?.signedUrl) {
    return { ok: false, error: "Could not create a download link. Please try again." };
  }
  return { ok: true, url: data.signedUrl };
}
