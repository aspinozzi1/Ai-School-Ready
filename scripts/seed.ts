/**
 * Seed script — run with `npm run seed`.
 *
 * Loads the sample Cookbook recipes, the download-center resources (with
 * placeholder PDFs so downloads work end to end), and grants the OWNER_EMAIL
 * account the "owner" role. Safe to re-run: recipes/resources are matched by
 * title, so it only adds what's missing.
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OWNER_EMAIL
 * from .env.local.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { seedRecipes, seedResources } from "../lib/seed-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ownerEmail = process.env.OWNER_EMAIL;

if (!url || !serviceKey) {
  console.error(
    "\n✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.\n" +
      "  Fill those in first (see docs/SETUP.md), then run `npm run seed` again.\n"
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

/** Build a small but valid single-page PDF with a title + body lines. */
function makePdf(title: string, bodyLines: string[]): Buffer {
  const esc = (s: string) => s.replace(/([()\\])/g, "\\$1");
  let content = `BT\n/F1 22 Tf\n72 720 Td\n(${esc(title)}) Tj\n/F1 12 Tf\n`;
  for (const line of bodyLines) content += `0 -22 Td\n(${esc(line)}) Tj\n`;
  content += "ET";

  const objects = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>",
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
    `<</Length ${content.length}>>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

async function ensureBucket() {
  const { data } = await admin.storage.getBucket("resources");
  if (!data) {
    const { error } = await admin.storage.createBucket("resources", { public: false });
    if (error && !/already exists/i.test(error.message)) throw error;
  }
  console.log("✓ Storage bucket 'resources' ready");
}

async function uploadPlaceholders() {
  for (const r of seedResources) {
    if (r.type !== "file" || !r.file_path) continue;
    // Render the resource's real starter text into the PDF so downloads work
    // end to end. Owners replace these with final files from Owner Admin.
    const pdf = makePdf(r.title, [
      ...r.body,
      "",
      "— Starter template from AI-Ready School. Review and adapt before adopting.",
    ]);
    const { error } = await admin.storage
      .from("resources")
      .upload(r.file_path, pdf, { contentType: "application/pdf", upsert: true });
    if (error) throw error;
  }
  console.log(`✓ Uploaded ${seedResources.length} starter files`);
}

async function seedTable(
  table: "recipes" | "resources",
  rows: readonly { title: string }[]
) {
  const { data: existing, error } = await admin.from(table).select("title");
  if (error) throw error;
  const have = new Set((existing ?? []).map((r: { title: string }) => r.title));
  const toInsert = rows.filter((r) => !have.has(r.title));
  if (toInsert.length === 0) {
    console.log(`✓ ${table}: already seeded (${have.size} rows)`);
    return;
  }
  const { error: insErr } = await admin.from(table).insert(toInsert);
  if (insErr) throw insErr;
  console.log(`✓ ${table}: inserted ${toInsert.length} row(s)`);
}

async function ensureOwner() {
  if (!ownerEmail) {
    console.log("• OWNER_EMAIL not set — skipping owner setup");
    return;
  }
  // Find an existing auth user with this email.
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  let user = list?.users.find((u) => u.email?.toLowerCase() === ownerEmail.toLowerCase());

  if (!user) {
    const { data: created, error } = await admin.auth.admin.createUser({
      email: ownerEmail,
      email_confirm: true,
    });
    if (error) throw error;
    user = created.user;
    console.log(`✓ Created owner auth account for ${ownerEmail} (use "magic link" to log in)`);
  }

  // Upsert the profile with role=owner (covers the case where the trigger
  // hasn't run or the profile predates this seed).
  const { error: upErr } = await admin
    .from("profiles")
    .upsert(
      { id: user!.id, email: ownerEmail, role: "owner", full_name: "Owner" },
      { onConflict: "id" }
    );
  if (upErr) throw upErr;
  console.log(`✓ ${ownerEmail} is now the Owner`);
}

async function main() {
  console.log("\nSeeding AI-Ready School…\n");
  await ensureBucket();
  await uploadPlaceholders();
  await seedTable("recipes", seedRecipes);
  // `body` is only used to render the PDF above — it's not a DB column.
  await seedTable(
    "resources",
    seedResources.map((r) => ({
      title: r.title,
      description: r.description,
      category: r.category,
      type: r.type,
      file_path: r.file_path,
      min_role: r.min_role,
    }))
  );
  await ensureOwner();
  console.log("\n✓ Seed complete.\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err.message ?? err);
  process.exit(1);
});
