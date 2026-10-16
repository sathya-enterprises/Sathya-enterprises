import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Arrive } from "@/components/inner/Arrive";
import { Reveal } from "@/components/inner/Reveal";
import { CardWheel } from "@/components/inner/CardWheel";
import { CardFan } from "@/components/inner/CardFan";
import { CardDeck } from "@/components/inner/CardDeck";
import { Eyebrow } from "@/components/home/primitives";
import { Shape } from "@/components/home/ShapeField";
import { whatsappHref } from "@/content/site";
import type { ServiceDetail } from "@/content/pages";

/**
 * Section patterns for the inner pages (split intro, section heading, feature grid, steps, service
 * cards, FAQ, split CTA), set strictly in the home page's Karnataka-flag colours: every section is
 * solid gold or solid red and its cards take the other colour (.tone-gold / .tone-red in
 * globals.css), with brand shapes behind. Each section is one screen tall: headings are capped by
 * the screen height (like .t-h1). Card sets move in one of a few ways so sections don't repeat
 * each other: the home page's turning wheel for big sets (CardWheel), a fanned hand for small ones
 * (CardFan), a self-dealing deck beside a heading (CardDeck) and a zig-zag timeline for steps; the
 * brand shapes behind change from section to section too. Blocks lift in as the section arrives.
 */

export const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/** One screen tall, clear of the fixed header, content centred in what is left. */
const screen = "relative flex min-h-svh flex-col overflow-hidden pb-10 pt-[calc(var(--header-h)+1.75rem)] md:pb-12";

/** Heading sizes, capped by screen height so a heading never crowds out its section. */
const h1Size = "text-[clamp(2rem,min(4.4vw,7.5vh),3.75rem)] leading-[0.98] tracking-[-0.03em]";
const h2Size = "text-[clamp(1.75rem,min(3.4vw,6vh),2.9rem)] leading-[1] tracking-[-0.03em]";

export type Tone = "gold" | "red";

