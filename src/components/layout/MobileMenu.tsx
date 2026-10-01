"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { brand, businessesIn, contact, divisions, type DivisionId } from "@/content/site";
import { ease } from "@/lib/motion";

/**
 * Touch-first menu. Divisions are large rows that expand in place to reveal their businesses —
 * the same "explore the ecosystem" model as desktop, adapted for thumbs.
 */
export function MobileMenu({
  open,
  onClose,
  company,
}: {
  open: boolean;
  onClose: () => void;
  company: { href: string; label: string }[];
}) {
  const [expanded, setExpanded] = useState<DivisionId | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.6rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)", transition: { duration: 0.4, ease: ease.inOut } }}
          transition={{ duration: 0.6, ease: ease.inOut }}
        >
          <div className="container-x flex h-[76px] shrink-0 items-center justify-between pt-3">
            <Link href="/" onClick={onClose}>
              <Wordmark />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-4 text-[0.88rem] font-bold text-ivory"
            >
              <X className="h-4 w-4" aria-hidden />
              Close
            </button>
          </div>

          <m.nav
            aria-label="Mobile"
            className="container-x flex-1 pt-6"
            initial="hidden"
            animate="shown"
            transition={{ staggerChildren: 0.05, delayChildren: 0.18 }}
          >
            <p className="t-eyebrow pb-3 text-red-deep">Explore</p>
            <ul className="border-t border-line">
              {divisions.map((d) => {
                const isOpen = expanded === d.id;
                return (
                  <m.li
                    key={d.id}
                    variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    className="border-b border-line"
                  >
                    <div className="flex items-center">
                      <Link href={d.href} onClick={onClose} className="flex flex-1 items-baseline gap-3 py-4">
                        <span className="font-mono text-[0.7rem] font-bold text-red">{d.index}</span>
                        <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em]">
                          {d.name}
                        </span>
                      </Link>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${d.name.toLowerCase()} businesses`}
                        onClick={() => setExpanded(isOpen ? null : d.id)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-line"
                      >
                        <Plus
                          aria-hidden
                          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45 text-red" : ""}`}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: ease.inOut }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-wrap gap-2 pb-5 pl-8">
                            {businessesIn(d.id).map((b) => (
                              <li key={b.slug}>
                                <Link
                                  href={`/${b.slug}`}
                                  onClick={onClose}
                                  className="inline-flex rounded-full border border-line bg-white/60 px-3.5 py-2 text-sm font-semibold"
                                >
                                  {b.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.li>
                );
              })}
            </ul>

            <m.div
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <p className="t-eyebrow pb-3 pt-10 text-red-deep">Company</p>
              <ul className="grid grid-cols-2 gap-2">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-md bg-gold-light px-4 py-4 font-bold"
                    >
                      {c.label}
                      <ArrowUpRight aria-hidden className="h-4 w-4 text-red" />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          </m.nav>

          <div className="container-x mt-10 shrink-0 pb-8">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between rounded-full bg-red px-6 py-4 font-bold text-white"
            >
              Start a Conversation
              <ArrowUpRight aria-hidden className="h-5 w-5" />
            </Link>
            <div className="mt-6 flex flex-wrap justify-between gap-2 text-sm text-charcoal-soft">
              <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
              <span className="font-mono text-[0.7rem] font-bold tracking-[0.12em] text-red-deep">{brand.tagline}</span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
