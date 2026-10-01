import { PageHero } from "@/components/ui/PageHero";

/** Legal pages are placeholders on the live site too — kept explicit rather than filled with invented terms. */
export function LegalPlaceholder({ crumb, title, body }: { crumb: string; title: string; body: string }) {
  return (
    <>
      <PageHero crumb={crumb} index="Legal" title={[title]} intro={body} />
      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          <p className="inline-flex rounded-full border border-dashed border-line-strong px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-charcoal-soft">
            Placeholder — draft content to be added before launch
          </p>
        </div>
      </section>
    </>
  );
}
