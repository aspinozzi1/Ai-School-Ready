import {
  ShieldCheck,
  Presentation,
  BookOpen,
  Map,
  type LucideIcon,
} from "lucide-react";

/** Map the string icon names used in config/site.ts to Lucide components. */
const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  Presentation,
  BookOpen,
  Map,
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
