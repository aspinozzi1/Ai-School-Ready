"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { title: string; href: string };

export function MobileNav({
  items,
  isLoggedIn,
  dashboardPath,
}: {
  items: readonly NavItem[];
  isLoggedIn: boolean;
  dashboardPath: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "absolute inset-x-0 top-16 z-40 origin-top border-b bg-background shadow-lg transition-all",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t pt-4">
            {isLoggedIn && dashboardPath ? (
              <Button asChild onClick={() => setOpen(false)}>
                <Link href={dashboardPath}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
