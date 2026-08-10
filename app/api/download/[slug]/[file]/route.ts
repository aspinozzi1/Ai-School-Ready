import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAccess } from "@/lib/auth";
import { resolveKitFile } from "@/lib/kit-files";

/**
 * Gated kit downloads. Files ship inside the deploy (kits/kitNN/); this route
 * streams one only after a server-side access check, and only for filenames
 * that appear verbatim in the kit-file manifest — request input is never used
 * to build a filesystem path directly.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string; file: string }> }
) {
  const gate = await requireAccess("teacher");
  if (!gate.ok) {
    const dest = gate.reason === "auth" ? "/login" : "/pricing";
    return NextResponse.redirect(new URL(dest, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
  }

  const { slug, file } = await ctx.params;
  const resolved = resolveKitFile(slug, decodeURIComponent(file));
  if (!resolved) {
    return new NextResponse("Not found", { status: 404 });
  }

  const absPath = path.join(process.cwd(), resolved.relPath);
  let data: Buffer;
  try {
    data = await fs.readFile(absPath);
  } catch {
    return new NextResponse("File unavailable", { status: 404 });
  }

  const contentType =
    resolved.file.kind === "pptx"
      ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      : "application/pdf";

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${resolved.file.name}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
