import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  authorBio: string;
  category: string;
  readingTime: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
}

/** The founders, so every post carries a real byline + bio. */
const AUTHORS: Record<string, { role: string; bio: string }> = {
  "Adam Spinozzi": {
    role: "Co-Founder · HS Woodshop / CTE teacher (grades 10-12)",
    bio: "Adam is an 8-year veteran high school woodshop teacher. He writes about the hands-on, older-student side of the classroom — where safety, real-world skills, and getting students ready for life after graduation come first.",
  },
  "Katelyn Spinozzi": {
    role: "Co-Founder · Veteran preschool teacher",
    bio: "Katelyn is a 10-year veteran preschool teacher. She writes from the very first classroom a child ever enters — where routines, play, and developmentally-appropriate practice shape everything, including how new tools belong.",
  },
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogMeta[] {
  return readSlugs()
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8")
      );
      return toMeta(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { ...toMeta(slug, data), content };
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

function toMeta(slug: string, data: Record<string, unknown>): BlogMeta {
  const author = String(data.author ?? "Adam Spinozzi");
  const known = AUTHORS[author];
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "2026-01-01"),
    author,
    authorRole: String(data.authorRole ?? known?.role ?? "Co-Founder"),
    authorBio: String(data.authorBio ?? known?.bio ?? ""),
    category: String(data.category ?? "General"),
    readingTime: String(data.readingTime ?? "5 min read"),
  };
}
