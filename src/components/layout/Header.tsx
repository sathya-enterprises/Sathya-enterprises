"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/ecosystem#products", label: "Products" },
  { href: "/ecosystem#services", label: "Services" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);

  // Scroll progress + scrolled state
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrolled(scrollTop > 20);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate gold top bar on mount
  useEffect(() => {
    if (goldBarRef.current) {
      goldBarRef.current.style.transform = "scaleX(0)";
      goldBarRef.current.style.transition = "none";
      // Kick off CSS animation after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (goldBarRef.current) {
            goldBarRef.current.style.transition =
              "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
            goldBarRef.current.style.transform = "scaleX(1)";
          }
        });
      });
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll-driven progress bar — sits above everything */}
      <div ref={progressRef} className="progress-bar" aria-hidden="true" />

      {/* Gold top accent bar — Google Labs-style colored bar */}
      <div
        ref={goldBarRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--color-gold)",
          zIndex: 199,
          transformOrigin: "left",
          transform: "scaleX(0)",
          pointerEvents: "none",
        }}
      />

      <header className={`header${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="container header__inner">

          {/* ── Brand Wordmark ── */}
          <Link
            className="flex items-center gap-3 text-inherit no-underline group"
            href="/"
            aria-label="Sathya Enterprises — Home"
            style={{ textDecoration: "none" }}
          >
            {/* Logo image — 32×32, no border, subtle shadow */}
            <div
              style={{
                position: "relative",
                width: 32,
                height: 32,
                flexShrink: 0,
                filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.18))",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Sathya Enterprises Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>

            {/* Text wordmark */}
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                  lineHeight: 1.1,
                }}
              >
                Sathya{" "}
                <span style={{ color: "var(--color-gold)" }}>Enterprises</span>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#71717a", /* zinc-500 */
                  lineHeight: 1.4,
                  marginTop: "1px",
                }}
              >
                Digital Ecosystem
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="nav-desktop" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link nav-link--underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right-side Actions ── */}
          <div className="header__actions">
            {/* Minimal pill "Contact" — border-only, ink color */}
            <Link
              href="/contact"
              className="btn btn--sm btn--secondary"
              style={{
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.02em",
                textTransform: "none",
                padding: "0.45em 1.1em",
              }}
            >
              Contact
            </Link>

            {/* Burger — mobile only */}
            <button
              className={`burger${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            paddingBottom: "1.25rem",
            marginBottom: "0.5rem",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 36,
              height: 36,
              flexShrink: 0,
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.15))",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Sathya Enterprises Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "var(--color-ink)",
              }}
            >
              Sathya Enterprises
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginTop: "2px",
              }}
            >
              Build · Market · Automate
            </p>
          </div>
        </div>

        {/* Nav links — large display font with gold left border on hover */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              onClick={() => setMenuOpen(false)}
              style={{
                borderLeft: "3px solid transparent",
                paddingLeft: "0.75rem",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor =
                  "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor =
                  "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — full width at bottom */}
        <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
          <Link
            href="/contact"
            className="btn btn--lg"
            onClick={() => setMenuOpen(false)}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Get In Touch →
          </Link>
        </div>
      </nav>

      {/* Nav-link hover underline style — injected via style tag to avoid new CSS file */}
      <style>{`
        .nav-link--underline {
          position: relative;
        }
        .nav-link--underline::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0.75rem;
          right: 0.75rem;
          height: 2px;
          background: var(--color-gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 1px;
        }
        .nav-link--underline:hover::after {
          transform: scaleX(1);
        }
        .nav-link--underline:hover {
          color: var(--color-ink) !important;
        }
      `}</style>
    </>
  );
}
