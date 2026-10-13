import { Eyebrow } from "@/components/home/primitives";

/**
 * Legal page shell. The live site has no policy text yet, only a placeholder line, so these pages
 * carry that line and stay out of search results (noindex in their metadata) until the real text is in.
 */
export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <section className="container-x min-h-[70svh] bg-ivory pb-(--section-y) pt-[calc(var(--header-h)+4rem)]">
      <div className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ink">
          {title}
        </h1>
        <p className="t-lead mt-6 text-ink-soft">{body}</p>
      </div>
    </section>
  );
}
