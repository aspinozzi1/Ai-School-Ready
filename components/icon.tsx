import {
  ShieldCheck,
  Presentation,
  BookOpen,
  Map,
  Blocks,
  Accessibility,
  GraduationCap,
  Clock,
  type LucideIcon,
} from "lucide-react";

/** Map the string icon names used in config/site.ts + config/pillars.ts. */
const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  Presentation,
  BookOpen,
  Map,
  Blocks,
  Accessibility,
  GraduationCap,
  Clock,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = icons[name] ?? ShieldCheck;
  return <Cmp className={className} aria-hidden />;
}
