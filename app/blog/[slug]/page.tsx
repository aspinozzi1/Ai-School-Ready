import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber">
            {post.meta.author} · {formatDate(post.meta.date)}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            {post.meta.title}
          </h1>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="mx-auto w-full max-w-3xl">
          <article className="prose-custom rounded-card border border-mist bg-white p-8 md:p-12">
            <MDXRemote source={post.content} />
          </article>
          <div className="mt-10 rounded-card bg-navy p-8 text-center text-white">
            <p className="font-semibold">
              AI-Ready School builds PD kits your own coach can run.
            </p>
            <p className="mt-2 text-sm text-mist">
              Word-for-word scripts, verified research, hands-on labs.
            </p>
            <Link
              href="/curriculum"
              className="mt-5 inline-block rounded-btn bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Browse the curriculum
            </Link>
          </div>
          <p className="mt-8 text-center">
            <Link href="/blog" className="text-sm font-semibold text-teal hover:underline">
              ← All posts
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
