import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/site/mobile-nav";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";

/** Sticky light header with blur, restored from the original build's design. */
export async function SiteHeader() {
  const user = isSupabaseConfigured ? await getSessionUser() : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/account">Account</Link>
              </Button>
              <Button asChild variant="accent" size="sm">
                <Link href="/library">My Library</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild variant="accent" size="sm">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </>
          )}
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
