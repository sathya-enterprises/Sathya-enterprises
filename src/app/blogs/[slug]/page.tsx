import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { breadcrumbLd, pageMeta, siteName, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, getPost, postHref, posts } from "@/content/blog";
import { Arrive } from "@/components/inner/Arrive";
import { Button, Section, SectionHeading, step } from "@/components/inner/Sections";
import { CardFan } from "@/components/inner/CardFan";
import { Eyebrow } from "@/components/home/primitives";
import { PostCard } from "@/components/blog/PostCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: postHref(post) });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gold-light">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Blogs", path: "/blogs" },
            { name: post.title, path: postHref(post) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            url: `${siteUrl}${postHref(post)}`,
            author: { "@type": "Organization", name: siteName },
            publisher: { "@type": "Organization", name: siteName },
          },
        ]}
      />

      <Arrive as="article" className="pb-16 md:pb-24" aria-labelledby="page-title">
        {/* Title on a gold panel; the photo drops out of it, over the red band at its foot. */}
        <div className="relative overflow-hidden bg-gold pb-40 pt-32 md:pb-56 md:pt-40">
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-6 bg-red md:h-10" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link href="/blogs" className="rise inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-red hover:text-red-deep">
              <ArrowLeft aria-hidden className="size-4" /> All blogs
            </Link>
            <div className="rise mt-6" style={step(1)}>
              <Eyebrow>{post.category}</Eyebrow>
            </div>
            <h1
              id="page-title"
              className="rise mt-5 text-balance font-display text-[clamp(2rem,min(4.4vw,7.5vh),3.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink"
              style={step(1)}
            >
              {post.title}
            </h1>
            <p className="rise mt-5 font-semibold text-ink" style={step(2)}>
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Image
            src={post.image}
            alt=""
            placeholder="blur"
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="rise relative -mt-32 aspect-[16/9] w-full rounded-[28px] border-4 border-red object-cover shadow-2 md:-mt-44"
            style={step(2)}
          />

          <div className="rise mt-12 space-y-10 text-pretty text-lg leading-relaxed text-ink" style={step(3)}>
            {post.body.map((section, s) => (
              <section key={s}>
                {section.heading && (
                  <h2 className="mb-4 border-l-[6px] border-red pl-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                {section.points && (
                  <ul className="mt-4 space-y-2">
                    {section.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span aria-hidden className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold text-red">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-[28px] bg-red p-7 shadow-2 sm:p-10">
            <p className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-ivory md:text-3xl">
              Want help putting this into <span className="text-gold">practice?</span>
            </p>
            <p className="mt-3 text-ivory/85">Book a free consultation and we&apos;ll look at your business together.</p>
            <div className="mt-6">
              <Button href="/contact" variant="gold">
                Book A Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </Arrive>

      <Section id="more-title" tone="red">
        <SectionHeading id="more-title" title="More from the blog" center />
        <CardFan label="More from the blog" size="post" padded={false} start={1} className="mt-6">
          {more.map((p) => (
            <PostCard key={p.slug} post={p} bare />
          ))}
        </CardFan>
      </Section>
    </div>
  );
}
