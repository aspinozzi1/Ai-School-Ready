"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";

export type OwnerResult = { ok: boolean; message: string };

const roleEnum = z.enum(["teacher", "school_admin", "owner"]);

// ---------- Recipes ----------------------------------------------------------

const recipeSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  category: z.string().trim().min(1, "Category is required."),
  grade_band: z.string().trim().min(1, "Grade band is required."),
  summary: z.string().trim().default(""),
  prompt_text: z.string().trim().min(1, "Prompt text is required."),
  min_role: roleEnum,
});

export async function createRecipe(
  _prev: OwnerResult | null,
  formData: FormData
): Promise<OwnerResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const parsed = recipeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("recipes").insert(parsed.data);
  if (error) return { ok: false, message: "Could not save the recipe." };

  revalidatePath("/owner/resources");
  return { ok: true, message: `Added "${parsed.data.title}".` };
}

export async function deleteRecipe(id: string): Promise<OwnerResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("recipes").delete().eq("id", id);
  if (error) return { ok: false, message: "Could not delete." };

  revalidatePath("/owner/resources");
  return { ok: true, message: "Deleted." };
}

// ---------- Resources (files + links) ----------------------------------------

const resourceSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().default(""),
  category: z.string().trim().min(1, "Category is required."),
  min_role: roleEnum,
  type: z.enum(["file", "link"]),
  link_url: z.string().trim().optional(),
});

export async function createResource(
  _prev: OwnerResult | null,
  formData: FormData
): Promise<OwnerResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const parsed = resourceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form." };
  }
  const { title, description, category, min_role, type, link_url } = parsed.data;

  let filePath: string | null = null;

  if (type === "link") {
    if (!link_url || !/^https?:\/\//.test(link_url)) {
      return { ok: false, message: "Enter a valid URL starting with http(s)://." };
    }
    filePath = link_url;
  } else {
    // File upload → private storage bucket (via service role).
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: "Please choose a file to upload." };
    }
    if (!isSupabaseAdminConfigured) {
      return { ok: false, message: "File uploads aren't configured yet." };
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `uploads/${globalThis.crypto.randomUUID()}-${safeName}`;
    const admin = createSupabaseAdminClient();
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await admin.storage
      .from("resources")
      .upload(path, bytes, { contentType: file.type || "application/octet-stream", upsert: false });
    if (upErr) return { ok: false, message: "Upload failed. Please try again." };
    filePath = path;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase!.from("resources").insert({
    title,
    description,
    category,
    min_role,
    type,
    file_path: filePath,
  });
  if (error) return { ok: false, message: "Could not save the resource." };

  revalidatePath("/owner/resources");
  return { ok: true, message: `Added "${title}".` };
}

export async function deleteResource(id: string): Promise<OwnerResult> {
  const gate = await requireAccess("owner");
  if (!gate.ok) return { ok: false, message: "Not authorized." };

  const supabase = await createSupabaseServerClient();
  const { data: resource } = await supabase!
    .from("resources")
    .select("type, file_path")
    .eq("id", id)
    .single<{ type: string; file_path: string | null }>();

  const { error } = await supabase!.from("resources").delete().eq("id", id);
  if (error) return { ok: false, message: "Could not delete." };

  // Best-effort: remove the stored file too.
  if (resource?.type === "file" && resource.file_path && isSupabaseAdminConfigured) {
    try {
      const admin = createSupabaseAdminClient();
      await admin.storage.from("resources").remove([resource.file_path]);
    } catch {
      /* non-fatal */
    }
  }

  revalidatePath("/owner/resources");
  return { ok: true, message: "Deleted." };
}