export function Button({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  external?: boolean;
}) {
  const look = {
    primary: "bg-red text-ivory shadow-2 hover:bg-red-deep",
    secondary: "border-2 border-red text-red hover:bg-red hover:text-ivory",
    gold: "bg-gold text-ink hover:bg-gold-tint",
  }[variant];
  const cls = `inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-[background-color,color,transform] duration-200 active:scale-95 ${look}`;
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

/** Colours the last word of a heading (or `accent`, when given) in the tone's accent colour. */
function Accented({ title, accent, className = "text-(--tone-accent)" }: { title: string; accent?: string; className?: string }) {
  const cut = accent ? title.length : title.lastIndexOf(" ") + 1;
  return (
    <>
      {title.slice(0, cut)}
      {accent && " "}
      <span className={className}>{accent ?? title.slice(cut)}</span>
    </>
  );
}

type ShapeKind = React.ComponentProps<typeof Shape>["kind"];

/** Arrangements of brand shapes (kind, placement, size), so neighbouring sections differ. */
const SHAPE_SETS: [ShapeKind, string][][] = [
  [
    ["clover", "-right-24 top-16 w-[clamp(9rem,22vw,19rem)] -rotate-12"],
    ["hexagon", "-bottom-20 -left-16 w-[clamp(8rem,16vw,14rem)] rotate-12"],
  ],
  [
    ["circle", "-left-28 -top-10 w-[clamp(10rem,24vw,20rem)]"],
    ["square", "-bottom-24 -right-20 w-[clamp(9rem,20vw,17rem)] rotate-[24deg]"],
  ],
  [
    ["hexagon", "-right-14 bottom-[18%] w-[clamp(7rem,14vw,12rem)] -rotate-6"],
    ["clover", "-left-24 -top-16 w-[clamp(9rem,20vw,16rem)] rotate-12"],
    ["circle", "bottom-[-4rem] left-[38%] hidden w-32 md:block"],
  ],
  [
    ["square", "-left-20 top-[30%] w-[clamp(8rem,17vw,14rem)] -rotate-[18deg]"],
    ["circle", "-right-24 -bottom-24 w-[clamp(10rem,24vw,20rem)]"],
  ],
];

/** Large brand shapes bleeding off a section's edges, in a shade of the section's own colour. */
function Shapes({ set = 0 }: { set?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-(--tone-shape)">
      {SHAPE_SETS[set % SHAPE_SETS.length].map(([kind, place], i) => (
        <div key={i} className={`rise-shape absolute ${place}`} style={step(i)}>
          <Shape kind={kind} />
        </div>
      ))}
    </div>
  );
}

/** A stable pick from a section's id, so each section keeps its own arrangement. */
const pick = (id: string) => [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * The page opens straight into this (no hero), one screen tall: a gold panel with the H1 and the
 * page's positioning beside a photo (or any other content) on a red block, and a red band along
 * the foot — the Karnataka flag the home page is built on. Phones drop the photo to stay on one screen.
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
  const media = image || children;
  return (
    <Arrive className={`tone-gold ${screen} bg-gold pb-16 md:pb-20`} aria-labelledby="page-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="rise-shape absolute -right-24 top-16 w-[clamp(9rem,24vw,20rem)] -rotate-12 text-gold-tint" style={step(1)}>
          <Shape kind="clover" />
        </div>
        <div className="rise-shape absolute -bottom-10 -left-24 w-[clamp(8rem,18vw,14rem)] text-red" style={step(2)}>
          <Shape kind="circle" />
        </div>
      </div>
      {/* The flag's red half, as a band along the foot. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-5 bg-red md:h-8" />

      <div className={`${wrap} relative my-auto grid grid-cols-1 gap-10 ${media ? "md:grid-cols-2 md:items-center md:gap-14" : ""}`}>
        <div className={media ? "" : "max-w-3xl"}>
          <div className="rise">
            <Eyebrow>{kicker}</Eyebrow>
          </div>
          <h1 id="page-title" className={`rise mt-5 text-balance font-display font-extrabold uppercase text-ink ${h1Size}`} style={step(1)}>
            <Accented title={title} className="text-red" />
          </h1>
          <div className="rise mt-5 space-y-3 text-pretty text-base font-medium text-ink md:text-lg" style={step(2)}>
            {lead}
          </div>
          {actions && (
            <div className="rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(3)}>
              <Button href="/contact">
                Start a Conversation <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={whatsappHref()} variant="secondary" external>
                Chat on WhatsApp
              </Button>
            </div>
          )}
        </div>
        {media && (
          <div className={`rise relative ${image ? "hidden md:block" : ""}`} style={step(3)}>
            {/* Set on a red block, offset like a stacked card. */}
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] bg-red md:translate-x-4 md:translate-y-4" />
            <div className="relative">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3] max-h-[58svh] w-full rounded-[26px] object-cover shadow-2"
                />
              ) : (
                children
              )}
            </div>
          </div>
        )}
      </div>
    </Arrive>
  );
}

/** Section title and lead, like the home headlines: uppercase, the last word in the accent colour. */
export function SectionHeading({
  id,
  title,
  accent,
  lead,
  center,
}: {
  id: string;
  title: string;
  /** Words to carry the accent colour, after `title`; defaults to the title's last word. */
  accent?: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 id={id} className={`rise text-balance font-display font-extrabold uppercase text-(--tone-head) ${h2Size}`}>
        <Accented title={title} accent={accent} />
      </h2>
      <span aria-hidden className={`rise-line mt-4 block h-1.5 w-20 rounded-full bg-(--tone-accent) ${center ? "mx-auto" : ""}`} />
      {lead && (
        <p className={`rise mt-4 max-w-2xl text-pretty font-medium text-(--tone-lead) md:text-lg ${center ? "mx-auto" : ""}`} style={step(1)}>
          {lead}
        </p>
      )}
    </div>
  );
}

/**
 * A solid gold or red section, one screen tall, with brand shapes behind; its cards take the
 * other colour. `fit` holds it to exactly one screen, for content that scrolls inside itself.
 */
export function Section({ id, children, tone = "gold", fit }: { id: string; children: React.ReactNode; tone?: Tone; fit?: boolean }) {
  return (
    <Arrive className={`tone-${tone} ${screen} ${fit ? "h-svh" : ""} ${tone === "red" ? "bg-red" : "bg-gold"}`} aria-labelledby={id}>
      <Shapes set={pick(id)} />
      <div className={`${wrap} relative flex min-h-0 flex-1 flex-col justify-center`}>{children}</div>
    </Arrive>
  );
}

