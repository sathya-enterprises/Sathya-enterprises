"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CoreMark } from "@/components/brand/CoreMark";
import { businessesIn, divisions } from "@/content/site";
import { ease, dur } from "@/lib/motion";
import { MobileMenu } from "./MobileMenu";

type Panel = "explore" | "company" | null;

const company = [
  { href: "/about", label: "About", note: "The story, vision and values" },
  { href: "/ecosystem", label: "Ecosystem", note: "Every division, mapped" },
  { href: "/money-making-system", label: "Money-Making System", note: "Attract → Grow" },
  { href: "/contact", label: "Contact", note: "Let's build what's next" },
];

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up (only once past the hero).
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (panel || mobileOpen) return;
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Close everything on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel(null);
    setMobileOpen(false);
  }

  const open = useCallback((p: Panel) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(p);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 140);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [panel]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        ref={headerRef}
        style={{ viewTransitionName: "site-header" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
        onMouseLeave={scheduleClose}
      >
        <m.div
          animate={{ y: hidden ? "-130%" : "0%" }}
          transition={{ duration: dur.ui * 1.6, ease: ease.out }}
          className="container-wide pointer-events-auto"
        >
          <div
            className={`relative flex h-14 items-center justify-between gap-4 rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5 ${
              scrolled || panel
                ? "border-line bg-ivory/92 shadow-2 backdrop-blur-md"
                : "border-line bg-ivory/95 backdrop-blur-sm"
            }`}
          >
            <Link href="/" className="shrink-0 rounded-full">
              <Wordmark />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {(
                [
                  ["explore", "Explore"],
                  ["company", "Company"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-expanded={panel === id}
                  aria-controls={`nav-${id}`}
                  onClick={() => (panel === id ? setPanel(null) : open(id))}
                  onMouseEnter={(e) => {
                    if (window.matchMedia("(hover: hover)").matches) open(id);
                    e.currentTarget.blur();
                  }}
                  className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors duration-200 ${
                    panel === id ? "bg-charcoal text-ivory" : "hover:bg-charcoal/5"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                      panel === id ? "bg-gold" : "bg-red"
                    }`}
                  />
                </button>
              ))}
              <span className="mx-2 h-5 w-px bg-line" aria-hidden />
              {divisions.map((d) => (
                <Link
                  key={d.id}
                  href={d.href}
                  onMouseEnter={scheduleClose}
                  className={`rounded-full px-3 py-2 font-mono text-[0.7rem] font-bold tracking-[0.14em] transition-colors duration-200 hover:text-red ${
                    isActive(d.href) ? "text-red" : "text-charcoal-soft"
                  }`}
                >
                  {d.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[0.9rem] font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-gold hover:text-charcoal sm:inline-flex"
              >
                Start a Conversation
              </Link>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-4 text-[0.88rem] font-bold text-ivory lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
              >
                <CoreMark size={16} />
                Menu
              </button>
            </div>
          </div>

          <AnimatePresence>
            {panel && (
              <m.div
                key="panel"
                id={`nav-${panel}`}
                onMouseEnter={() => open(panel)}
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.16 } }}
                transition={{ duration: dur.ui, ease: ease.out }}
                className="absolute inset-x-(--gutter) top-[calc(100%+10px)] hidden origin-top overflow-hidden rounded-lg border border-line bg-ivory shadow-3 lg:block"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {panel === "explore" ? (
                    <m.div
                      key="explore"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, ease: ease.out }}
                      className="grid grid-cols-4"
                    >
                      {divisions.map((d, i) => (
                        <div
                          key={d.id}
                          data-tone={d.id}
                          className={`tone group/col flex flex-col p-6 ${i > 0 ? "border-l border-line" : ""}`}
                        >
                          <Link href={d.href} className="block rounded-md">
                            <span className="t-eyebrow text-(--tone-accent)">{d.index}</span>
                            <span className="mt-3 flex items-center justify-between font-display text-[1.6rem] font-extrabold tracking-[-0.02em]">
                              {d.name}
                              <ArrowUpRight
                                aria-hidden
                                className="h-5 w-5 transition-transform duration-200 group-hover/col:translate-x-0.5 group-hover/col:-translate-y-0.5"
                              />
                            </span>
                            <span className="mt-1 block text-sm text-(--tone-soft)">{d.role}</span>
                          </Link>
                          <ul className="mt-5 space-y-1.5 border-t border-(--tone-line) pt-4">
                            {businessesIn(d.id).map((b) => (
                              <li key={b.slug}>
                                <Link
                                  href={`/${b.slug}`}
                                  className="link-draw text-[0.9rem] text-(--tone-soft) hover:text-(--tone-ink)"
                                >
                                  {b.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </m.div>
                  ) : (
                    <m.div
                      key="company"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, ease: ease.out }}
                      className="grid grid-cols-[1.1fr_2fr]"
                    >
                      <div className="flex flex-col justify-between bg-gold-light p-8">
                        <p className="t-eyebrow text-red-deep">Company</p>
                        <p className="font-display text-[1.7rem] font-extrabold leading-[1.02] tracking-[-0.02em]">
                          One Enterprise.
                          <br />
                          Multiple Businesses.
                          <br />
                          <span className="text-red">One Connected Ecosystem.</span>
                        </p>
                      </div>
                      <ul className="grid grid-cols-2">
                        {company.map((c, i) => (
                          <li key={c.href} className={`${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t" : ""} border-line`}>
                            <Link
                              href={c.href}
                              className="group/c flex h-full flex-col justify-between gap-6 p-7 transition-colors duration-200 hover:bg-red-tint/50"
                            >
                              <span className="flex items-center justify-between font-display text-[1.35rem] font-extrabold tracking-[-0.015em]">
                                {c.label}
                                <ArrowUpRight
                                  aria-hidden
                                  className="h-5 w-5 text-red transition-transform duration-200 group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5"
                                />
                              </span>
                              <span className="text-sm text-charcoal-soft">{c.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} company={company} />
    </>
  );
}
