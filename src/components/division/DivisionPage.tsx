import { JsonLd } from "@/components/seo/JsonLd";
import { HeroParallax } from "@/components/home/HeroParallax";
import { EcosystemCards } from "@/components/home/EcosystemCards";
import { MoneySystemSequence } from "@/components/home/MoneySystemSequence";
import { toSteps } from "@/components/home/businessCards";
import { Accent } from "@/components/home/primitives";
import { businessesIn, divisionById, type DivisionId } from "@/content/site";
import { breadcrumbLd, servicesLd } from "@/lib/seo";

/**
 * A division page, built from the home page's own sections so it reads as the same site: the
 * layered mountain hero with the division's name, the ecosystem carousel showing only this
 * division's businesses, then each business flying past as a red card with what it does.
 */
export function DivisionPage({
  id,
  tagline,
  title,
  headline,
}: {
  id: DivisionId;
  /** Second line of the hero, under the division's name. */
  tagline: string;
  /** Carousel heading: plain part, then the accent part. */
  title: [string, string];
  /** Giant sliding headline over the flying cards. */
  headline: [string, string];
}) {
  const division = divisionById[id];
  const items = businessesIn(id, { includeAlso: id === "products" });
  const name = division.name.charAt(0) + division.name.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-ivory">
      <JsonLd
        data={[
          breadcrumbLd([{ name, path: division.href }]),
          servicesLd(`${name} — Sathya Enterprises`, division.href, items.map((b) => ({ name: b.name, description: b.intro }))),
        ]}
      />
      <HeroParallax top={name} bottom={tagline} label={`${name} — Sathya Enterprises`} />
      <EcosystemCards
        id="businesses"
        items={items}
        eyebrow={`${division.index} · ${name}`}
        title={
          <>
            {title[0]} <Accent>{title[1]}</Accent>
          </>
        }
        lead={division.summary}
      />
      <MoneySystemSequence id="what-we-do" steps={toSteps(items)} headline={headline} eyebrow="What we do" caption={division.role} />
    </div>
  );
}
