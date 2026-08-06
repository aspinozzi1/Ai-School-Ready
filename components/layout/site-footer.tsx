import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footerNav, site, HARD_RULE } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              {site.description}
            </p>
            <p className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
              {HARD_RULE}
            </p>
          </div>

          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-foreground">{group}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {site.launchYear} {site.name}. Built by two teachers, privacy-first.
          </p>
          <p>
            Questions?{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="font-medium text-accent hover:underline"
            >
              {site.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
