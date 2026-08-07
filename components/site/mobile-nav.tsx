"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="rounded-btn p-2 text-mist hover:text-white"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-navy px-6 pb-8 pt-4 shadow-lg">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-btn px-3 py-3 font-semibold text-mist hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-btn bg-teal px-4 py-3 text-center font-semibold text-white"
              >
                Log in / My Library
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
