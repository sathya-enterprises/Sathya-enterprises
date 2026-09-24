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

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div ref={progressRef} className="progress-bar" aria-hidden="true" />

      <header className={`header${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="container header__inner">
          {/* Brand Logo & Wordmark */}
          <Link
            className="flex items-center gap-3 text-inherit no-underline group"
            href="/"
            aria-label="Sathya Enterprises — Home"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/40 group-hover:border-amber-500 transition-all duration-300 shadow-sm shrink-0 bg-zinc-950 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Sathya Enterprises Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-lg leading-tight font-display">
                Sathya <span className="text-amber-600">Enterprises</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Digital Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} className="nav-link" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <Link className="btn btn--sm" href="/contact">
              Contact Us
            </Link>
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

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center gap-3 pb-4 mb-2 border-b border-zinc-200">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-500/50 bg-zinc-950 flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Sathya Enterprises Logo"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-extrabold text-base leading-tight font-display">
              Sathya Enterprises
            </p>
            <p className="text-xs font-mono text-amber-600 uppercase">
              Build · Market · Automate
            </p>
          </div>
        </div>

        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            className="mobile-menu__link"
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-6">
          <Link
            className="btn btn--lg w-full text-center justify-center"
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Get In Touch →
          </Link>
        </div>
      </nav>
    </>
  );
}
