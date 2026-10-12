"use client";

import { useRef } from "react";
import { useArrival } from "@/lib/useArrival";
import { CookieSettingsButton } from "@/components/layout/CookieConsent";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * On arrival the red top edge draws across, then the brand column, the three link columns and the
 * bottom bar lift in one after another (useArrival + .rise; replays on return).
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  // The footer is short and ends the page, so it counts as arrived once a little of it is in view.
  const arrived = useArrival(ref, "0px 0px -10% 0px");

  return (
    <footer ref={ref} data-arrived={arrived} className="bg-gold-light text-ink py-16 md:py-24 relative overflow-hidden">
      <div aria-hidden className="rise-line absolute inset-x-0 top-0 h-2 bg-red" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/30 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container-x relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-16">
          <div className="rise col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="" className="w-12 h-12 shrink-0 object-contain bg-white rounded-lg p-1" />
              <p className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
                Sathya <span className="text-red">Enterprises</span>
              </p>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs font-medium">
              Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services.
            </p>
          </div>
          <div className="rise" style={step(1)}>
            <h3 className="font-bold mb-6 text-ink uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span> Digital
            </h3>
            <ul className="space-y-4 text-sm text-ink-soft font-medium">
              <li><a href="#" className="hover:text-red transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-red transition-colors">SEO & SEM</a></li>
              <li><a href="#" className="hover:text-red transition-colors">Web Development</a></li>
            </ul>
          </div>
          <div className="rise" style={step(2)}>
            <h3 className="font-bold mb-6 text-ink uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Technology
            </h3>
            <ul className="space-y-4 text-sm text-ink-soft font-medium">
              <li><a href="#" className="hover:text-red transition-colors">SaaS Products</a></li>
              <li><a href="#" className="hover:text-red transition-colors">AI Automation</a></li>
              <li><a href="#" className="hover:text-red transition-colors">WhatsApp Solutions</a></li>
            </ul>
          </div>
          <div className="rise col-span-2 md:col-span-1" style={step(3)}>
            <h3 className="font-bold mb-6 text-ink uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-deep rounded-full"></span> Contact
            </h3>
            <ul className="space-y-4 text-sm text-ink-soft font-medium">
              <li>Bengaluru, Karnataka</li>
              <li>hello@sathyaenterprises.com</li>
              <li>+91 00000 00000</li>
            </ul>
          </div>
        </div>
        <div style={step(4)} className="rise pt-8 border-t border-ink/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-ink-soft text-sm font-medium">© {new Date().getFullYear()} Sathya Enterprises. All rights reserved.</p>
          <div className="flex gap-6 text-ink-soft text-sm font-medium">
            <a href="#" className="hover:text-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red transition-colors">Terms of Service</a>
            <CookieSettingsButton className="hover:text-red transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
