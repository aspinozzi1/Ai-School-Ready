import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getAllSlugs, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
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
      <article>
        <div className="border-b bg-secondary/40">
          <Container className="py-12">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> All posts
              </Link>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <Badge variant="secondary">{post.category}</Badge>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                By {post.author}
              </p>
            </div>
          </Container>
        </div>

        <Section className="py-12">
          <Container>
            <div className="prose-content mx-auto max-w-3xl text-foreground">
              <MDXRemote source={post.content} />
            </div>

            {post.authorBio && (
              <div className="mx-auto mt-10 max-w-3xl rounded-2xl border bg-secondary/40 p-6">
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-sm text-accent">{post.authorRole}</p>
                <p className="mt-2 text-sm text-muted-foreground">{post.authorBio}</p>
              </div>
            )}
          </Container>
        </Section>
      </article>

      <CtaBand
        title="Put this into practice"
        subtitle="Start with 5 free prompts, or get the full kit for your class or school."
      />
    </>
  );
}
