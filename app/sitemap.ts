import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllSlugs } from "@/lib/blog";

/** SEO sitemap of all public pages + blog posts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/how-it-works",
    "/pricing",
    "/about",
    "/faq",
    "/contact",
    "/free",
    "/blog",
    "/privacy",
    "/terms",
    "/ferpa",
    "/login",
    "/signup",
  ];

  const routes: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  for (const slug of getAllSlugs()) {
    routes.push({
      url: `${base}/blog/${slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return routes;
}
