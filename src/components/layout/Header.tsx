"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <nav className="container-x flex justify-between items-center text-gray-900">
        {/* Stacked lockup: short and wide enough to sit beside the logo on the narrowest phones. */}
        <a href="/" aria-label="Sathya Enterprises — home" className="flex min-w-0 items-center gap-2.5">
          <img src="/icon.png" alt="" className="h-9 w-9 shrink-0 rounded-full object-contain md:h-10 md:w-10" />
          <span aria-hidden className="flex flex-col font-display uppercase leading-none">
            <span className="text-[1.3rem] font-extrabold tracking-[-0.02em] md:text-[1.5rem]">Sathya</span>
            <span className="mt-[3px] -mr-[0.3em] text-[0.5rem] font-bold tracking-[0.3em] text-red md:text-[0.58rem]">Enterprises</span>
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-wide">
          <a href="#ecosystem" className="hover:text-red transition-colors">Ecosystem</a>
          <a href="#ecosystem" className="hover:text-red transition-colors">Digital</a>
          <a href="#ecosystem" className="hover:text-red transition-colors">Technology</a>
          <a href="#ecosystem" className="hover:text-red transition-colors">Products</a>
          <a href="#ecosystem" className="hover:text-red transition-colors">Services</a>
        </div>
        <a href="#contact" className="shrink-0 bg-red text-white px-4 py-2.5 md:px-7 md:py-3 rounded-full text-sm font-bold shadow-lg hover:bg-red-deep transition-all active:scale-95">
          Contact Us
        </a>
      </nav>
    </header>
  );
}
