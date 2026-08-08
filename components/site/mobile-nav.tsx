"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full z-50 border-b bg-background px-6 pb-8 pt-4 shadow-lg">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-3">
              <Button asChild variant="outline" className="flex-1" size="sm">
                <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
              </Button>
              <Button asChild variant="accent" className="flex-1" size="sm">
                <Link href="/pricing" onClick={() => setOpen(false)}>See Pricing</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
