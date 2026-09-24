"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { useRevealOnScroll, useSplitReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: "digital",
    num: "01",
    title: "DIGITAL",
    description: "We grow businesses online — from first impression to loyal customer. Our digital arm covers the full funnel: awareness, engagement, lead capture, and conversion.",
    services: [
      { href: "/digital-marketing", label: "Digital Marketing" },
      { href: "/logo-design", label: "Logo Design" },
      { href: "/web-development", label: "Web Development" },
      { href: "/seo", label: "SEO" },
      { href: "/sem", label: "SEM" },
      { href: "/social-media-management", label: "Social Media Management" },
      { href: "/instagram-marketing", label: "Instagram Marketing" },
      { href: "/lead-generation", label: "Lead Generation" },
    ],
  },
  {
    id: "technology",
    num: "02",
    title: "TECHNOLOGY",
    description: "Technology is the backbone of the entire Sathya Enterprises ecosystem. We build SaaS products, automate with AI, and use data to drive better decisions.",
    services: [
      { href: "/money-making-system", label: "Money-Making System" },
      { href: "/saas-products", label: "SaaS Products" },
      { href: "/ai-automation", label: "AI Automation" },
      { href: "/whatsapp-business-solutions", label: "WhatsApp Business Solutions" },
      { href: "/data-solutions", label: "Data Solutions" },
    ],
  },
  {
    id: "products",
    num: "03",
    title: "PRODUCTS",
    description: "Our product line bridges the digital and physical worlds — from data assets you can buy and use immediately, to a marketplace for business deals.",
    services: [
      { href: "/digital-data-products", label: "Digital Data Products" },
      { href: "/business-marketplace", label: "Business Marketplace" },
    ],
  },
  {
    id: "services",
    num: "04",
    title: "SERVICES",
    description: "Physical services that complete the ecosystem — grounded in real-world needs across infrastructure, lifestyle, and business support.",
    services: [
      { href: "/water-pumps", label: "Water Pumps" },
      { href: "/borewell-services", label: "Borewell Services" },
      { href: "/cctv-security", label: "CCTV & Security" },
      { href: "/travels", label: "Travels" },
      { href: "/interiors-architecture", label: "Interiors & Architecture" },
      { href: "/startup-consulting", label: "Startup Management Consulting" },
    ],
  },
];

function CategorySection({
  cat,
  isGold,
}: {
  cat: (typeof CATEGORIES)[number];
  isGold: boolean;
}) {
  const splitRef = useSplitReveal<HTMLDivElement>();
  const listRef = useRevealOnScroll<HTMLDivElement>(0.06);

  return (
    <section
      id={cat.id}
      className={`eco-category${isGold ? " section--gold" : ""}`}
      aria-labelledby={`cat-heading-${cat.id}`}
    >
      <div className="container">
        <div ref={splitRef} className="split" style={{ marginBottom: "3rem" }}>
          <div>
            <span className="eyebrow">{cat.num}</span>
            <h2 id={`cat-heading-${cat.id}`} className="t-h2">{cat.title}</h2>
          </div>
          <p className="t-lead">{cat.description}</p>
        </div>

        <div ref={listRef} className="service-list">
          {cat.services.map((s) => (
            <Link key={s.href} className="service-item" href={s.href}>
              {s.label}
              <ArrowRightIcon size={14} />
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="btn btn--secondary" href="/contact">
            Get a Quote <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function EcosystemPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Page hero */}
      <section className="page-hero" aria-labelledby="ecosystem-heading">
        <div className="container" ref={heroRef}>
          <span className="eyebrow">Our Ecosystem</span>
          <h1 id="ecosystem-heading" className="t-h2" style={{ maxWidth: "28ch", marginBottom: "1.5rem" }}>
            ONE ENTERPRISE.<br />MANY BUSINESSES.
          </h1>
          <p className="t-lead" style={{ marginBottom: "2.5rem" }}>
            10+ business verticals — all connected, all feeding each other.
            This is what we mean by a business ecosystem.
          </p>

          {/* Category jump links */}
          <nav aria-label="Jump to category" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="btn btn--sm btn--secondary"
              >
                {cat.num} {cat.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Category sections with GSAP animations */}
      {CATEGORIES.map((cat, i) => (
        <CategorySection key={cat.id} cat={cat} isGold={i % 2 === 1} />
      ))}

      {/* CTA */}
      <section>
        <div className="container">
          <div ref={ctaRef} className="cta-band">
            <h2 className="t-h2">LET&apos;S BUILD WHAT&apos;S NEXT.</h2>
            <p className="t-lead">Ready to connect your business to the ecosystem?</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--lg" href="/contact">
                Start a Conversation <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
