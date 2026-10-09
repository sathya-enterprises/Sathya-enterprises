"use client";

import { useEffect, useId, useState } from "react";
import { Cookie } from "lucide-react";
import { OPEN_CONSENT_EVENT, openConsentSettings, readConsent, writeConsent, type Consent } from "@/lib/consent";

const CATEGORIES: { id: keyof Consent | "necessary"; title: string; body: string }[] = [
  { id: "necessary", title: "Necessary", body: "Keep the site working and remember this choice. Always on." },
  { id: "analytics", title: "Analytics", body: "Help us understand which pages are useful, so we can improve them." },
  { id: "marketing", title: "Marketing", body: "Let us measure campaigns and show you more relevant offers." },
];

/**
 * Cookie banner. Shows once (after the preloader) until the visitor chooses; "Cookie settings" in
 * the footer reopens it with their current choice. Accept and Reject carry equal weight.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [choice, setChoice] = useState<Consent>({ analytics: false, marketing: false });
  const titleId = useId();

  useEffect(() => {
    // Wait for the opening curtain to lift before asking.
    const timer = window.setTimeout(() => {
      if (!readConsent()) setOpen(true);
    }, 2600);
    const reopen = () => {
      setChoice(readConsent() ?? { analytics: false, marketing: false });
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  const save = (consent: Consent) => {
    writeConsent(consent);
    setOpen(false);
    setCustom(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="cookie-in fixed inset-x-3 bottom-3 z-[150] mx-auto max-w-xl rounded-[22px] bg-white p-5 text-ink shadow-[0_18px_60px_-12px_rgb(26_26_26/0.35)] ring-1 ring-line sm:inset-x-auto sm:left-5 sm:bottom-5 md:p-6"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light text-red">
          <Cookie className="h-5 w-5" />
        </span>
        <div>
          <h2 id={titleId} className="font-display text-lg font-bold leading-tight">
            We use cookies
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            Necessary cookies keep this site running. With your permission we also use analytics and marketing cookies.
          </p>
        </div>
      </div>

      {custom && (
        <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
          {CATEGORIES.map((c) => {
            const locked = c.id === "necessary";
            const checked = locked || choice[c.id as keyof Consent];
            return (
              <li key={c.id}>
                <label className={`flex items-start gap-3 p-3.5 ${locked ? "" : "cursor-pointer"}`}>
                  <span className="flex-1">
                    <span className="block text-sm font-bold">{c.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{c.body}</span>
                  </span>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={locked}
                    onChange={(e) => setChoice((prev) => ({ ...prev, [c.id]: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red ${
                      checked ? "bg-red" : "bg-charcoal/20"
                    } ${locked ? "opacity-50" : ""}`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        checked ? "translate-x-[22px]" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
        {custom ? (
          <button
            type="button"
            onClick={() => save(choice)}
            className="rounded-full border-2 border-charcoal/15 px-5 py-2.5 text-sm font-bold transition-colors hover:border-charcoal/40 sm:mr-auto"
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustom(true)}
            className="rounded-full px-2 py-2.5 text-sm font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline sm:mr-auto"
          >
            Customise
          </button>
        )}
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-bold text-ivory transition-colors hover:bg-charcoal-soft"
        >
          Reject all
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: true, marketing: true })}
          className="rounded-full bg-red px-5 py-2.5 text-sm font-bold text-ivory transition-colors hover:bg-red-deep"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}

/** Reopens the banner's preferences — for the footer. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie Settings
    </button>
  );
}