export function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="inline-flex shrink-0 self-start rounded-2xl bg-(--card-accent) p-3 text-(--card)">
      <Icon aria-hidden className="size-6" strokeWidth={2} />
    </span>
  );
}

/** A disc of the accent colour peeking in at a card's corner. */
function CornerDisc() {
  return <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-(--card-accent) opacity-25" />;
}

/** Contents of a feature card (icon tile, title, body), for a CardWheel. */
export function FeatureCard({ Icon, title, children }: { Icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <>
      <CornerDisc />
      <IconTile Icon={Icon} />
      <h3 className="mt-4 font-display text-xl font-extrabold uppercase leading-tight tracking-tight">{title}</h3>
      <p className="mt-2 text-pretty text-(--card-soft)">{children}</p>
    </>
  );
}

/** Heading on one side, the items as a self-dealing deck of cards on the other. */
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
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <SectionHeading id={id} title={title} lead={lead} />
      <CardDeck label={title}>
        {items.map((it) => (
          <FeatureCard key={it.title} Icon={it.Icon} title={it.title}>
            {it.body}
          </FeatureCard>
        ))}
      </CardDeck>
    </div>
  );
}

/** A set of feature cards on the turning wheel. */
export function FeatureWheel({
  label,
  items,
  className = "mt-6",
}: {
  label: string;
  items: { Icon: LucideIcon; title: string; body: React.ReactNode }[];
  className?: string;
}) {
  return (
    <CardWheel label={label} className={className}>
      {items.map((it) => (
        <FeatureCard key={it.title} Icon={it.Icon} title={it.title}>
          {it.body}
        </FeatureCard>
      ))}
    </CardWheel>
  );
}

/** A small set of feature cards held as a fanned hand. */
export function FeatureFan({
  label,
  items,
  className = "mt-8",
}: {
  label: string;
  items: { Icon: LucideIcon; title: string; body: React.ReactNode }[];
  className?: string;
}) {
  return (
    <CardFan label={label} className={className}>
      {items.map((it) => (
        <FeatureCard key={it.title} Icon={it.Icon} title={it.title}>
          {it.body}
        </FeatureCard>
      ))}
    </CardFan>
  );
}

/**
 * Numbered process steps as a zig-zag timeline: a rule draws across, then the cards are dealt
 * onto it one by one, alternately above and below the line (stacked down a spine on phones).
 */
