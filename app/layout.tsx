import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { site } from "@/config/site";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Professional development your school runs itself`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="relative flex min-h-screen flex-col bg-paper text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
