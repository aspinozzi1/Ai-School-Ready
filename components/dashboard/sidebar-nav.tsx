"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export type NavItem = { title: string; href: string; icon: keyof typeof Icons };

/** Sidebar / horizontal nav for gated areas, with active-link highlighting. */
export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Dashboard">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== pathname &&
            pathname.startsWith(item.href) &&
            item.href.split("/").length === pathname.split("/").length);
        const IconCmp = Icons[item.icon] as Icons.LucideIcon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {IconCmp && <IconCmp className="h-4 w-4" />}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