/** Large-screen column per step (static classes, so Tailwind sees them). */
const COL = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4", "lg:col-start-5"];

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol
      className={`relative mt-8 grid grid-cols-1 gap-3 pl-10 lg:grid-flow-dense lg:grid-rows-2 lg:gap-x-4 lg:gap-y-12 lg:pl-0 ${
        items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
      }`}
    >
      {/* The line the steps hang from: down the side on phones, across the middle on large screens. */}
      <span aria-hidden className="rise-line-y absolute bottom-0 left-4 top-0 w-1 rounded-full bg-(--card) lg:hidden" />
      <span aria-hidden className="rise-line absolute inset-x-0 top-1/2 hidden h-1 -translate-y-1/2 rounded-full bg-(--card) lg:block" />
      {items.map((s, i) => {
        const low = i % 2 === 1;
        return (
          <Reveal
            as="li"
            key={s.title}
            i={i}
            className={`deal relative ${COL[i]} ${low ? "lg:row-start-2" : "lg:row-start-1"}`}
            style={{ "--tilt": `${low ? 6 : -6}deg` } as React.CSSProperties}
          >
            {/* Knot where the card meets the line. */}
            <span
              aria-hidden
              className={`absolute -left-[1.85rem] top-5 z-10 size-4 rounded-full border-4 border-(--card) bg-(--card-accent) lg:left-1/2 lg:-translate-x-1/2 ${
                low ? "lg:-top-[2.1rem]" : "lg:-bottom-[2.1rem] lg:top-auto"
              }`}
            />
            <div className="relative h-full overflow-hidden rounded-[22px] bg-(--card) p-5 text-(--card-ink) shadow-2">
              <CornerDisc />
              <div className="flex items-baseline gap-3 lg:block">
                <span aria-hidden className="font-display text-3xl font-extrabold leading-none tracking-tighter text-(--card-accent) lg:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight lg:mt-3 lg:text-xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-pretty text-sm text-(--card-soft) lg:text-base">{s.body}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

/**
 * Contents of one service card: what it is, what's included, who it's for and how it runs. On the
 * wheel it is as tall as the screen allows and scrolls within itself.
 */
/**
 * A service as a fixed-height card that lifts in when it scrolls into view; `i` staggers a row's
 * cards. Contents are trimmed to fit (overview to three lines, one short list); the full detail
 * stays in the page's structured data.
 */
export function ServiceCard({ service, Icon, i = 0 }: { service: ServiceDetail; Icon: LucideIcon; i?: number }) {
  // One list per card: a single group's first four items, or the lead item for each audience.
  const items =
    service.included.length === 1 ? service.included[0].items.slice(0, 4) : service.included.map((g) => g.items[0]).slice(0, 4);
  return (
    <Reveal
      as="article"
      i={i}
      aria-label={service.name}
      className="relative flex h-[27rem] flex-col overflow-hidden rounded-[26px] bg-(--card) p-6 text-(--card-ink) shadow-2 transition-[translate] duration-300 hover:-translate-y-1.5"
    >
      <CornerDisc />
      <div className="relative flex items-center gap-4">
        <IconTile Icon={Icon} />
        <h3 className="line-clamp-2 font-display text-xl font-extrabold uppercase leading-tight tracking-tight">{service.name}</h3>
      </div>

      <p className="mt-4 line-clamp-3 text-pretty text-(--card-soft)">{service.overview}</p>

      <h4 className="t-eyebrow mt-5 text-(--card-accent)">What&apos;s included</h4>
      <ul className="mt-2.5 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-(--card-soft)">
            <span aria-hidden className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-(--card-accent) text-(--card)">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-(--card-accent) px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-(--card) transition-transform active:scale-95"
        >
          {service.cta}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Reveal>
  );
}

/** Native disclosure rows as cards. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-8 space-y-3">
      {items.map((f, i) => (
        <Reveal as="details" key={f.q} className={`group relative overflow-hidden rounded-[24px] bg-(--card) px-5 py-4 text-(--card-ink) shadow-2 [&_summary::-webkit-details-marker]:hidden`} open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between gap-4">
            <h3 className="font-display text-base font-extrabold uppercase leading-tight tracking-tight md:text-lg">{f.q}</h3>
            <span
              aria-hidden
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-(--card-accent) text-xl leading-none text-(--card) transition-[rotate] duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-pretty text-(--card-soft)">{f.a}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Closing call as a flag: copy on red, the photo set beside it, on a gold section. */
export function CtaSplit({ heading, body, label, image }: { heading: string; body: string; label: string; image: StaticImageData }) {
  return (
    <Arrive className={`tone-gold ${screen} justify-center bg-gold`} aria-labelledby="cta-title">
      <Shapes set={3} />
      <div className={`${wrap} relative`}>
        <div className="relative overflow-hidden rounded-[28px] bg-red shadow-2 sm:grid sm:grid-cols-2">
          <div aria-hidden className="rise-shape pointer-events-none absolute -bottom-20 left-[34%] hidden w-44 rotate-12 text-red-deep sm:block">
            <Shape kind="clover" />
          </div>
          <div className="relative p-7 md:p-10 lg:px-14 lg:py-16">
            <h2 id="cta-title" className={`rise text-balance font-display font-extrabold uppercase text-ivory ${h2Size}`}>
              <Accented title={heading} className="text-gold" />
            </h2>
            <p className="rise mt-5 text-pretty text-ivory/85 md:text-lg" style={step(1)}>
              {body}
            </p>
            <div className="rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(2)}>
              <Button href="/contact" variant="gold">
                {label} <ArrowRight aria-hidden className="size-4" />
              </Button>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-ink sm:w-auto"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative p-3 sm:p-4 sm:pl-0">
            <div className="relative h-44 overflow-hidden rounded-[22px] sm:h-full sm:min-h-72">
              <Image src={image} alt="" fill placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Arrive>
  );
}
