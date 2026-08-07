import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";

export function SiteHeader() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" aria-label="AI-Ready School home" className="shrink-0">
          <Logo dark className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-mist transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
          >
            Log in / My Library
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
