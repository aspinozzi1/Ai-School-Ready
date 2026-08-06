import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section } from "@/components/marketing/section";
import { PageHero } from "@/components/marketing/page-hero";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, teacher-voiced guidance on using AI safely in K-12 classrooms and schools.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="The blog"
        title="Practical AI, safely, for real classrooms"
        lead="Short reads for teachers and school leaders — no hype, no jargon, and never any student data."
      />
      <Section>
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              New posts are on the way. Check back soon.
            </p>
          ) : (
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Card key={post.slug} className="flex h-full flex-col transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span>{formatDate(post.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-primary">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                    >
                      Read post <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
