"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type NameResult = { ok: boolean; message: string };

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "That name is longer than the certificate can hold.");

/**
 * Set the signed-in educator's full name. The certificate prints this, so
 * members need a way to fix it themselves rather than emailing us.
 */
export async function setFullName(
  _prev: NameResult | null,
  formData: FormData
): Promise<NameResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, message: "Sign in to update your name." };

  const parsed = nameSchema.safeParse(formData.get("fullName"));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the name." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Not available." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data })
    .eq("id", user.id);

  if (error) return { ok: false, message: "We couldn't save that name." };

  revalidatePath("/certificate");
  revalidatePath("/account");
  return { ok: true, message: "Name updated." };
}
