"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";

const LINKS = ["Ecosystem", "Digital", "Technology", "Products", "Services"];

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Always on screen. Scroll behaviour: transparent over the hero, frosted white once scrolled, and
 * a red → gold line along its bottom edge shows how far down the page you are. On load, the logo,
 * links and button drop in one after another (.nav-in, after the preloader).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <nav className="container-x flex justify-between items-center text-ink">
        {/* Stacked lockup: short and wide enough to sit beside the logo on the narrowest phones. */}
        <a href="/" aria-label="Sathya Enterprises — home" className="nav-in flex min-w-0 items-center gap-2.5">
          <img src="/icon.png" alt="" className="h-9 w-9 shrink-0 rounded-full object-contain md:h-10 md:w-10" />
          <span aria-hidden className="flex flex-col font-display uppercase leading-none">
            <span className="text-[1.3rem] font-extrabold tracking-[-0.02em] md:text-[1.5rem]">Sathya</span>
            <span className="mt-[3px] -mr-[0.3em] text-[0.5rem] font-bold tracking-[0.3em] text-red md:text-[0.58rem]">Enterprises</span>
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-wide">
          {LINKS.map((label, i) => (
            <a key={label} href="#ecosystem" style={step(i + 1)} className="nav-in link-draw transition-[color,background-size] hover:text-red">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          style={step(LINKS.length + 1)}
          className="nav-in shrink-0 bg-red text-white px-4 py-2.5 md:px-7 md:py-3 rounded-full text-sm font-bold shadow-lg hover:bg-red-deep transition-all active:scale-95"
        >
          Contact Us
        </a>
      </nav>

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
