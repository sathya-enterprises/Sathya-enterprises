import Link from "next/link";
import type { StaticImageData } from "next/image";
import {
  ArrowRight,
  Bot,
  Bus,
  Camera,
  Cctv,
  Code,
  Database,
  DraftingCompass,
  Drill,
  Droplets,
  FileSpreadsheet,
  Magnet,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  PenTool,
  Rocket,
  Search,
  Share2,
  Store,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaSplit, IconTile, PageIntro, Section, SectionHeading, ServiceCard } from "@/components/inner/Sections";
import { CardWheel } from "@/components/inner/CardWheel";
import { CardFan } from "@/components/inner/CardFan";
import { divisionById, type DivisionId } from "@/content/site";
import { ctaBody, divisionPages, systemChain } from "@/content/pages";
import { breadcrumbLd, servicesLd } from "@/lib/seo";
import digitalPhoto from "@/assets/photos/digital.webp";
import technologyPhoto from "@/assets/photos/technology.webp";
import productsPhoto from "@/assets/photos/products.webp";
import servicesPhoto from "@/assets/photos/services.webp";
import meetingPhoto from "@/assets/photos/meeting.webp";
import teamPhoto from "@/assets/photos/team.webp";
import workshopPhoto from "@/assets/photos/workshop.webp";

const ICONS: Record<string, LucideIcon> = {
  "digital-marketing": Megaphone,
  "logo-design": PenTool,
  "web-development": Code,
  seo: Search,
  sem: MousePointerClick,
  "social-media-management": Share2,
  "instagram-marketing": Camera,
  "lead-generation": Magnet,
  "saas-products": Boxes,
  "ai-automation": Bot,
  "whatsapp-business-solutions": MessageCircle,
  "data-solutions": Database,
  "digital-data-products": FileSpreadsheet,
  "business-marketplace": Store,
  "water-pumps": Droplets,
  "borewell-services": Drill,
  "cctv-security": Cctv,
  travels: Bus,
  "interiors-architecture": DraftingCompass,
  "startup-consulting": Rocket,
};

/** Opening photo and closing-call photo per division. */
const PHOTOS: Record<DivisionId, [StaticImageData, StaticImageData]> = {
  digital: [digitalPhoto, meetingPhoto],
  technology: [technologyPhoto, teamPhoto],
  products: [productsPhoto, meetingPhoto],
  services: [servicesPhoto, workshopPhoto],
};

const DIVISION_ICONS: Record<DivisionId, LucideIcon> = {
  digital: Megaphone,
  technology: Bot,
  products: Boxes,
  services: Drill,
};

/**
 * A division page, straight into content: what the division does and where (H1 + positioning),
 * every service once as a full card, where it sits among the four divisions, then a closing call.
 */
export function DivisionPage({ id }: { id: DivisionId }) {
  const division = divisionById[id];
  const page = divisionPages[id];
  const name = division.name.charAt(0) + division.name.slice(1).toLowerCase();
  const [introPhoto, ctaPhoto] = PHOTOS[id];
  const count = page.services.length;

  return (
    <div className="min-h-screen bg-gold">
      <JsonLd
        data={[
          breadcrumbLd([{ name, path: division.href }]),
          servicesLd(
            `${name} — Sathya Enterprises`,
            division.href,
            page.services.map((s) => ({ name: s.name, description: `${s.hook} ${s.overview}` })),
          ),
        ]}
      />

      <PageIntro kicker={`${division.index} · ${name} — ${page.tagline}`} title={page.h1} lead={<p>{page.intro}</p>} image={introPhoto} />

      <Section id="services-title" tone="red">
        <SectionHeading id="services-title" title={page.heading[0]} accent={page.heading[1]} lead={`${count} services, one team, one standard. Pick one or combine them.`}
          center />
        {/* Every card is as tall as the longest one, so nothing scrolls inside a card. */}
        <CardWheel label={`${name} services`} size="service" className="mt-5">
          {page.services.map((s) => (
            <ServiceCard key={s.slug} service={s} Icon={ICONS[s.slug]} />
          ))}
        </CardWheel>
      </Section>

      <Section id="ecosystem-title">
        <SectionHeading
          id="ecosystem-title"
          title="Part of one connected ecosystem"
          lead="Every division feeds the next. Work with one and the others are ready when you need them."
        />
        <CardFan
          label="Sathya Enterprises divisions"
          padded={false}
          start={Math.max(0, systemChain.findIndex((s) => s.id === id))}
          className="mt-6"
        >
          {systemChain.map((s) => {
            const d = divisionById[s.id];
            const here = s.id === id;
            return (
              <div key={s.id} className="h-full">
                <Link
                  href={d.href}
                  aria-current={here ? "page" : undefined}
                  className="flex h-full flex-col p-6"
                >
                  <IconTile Icon={DIVISION_ICONS[s.id]} />
                  <span className="t-eyebrow mt-4 text-(--card-accent)">
                    {d.index} · {s.role}
                  </span>
                  <span className="mt-2 font-display text-2xl font-extrabold uppercase leading-none tracking-tight">
                    {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
                  </span>
                  <span className="mt-2 text-sm text-(--card-soft)">{s.line}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold uppercase tracking-wide text-(--card-accent)">
                    {here ? "You're here" : <>Explore <ArrowRight aria-hidden className="size-4" /></>}
                  </span>
                </Link>
              </div>
            );
          })}
        </CardFan>
      </Section>

      <CtaSplit heading={page.cta.heading} body={ctaBody} label={page.cta.label} image={ctaPhoto} />
    </div>
  );
}
