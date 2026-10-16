"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

/** Pages only — no links into sections of a page. Home is the logo. */
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Digital", href: "/digital" },
  { label: "Technology", href: "/technology" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Always on screen. Scroll behaviour: transparent over the hero, frosted white once scrolled, and
 * a red → gold line along its bottom edge shows how far down the page you are. On load, the logo,
 * links and button drop in one after another (.nav-in, after the preloader).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 50);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`site-header fixed top-0 left-0 w-full z-[100] ${
        scrolled ? "bg-white/95 shadow-sm py-3" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <nav className="container-x flex justify-between items-center text-ink">
        {/* Stacked lockup: short and wide enough to sit beside the logo on the narrowest phones. */}
        <Link href="/" aria-label="Sathya Enterprises — home" className="nav-in flex min-w-0 items-center gap-2.5">
          <img src="/brand-mark.webp" alt="" className="h-9 w-9 shrink-0 rounded-full object-contain md:h-10 md:w-10" />
          <span aria-hidden className="flex flex-col font-display uppercase leading-none">
            <span className="text-[1.3rem] font-extrabold tracking-[-0.02em] md:text-[1.5rem]">Sathya</span>
            <span className="mt-[3px] -mr-[0.3em] text-[0.5rem] font-bold tracking-[0.3em] text-red md:text-[0.58rem]">Enterprises</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-wide">
          {LINKS.map(({ label, href }, i) => {
            const current = href === pathname;
            return (
              <Link
                key={label}
                href={href}
                aria-current={current ? "page" : undefined}
                style={step(i + 1)}
                className={`nav-in link-draw transition-[color,background-size] hover:text-red ${current ? "text-red" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            style={step(LINKS.length + 1)}
            className="nav-in shrink-0 bg-red text-white px-4 py-2.5 md:px-7 md:py-3 rounded-full text-sm font-bold shadow-lg hover:bg-red-deep transition-all active:scale-95"
          >
            Contact Us
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            style={step(LINKS.length + 2)}
            className="nav-in grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/80 text-ink lg:hidden"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      {/* Reading progress */}
      <m.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-red to-gold transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
