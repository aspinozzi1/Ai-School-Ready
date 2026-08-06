import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep gated + API areas out of search results.
      disallow: ["/dashboard", "/admin-school", "/owner", "/api", "/auth", "/welcome", "/invite"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
