import Link from "next/link";
import { cn } from "@/lib/utils";

/** The approved AI-Ready School lockup: book-and-spark mark + wordmark. */
export function Logo({
  className,
  href = "/",
  dark = false,
}: {
  className?: string;
  href?: string;
  dark?: boolean;
}) {
  const pageFill = dark ? "#FFFFFF" : "#13293D";
  return (
    <Link
      href={href}
      className={cn("flex shrink-0 items-center", className)}
      aria-label="AI-Ready School home"
    >
      <svg viewBox="0 0 560 120" className="h-9 w-auto" role="img" aria-hidden>
        <path d="M62 14 L67 28 L81 33 L67 38 L62 52 L57 38 L43 33 L57 28 Z" fill="#2A9D8F" />
        <path d="M60 60 C 50 52, 36 50, 24 54 L24 88 C 36 84, 50 86, 60 94 Z" fill={pageFill} />
        <path d="M64 60 C 74 52, 88 50, 100 54 L100 88 C 88 84, 74 86, 64 94 Z" fill={pageFill} />
        <path d="M32 62 C 40 60, 48 61, 54 65" stroke="#2A9D8F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M92 62 C 84 60, 76 61, 70 65" stroke="#2A9D8F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text
          x="124"
          y="80"
          fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontSize="44"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          <tspan fill="#2A9D8F">AI-Ready</tspan>
          <tspan fill={dark ? "#FFFFFF" : "#13293D"}> School</tspan>
        </text>
      </svg>
    </Link>
  );
}
