import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** The "AI-Ready School" logo lockup: a rounded mark + wordmark. */
export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 font-bold", className)}
      aria-label={`${site.name} home`}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"
      >
        <span className="text-sm font-black tracking-tight">AI</span>
        <span className="sr-only">AI-Ready School</span>
      </span>
      <span className="text-lg leading-none tracking-tight text-primary">
        AI-Ready
        <span className="text-accent"> School</span>
      </span>
    </Link>
  );
}
