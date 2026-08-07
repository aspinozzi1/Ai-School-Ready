"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult = { ok: boolean; message: string };

const nameSchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name.").max(120),
});

export async function updateName(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = nameSchema.safeParse({ full_name: formData.get("full_name") });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid name." };
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Please log in again." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.full_name })
    .eq("id", user.id);

  if (error) return { ok: false, message: "Could not save. Please try again." };

  revalidatePath("/dashboard/account");
  return { ok: true, message: "Saved." };
}

const passwordSchema = z.object({
  password: z.string().min(8, "Use at least 8 characters."),
});

export async function updatePassword(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = passwordSchema.safeParse({ password: formData.get("password") });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid password." };
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { ok: false, message: error.message };

  return { ok: true, message: "Password updated." };
}
