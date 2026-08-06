import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";
import { mainNav } from "@/config/site";
import { getSessionUser } from "@/lib/auth";
import { dashboardPathFor, roleLabel } from "@/lib/nav";

/**
 * Shared header on every page. Nav reflects auth state:
 * logged out → Log in / See Pricing; logged in → Dashboard + account menu.
 * (Flow-integrity rule #1.)
 */
export async function SiteHeader() {
  const user = await getSessionUser();
  const dashboardPath = user ? dashboardPathFor(user) : null;
  const accountPath =
    user?.profile.role === "school_admin"
      ? "/admin-school/billing"
      : user?.profile.role === "owner"
        ? "/owner"
        : "/dashboard/account";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href={dashboardPath!}>Dashboard</Link>
              </Button>
              <UserNav
                email={user.email}
                fullName={user.profile.full_name}
                roleLabel={roleLabel(user.profile.role)}
                dashboardPath={dashboardPath!}
                accountPath={accountPath}
              />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </>
          )}
        </div>

        <MobileNav
          items={mainNav}
          isLoggedIn={Boolean(user)}
          dashboardPath={dashboardPath}
        />
      </div>
    </header>
  );
}
