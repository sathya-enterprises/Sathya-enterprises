import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, postHref, type BlogPost } from "@/content/blog";
import { Reveal } from "@/components/inner/Reveal";

/**
 * One post as a card: photo, category, title, excerpt and date. The whole card is the link. `bare`
 * gives just the contents, for a CardWheel, which draws the card itself.
 */
export function PostCard({ post, i = 0, bare }: { post: BlogPost; i?: number; bare?: boolean }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
        />
        <span className="t-eyebrow absolute left-3 top-3 rounded-full bg-(--card-accent) px-3 py-1.5 text-(--card)">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-bold text-(--card-accent)">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
        </p>
        <h3 className="mt-2 font-display text-xl font-extrabold uppercase leading-tight tracking-tight">
          <Link href={postHref(post)} className="after:absolute after:inset-0 focus:outline-hidden">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-pretty text-(--card-soft)">{post.excerpt}</p>
        <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold uppercase tracking-wide text-(--card-accent)">
          Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  );
  return bare ? (
    <article className="group flex h-full flex-col">{body}</article>
  ) : (
    <Reveal
      as="article"
      i={i}
      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-(--card) text-(--card-ink) shadow-2 transition-[translate] duration-300 hover:-translate-y-1.5"
    >
      {body}
    </Reveal>
  );
}
