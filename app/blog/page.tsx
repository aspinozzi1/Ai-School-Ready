import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, teacher-voiced writing on AI in K-12 schools from the educators behind AI-Ready School.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center md:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">The blog</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Practical writing on AI in real classrooms, from two teachers who
            use it there.
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-muted">
              First posts are on their way. Check back shortly.
            </p>
          )}
          {posts.map((p) => (
            <article
              key={p.slug}
              className="rounded-card border border-mist bg-white p-8 transition-shadow hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">
                {p.author} · {formatDate(p.date)}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-navy">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-muted">{p.description}</p>
              <Link
                href={`/blog/${p.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-teal hover:underline"
              >
                Read the post
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
