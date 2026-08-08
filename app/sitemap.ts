import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/how-it-works", "/curriculum", "/pricing", "/about", "/faq",
    "/contact", "/free", "/resources", "/tools", "/blog",
    "/business-offices", "/privacy", "/terms", "/ferpa", "/disclosures",
  ].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
  }));
  return [...pages, ...posts];
}
