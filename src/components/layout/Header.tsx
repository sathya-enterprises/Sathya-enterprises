"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Menu } from "lucide-react";
import { divisions } from "@/content/site";
import { ease, dur } from "@/lib/motion";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Content-width bar. Fully transparent at the top of a page so the ocean shows through; once the page
 * scrolls it gains a dark, see-through background (no shadow) so links stay readable over content.
 * Hides while scrolling down and returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (mobileOpen) return;
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <m.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: dur.ui * 1.6, ease: ease.out }}
        className={`on-water fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled ? "bg-sea-abyss/75 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4 text-ivory">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Sathya Enterprises — home">
            <Logo size={44} eager />
            <span className="hidden font-display text-[1.05rem] font-extrabold tracking-[-0.01em] sm:inline">Sathya Enterprises</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {divisions.map((d) => {
              const on = pathname === d.href;
              return (
                <Link
                  key={d.id}
                  href={d.href}
                  aria-current={on ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-[0.92rem] font-semibold transition-opacity duration-200 hover:opacity-100 ${
                    on ? "underline decoration-gold decoration-2 underline-offset-8" : "opacity-80"
                  }`}
                >
                  {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-red px-5 py-2.5 text-[0.9rem] font-bold text-white transition-colors duration-200 hover:bg-red-deep sm:inline-flex"
            >
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.92rem] font-bold lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu aria-hidden className="h-5 w-5" />
              Menu
            </button>
          </div>
        </div>
      </m.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
