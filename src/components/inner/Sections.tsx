import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Arrive } from "@/components/inner/Arrive";
import { Reveal } from "@/components/inner/Reveal";
import { whatsappHref } from "@/content/site";
import type { ServiceDetail } from "@/content/pages";

/**
 * Section patterns for the inner pages, adapted from HyperUI's open-source Tailwind marketing
 * blocks (github.com/markmead/hyperui): split section, section heading, feature grid, stats, steps,
 * FAQ and split CTA — restyled in the brand palette. Each section lifts its blocks in as it scrolls
 * into view (Arrive + .rise, staggered by --i); cards and rows reveal on their own arrival (Reveal).
 */

export const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export function Button({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const look =
    variant === "primary"
      ? "bg-red text-white hover:bg-red-deep"
      : "border border-ink/20 bg-white text-ink hover:border-red hover:text-red";
  const cls = `inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto px-6 py-3 text-sm font-semibold transition-colors focus:ring-2 focus:ring-gold focus:outline-hidden ${look}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * The page opens straight into this (no hero): H1 and the page's positioning on one side, a photo
 * or any other content on the other. HyperUI › Sections 1.
 */
export function PageIntro({
  kicker,
  title,
  lead,
  children,
  image,
  actions = true,
}: {
  kicker: string;
  title: string;
  lead: React.ReactNode;
  children?: React.ReactNode;
  image?: StaticImageData;
  actions?: boolean;
}) {
  return (
    <Arrive className="bg-ivory pb-16 pt-32 md:pb-24 md:pt-40" aria-labelledby="page-title">
      <div className={`${wrap} grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14`}>
        <div className="max-w-prose md:max-w-none">
          <p className="rise text-sm font-semibold uppercase tracking-wider text-red">{kicker}</p>
          <h1 id="page-title" className="rise mt-3 text-balance font-display text-3xl/tight font-bold text-ink sm:text-5xl/tight" style={step(1)}>
            {title}
          </h1>
          <div className="rise mt-5 space-y-4 text-pretty text-lg text-charcoal-soft" style={step(2)}>
            {lead}
          </div>
          {actions && (
            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(3)}>
              <Button href="/contact">
                Start a Conversation <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={whatsappHref()} variant="secondary" external>
                Chat on WhatsApp
              </Button>
            </div>
          )}
        </div>
        <div className="rise" style={step(2)}>
          {image ? (
            <Image src={image} alt="" placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover shadow-2" />
          ) : (
            children
          )}
        </div>
      </div>
    </Arrive>
  );
}

/** Section title and lead. HyperUI › Feature grids heading. */
export function SectionHeading({
  id,
  title,
  lead,
  center,
}: {
  id: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 id={id} className="rise font-display text-3xl/tight font-bold text-ink sm:text-4xl/tight">
        {title}
      </h2>
      {lead && (
        <p className="rise mt-4 text-pretty text-lg text-charcoal-soft" style={step(1)}>
          {lead}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  tone = "ivory",
}: {
  id: string;
  children: React.ReactNode;
  tone?: "ivory" | "warm" | "white";
}) {
  const bg = { ivory: "bg-ivory", warm: "bg-gold-light/60", white: "bg-white" }[tone];
  return (
    <Arrive className={`${bg} py-16 md:py-24`} aria-labelledby={id}>
      <div className={wrap}>{children}</div>
    </Arrive>
  );
}

export function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="inline-flex shrink-0 self-start rounded-lg bg-red/10 p-3 text-red">
      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
    </span>
  );
}

/** HyperUI › Feature grids 1: bordered card with an icon tile. */
export function FeatureCard({ Icon, title, children, i = 0 }: { Icon: LucideIcon; title: string; children: React.ReactNode; i?: number }) {
  return (
    <Reveal i={i} className="rounded-lg border border-ink/10 bg-white p-6 transition-shadow hover:shadow-2">
      <IconTile Icon={Icon} />
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-pretty text-charcoal-soft">{children}</p>
    </Reveal>
  );
}

/** HyperUI › Feature grids 2: heading on the left, icon list on the right. */
export function FeatureList({
  id,
  title,
  lead,
  items,
}: {
  id: string;
  title: string;
  lead?: string;
  items: { Icon: LucideIcon; title: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <SectionHeading id={id} title={title} lead={lead} />
      <ul className="space-y-6">
        {items.map((it, i) => (
          <Reveal as="li" key={it.title} i={1 + i} className="flex items-start gap-4">
            <IconTile Icon={it.Icon} />
            <div>
              <h3 className="text-lg font-semibold text-ink">{it.title}</h3>
              <p className="mt-1 text-charcoal-soft">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** Numbered process steps in a row of cards. */
export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className={`mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 ${items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} i={i} className="rounded-lg border border-ink/10 bg-white p-6">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-red text-sm font-bold text-white">{i + 1}</span>
          <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
          <p className="mt-1 text-pretty text-charcoal-soft">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/**
 * One service as a full card: what it is, what's included, who it's for and how it runs.
 * HyperUI › Cards, extended with the service detail.
 */
export function ServiceCard({ service, Icon, i = 0 }: { service: ServiceDetail; Icon: LucideIcon; i?: number }) {
  const titleId = `${service.slug}-title`;
  return (
    <Reveal
      as="article"
      id={service.slug}
      aria-labelledby={titleId}
      i={i}
      className="flex scroll-mt-28 flex-col rounded-lg border border-ink/10 bg-white p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <IconTile Icon={Icon} />
        <div>
          <h3 id={titleId} className="font-display text-xl font-bold text-ink sm:text-2xl">
            {service.name}
          </h3>
          <p className="mt-1 font-medium text-red">{service.hook}</p>
        </div>
      </div>

      <p className="mt-5 text-pretty text-charcoal-soft">{service.overview}</p>

      <div className={`mt-6 grid gap-6 ${service.included.length > 1 ? "sm:grid-cols-3" : ""}`}>
        {service.included.map((group, g) => (
          <div key={group.title ?? g}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">{group.title ?? "What's included"}</h4>
            <ul className={`mt-3 grid gap-2 ${service.included.length === 1 ? "sm:grid-cols-2" : ""}`}>
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-soft">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5 text-sm">
        {service.audience && (
          <div>
            <dt className="font-semibold text-ink">Who it&apos;s for</dt>
            <dd className="mt-0.5 text-charcoal-soft">{service.audience}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold text-ink">How it works</dt>
          <dd className="mt-0.5 text-charcoal-soft">{service.steps.join(" → ")}</dd>
        </div>
        {service.note && <dd className="text-charcoal-soft italic">{service.note}</dd>}
      </dl>

      <div className="mt-auto pt-6">
        <Link href="/contact" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:text-red-deep">
          {service.cta}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Reveal>
  );
}

/** HyperUI › FAQs 1: native disclosure rows. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-10 space-y-4">
      {items.map((f, i) => (
        <Reveal
          as="details"
          key={f.q}
          className="group rounded-lg border border-ink/10 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
          open={i === 0}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink">
            <h3 className="text-lg font-semibold">{f.q}</h3>
            <span aria-hidden className="shrink-0 text-xl text-red transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-pretty text-charcoal-soft">{f.a}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** HyperUI › CTAs 1: copy and button beside a photo. */
export function CtaSplit({ heading, body, label, image }: { heading: string; body: string; label: string; image: StaticImageData }) {
  return (
    <Arrive className="bg-ivory py-16 md:py-24" aria-labelledby="cta-title">
      <div className={wrap}>
        <div className="overflow-hidden rounded-lg bg-ink sm:grid sm:grid-cols-2">
          <div className="p-8 md:p-12 lg:px-16 lg:py-20">
            <h2 id="cta-title" className="rise font-display text-2xl font-bold text-white md:text-4xl/tight">
              {heading}
            </h2>
            <p className="rise mt-4 text-pretty text-white/75" style={step(1)}>
              {body}
            </p>
            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(2)}>
              <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-tint">
                {label} <ArrowRight aria-hidden className="size-4" />
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full sm:w-auto border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative h-56 sm:h-full">
            <Image src={image} alt="" fill placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </Arrive>
  );
}
