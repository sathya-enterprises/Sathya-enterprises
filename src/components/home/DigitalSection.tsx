"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import {
  MegaphoneIcon,
  PaletteIcon,
  GlobeIcon,
  SearchIcon,
  TargetIcon,
  Share2Icon,
  InstagramIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";

const DIGITAL_SERVICES = [
  {
    num: "01",
    label: "Digital Marketing",
    href: "/digital-marketing",
    desc: "Full-funnel growth campaigns combining paid media, precision targeting, and conversion optimization.",
    icon: MegaphoneIcon,
    tags: ["Paid Ads", "Conversion Rate", "Attribution"],
  },
  {
    num: "02",
    label: "Web Development",
    href: "/web-development",
    desc: "High-performance enterprise websites and custom web applications engineered for speed and search visibility.",
    icon: GlobeIcon,
    tags: ["Next.js", "Full-Stack", "Edge Performance"],
  },
  {
    num: "03",
    label: "SEO Engineering",
    href: "/seo",
    desc: "Technical SEO, semantic architecture, and high-authority link acquisition to secure durable rank dominance.",
    icon: SearchIcon,
    tags: ["Technical SEO", "Semantic Schema", "Rank #1"],
  },
  {
    num: "04",
    label: "Brand & Logo Design",
    href: "/logo-design",
    desc: "Distinctive identity systems, brand manuals, and digital asset kits built to command premium market positioning.",
    icon: PaletteIcon,
    tags: ["Identity", "Design System", "Vector Assets"],
  },
  {
    num: "05",
    label: "SEM & Search Ads",
    href: "/sem",
    desc: "High-intent search engine marketing focused on lowering customer acquisition cost while maximizing pipeline volume.",
    icon: TargetIcon,
    tags: ["Google Ads", "Bidding Systems", "High Intent"],
  },
  {
    num: "06",
    label: "Social Media Management",
    href: "/social-media-management",
    desc: "Strategic content distribution and community architecture across LinkedIn, X, and enterprise networks.",
    icon: Share2Icon,
    tags: ["Editorial Strategy", "Community", "Brand Voice"],
  },
  {
    num: "07",
    label: "Instagram Marketing",
    href: "/instagram-marketing",
    desc: "High-velocity visual storytelling, short-form viral loops, and direct-response DM automation funnels.",
    icon: InstagramIcon,
    tags: ["Short-form Video", "DM Funnels", "Creator Strategy"],
  },
  {
    num: "08",
    label: "High-Intent Lead Gen",
    href: "/lead-generation",
    desc: "Predictable, qualified B2B and consumer lead pipelines delivered straight to your CRM and sales team.",
    icon: ArrowUpRightIcon,
    tags: ["CRM Integration", "Lead Verification", "Pipeline Scale"],
  },
];

export default function DigitalSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.08);

  return (
    <section aria-labelledby="digital-heading" className="section--chalk">
      <div className="container">
        {/* Section Head: Google Labs Split Format */}
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Digital Verticals</span>
            <h2 id="digital-heading" className="t-h2">
              DIGITAL ACCELERATION
            </h2>
            <p className="t-lead" style={{ marginTop: "0.75rem" }}>
              Engineered acquisition channels that transform raw traffic into qualified pipeline and compounding enterprise brand equity.
            </p>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/ecosystem#digital">
              <span>Explore All Digital</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        {/* Bento Grid Layout - 3 Card Grid */}
        <div ref={gridRef} className="grid grid--3" style={{ gap: "1.25rem" }}>
          {DIGITAL_SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="card bento-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.75rem",
                  background: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  {/* Top Bar: Icon + Monospace Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "8px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-ink)",
                      }}
                      className="bento-icon"
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.14em",
                        color: "var(--color-gold)",
                        fontWeight: 700,
                      }}
                    >
                      {s.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="card__title"
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      lineHeight: 1.25,
                      marginBottom: "0.6rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="t-body"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--color-ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>

                {/* Bottom Metadata & Hover Action */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.55rem",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-ink-soft)",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--color-line)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                      }}
                    >
                      Explore Vertical
                    </span>
                    <span
                      className="bento-arrow"
                      style={{
                        color: "var(--color-gold)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>

                <span className="card__line" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .bento-card:hover .bento-arrow {
          transform: translateX(4px);
        }
        .bento-card:hover .bento-icon {
          background: var(--color-ink) !important;
          color: var(--color-chalk) !important;
          border-color: var(--color-ink) !important;
        }
      `}</style>
    </section>
  );
}
