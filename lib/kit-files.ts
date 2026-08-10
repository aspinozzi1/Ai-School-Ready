import { tracks, type KitMeta } from "@/lib/catalog";

/**
 * The file manifest for the member library. Kit deliverables ship inside the
 * deploy (kits/kitNN/), so this manifest — not a database — is the source of
 * truth for what each kit contains. The download route only ever serves files
 * named here, for kits marked "released" in the catalog.
 */

export interface KitFile {
  /** Filename on disk inside kits/kitNN/, e.g. "Kit01_FacilitatorScript.pdf" */
  name: string;
  /** Human label shown in the library. */
  label: string;
  description: string;
  kind: "pdf" | "pptx";
}

const COMPONENTS: Array<Omit<KitFile, "name"> & { suffix: string }> = [
  {
    suffix: "FacilitatorScript.pdf",
    label: "Facilitator Script",
    description: "Word-for-word script keyed to every slide, with timings.",
    kind: "pdf",
  },
  {
    suffix: "PresentationDeck.pptx",
    label: "Presentation Deck",
    description: "Self-standing PowerPoint with speaker notes.",
    kind: "pptx",
  },
  {
    suffix: "ParticipantHandout.pdf",
    label: "Participant Handout",
    description: "The take-away reference each educator keeps.",
    kind: "pdf",
  },
  {
    suffix: "FacilitatorPrepGuide.pdf",
    label: "Facilitator Prep Guide",
    description: "15-minute prep checklist, room setup, and FAQ.",
    kind: "pdf",
  },
  {
    suffix: "First48Hours.pdf",
    label: "First 48 Hours Action Sheet",
    description: "Three actions that lock in the session within two days.",
    kind: "pdf",
  },
  {
    suffix: "30DayPlan.pdf",
    label: "30-Day Implementation Plan",
    description: "The month-after plan that makes it stick.",
    kind: "pdf",
  },
  {
    suffix: "ExitTicket.pdf",
    label: "Exit Ticket & Feedback Form",
    description: "Two-minute ticket that doubles as PD documentation.",
    kind: "pdf",
  },
  {
    suffix: "AdminOnePager.pdf",
    label: "Admin One-Pager",
    description: "The 3-minute case for principals and superintendents.",
    kind: "pdf",
  },
  {
    suffix: "References.pdf",
    label: "References & Further Reading",
    description: "Verified APA citations for every claim in the kit.",
    kind: "pdf",
  },
];

const kitBySlug = new Map<string, KitMeta>();
for (const track of tracks) {
  for (const kit of track.kits) kitBySlug.set(kit.slug, kit);
}

export function getKit(slug: string): KitMeta | undefined {
  return kitBySlug.get(slug);
}

export function getReleasedKits(): KitMeta[] {
  return tracks.flatMap((t) => t.kits).filter((k) => k.status === "released");
}

/** kits/kit01 → "kit01" — the on-disk directory for a kit number. */
export function kitDirName(n: number): string {
  return `kit${String(n).padStart(2, "0")}`;
}

/** The manifest of downloadable files for a kit. */
export function kitFiles(kit: KitMeta): KitFile[] {
  const prefix = `Kit${String(kit.n).padStart(2, "0")}_`;
  return COMPONENTS.map(({ suffix, ...rest }) => ({
    ...rest,
    name: `${prefix}${suffix}`,
  }));
}

/**
 * Validate a requested download. Returns the repo-relative path only when the
 * kit exists, is released, and the filename is exactly one from the manifest
 * (no path input ever touches the filesystem lookup).
 */
export function resolveKitFile(
  slug: string,
  fileName: string
): { kit: KitMeta; file: KitFile; relPath: string } | null {
  const kit = kitBySlug.get(slug);
  if (!kit || kit.status !== "released") return null;
  const file = kitFiles(kit).find((f) => f.name === fileName);
  if (!file) return null;
  return { kit, file, relPath: `kits/${kitDirName(kit.n)}/${file.name}` };
}
