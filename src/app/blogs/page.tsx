import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { posts } from "@/content/blog";
import { PageIntro, Section, SectionHeading } from "@/components/inner/Sections";
import { CardWheel } from "@/components/inner/CardWheel";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = pageMeta({
  title: "Blogs — Growth, Technology & Startup Insights",
  description: "Practical guides from Sathya Enterprises on digital marketing, SEO, WhatsApp automation, business data and startup compliance.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gold">
      <JsonLd data={[breadcrumbLd([{ name: "Blogs", path: "/blogs" }])]} />

      <PageIntro
        kicker="Blogs"
        title="Ideas to build, market and grow your business"
        lead={<p>Practical notes from our team on digital growth, technology, data and running a business in India.</p>}
        actions={false}
      />

      <Section id="posts-title" tone="red">
        <SectionHeading id="posts-title" title="Latest articles" center />
        <CardWheel label="Blog articles" size="post" padded={false} className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} bare />
          ))}
        </CardWheel>
      </Section>
    </div>
  );
}
