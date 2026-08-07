import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/site/logo";

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
    <footer className="bg-navy text-navy-soft">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Logo dark className="h-9 w-auto" />
            <p className="mt-5 text-sm font-semibold tracking-wide text-mist">
              {site.tagline}
            </p>
            <p className="mt-4 text-sm">
              Built by {site.founders.display}, certified educators with 20+
              combined years in the classroom.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-white">{group}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed">
          <p>
            © {new Date().getFullYear()} AI-Ready School · {site.founders.display}. The
            platform stores no student information, ever. Certificates are Certificates of
            Completion; {site.certificate.disclaimer.toLowerCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
