import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/brand/logo";

const footerLinks = {
  Product: [
    { label: "Curriculum", href: "/curriculum" },
    { label: "Pricing", href: "/pricing" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Free sample pack", href: "/free" },
  ],
  Resources: [
    { label: "Free Resource Library", href: "/resources" },
    { label: "AI Tool Library", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "For Business Offices", href: "/business-offices" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "FERPA & student privacy", href: "/ferpa" },
    { label: "Disclosures", href: "/disclosures" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm font-semibold tracking-wide text-primary">
              {site.tagline}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Built by {site.founders.display}, certified educators with 20+
              combined years in the classroom.
            </p>
            <p className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
              Never put student personally identifiable information into a
              public AI tool.
            </p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-foreground">{group}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Built by two teachers,
            privacy-first. The platform stores no student information, ever.
          </p>
          <p>
            Questions?{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-medium text-accent hover:underline"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
