import { posts } from "@/content/blog";
import { PostCard } from "@/components/blog/PostCard";
import { Accent, ButtonLink, SectionHeader } from "./primitives";

/** Latest three posts on the home page, with a way through to the full blog. */
export function BlogTeaser() {
  return (
    <section id="blogs" aria-label="From the blog" className="section-y bg-ivory">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="From the Blog"
            title={
              <>
                Ideas that <Accent>grow.</Accent>
              </>
            }
            lead="Practical guides on marketing, technology, data and running a business."
          />
          <div className="shrink-0">
            <ButtonLink href="/blogs" variant="secondary">
              View All Blogs
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <PostCard key={post.slug} post={post} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
