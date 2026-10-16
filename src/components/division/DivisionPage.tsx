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
import { Reveal } from "@/components/inner/Reveal";
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
    <div className="min-h-screen bg-ivory">
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

      <Section id="services-title" tone="warm">
        <SectionHeading id="services-title" title={page.heading.join(" ")} lead={`${count} services, one team, one standard. Pick one or combine them.`} />
        <div className={`mt-10 grid grid-cols-1 gap-6 ${count > 1 ? "lg:grid-cols-2" : ""}`}>
          {page.services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} Icon={ICONS[s.slug]} i={i % 2} />
          ))}
        </div>
      </Section>

      <Section id="ecosystem-title">
        <SectionHeading
          id="ecosystem-title"
          title="Part of one connected ecosystem"
          lead="Every division feeds the next. Work with one and the others are ready when you need them."
          center
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemChain.map((s, i) => {
            const d = divisionById[s.id];
            const here = s.id === id;
            return (
              <Reveal as="li" key={s.id} i={i}>
                <Link
                  href={d.href}
                  aria-current={here ? "page" : undefined}
                  className={`flex h-full flex-col rounded-lg border p-6 transition-colors ${
                    here ? "border-red bg-red/5" : "border-ink/10 bg-white hover:border-red"
                  }`}
                >
                  <IconTile Icon={DIVISION_ICONS[s.id]} />
                  <span className="mt-4 text-sm font-semibold text-red">
                    {d.index} · {s.role}
                  </span>
                  <span className="mt-1 text-lg font-semibold text-ink">{d.name.charAt(0) + d.name.slice(1).toLowerCase()}</span>
                  <span className="mt-2 text-sm text-charcoal-soft">{s.line}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-ink">
                    {here ? "You're here" : <>Explore <ArrowRight aria-hidden className="size-4" /></>}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <CtaSplit heading={page.cta.heading} body={ctaBody} label={page.cta.label} image={ctaPhoto} />
    </div>
  );
}
