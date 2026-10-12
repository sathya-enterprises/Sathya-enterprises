/**
 * The site's optional tags, run only with the visitor's consent (see consent.ts):
 *   analytics → Google Analytics 4, when NEXT_PUBLIC_GA_ID is set (e.g. "G-XXXXXXX")
 *   marketing → Meta Pixel, when NEXT_PUBLIC_META_PIXEL_ID is set
 * Without an ID that tag doesn't exist at all. Nothing is fetched or set before consent. Granting
 * loads the tag straight away; withdrawing tells it to stop and deletes the cookies it set.
 *
 * Google's Consent Mode v2 is set to "denied" before gtag can do anything, then updated to the
 * visitor's choice, so Google products respect it too.
 */

import type { Consent } from "./consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { callMethod?: Gtag; queue: unknown[]; push: unknown; loaded: boolean; version: string };
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Cookies each tag sets, removed when its consent is withdrawn. */
const GA_COOKIES = /^(_ga|_ga_.+|_gid|_gat.*|_gcl_.+)$/;
const PIXEL_COOKIES = /^(_fbp|_fbc)$/;

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Expire matching cookies on this host and its parent domains (tags often set them on the root). */
function deleteCookies(pattern: RegExp) {
  const parts = location.hostname.split(".");
  const domains = ["", ...parts.slice(0, -1).map((_, i) => "." + parts.slice(i).join("."))];
  for (const entry of document.cookie.split("; ")) {
    const name = entry.split("=")[0];
    if (!pattern.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

function applyGoogle(consent: Consent) {
  if (!GA_ID) return;
  const state = {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  };
  if (window.gtag) {
    window.gtag("consent", "update", state);
  } else if (consent.analytics) {
    // First grant: set up gtag with everything denied, then apply the choice, then load it.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js reads the arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("consent", "update", state);
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
  }
  if (!consent.analytics) deleteCookies(GA_COOKIES);
}

function applyPixel(consent: Consent) {
  if (!PIXEL_ID) return;
  if (window.fbq) {
    window.fbq("consent", consent.marketing ? "grant" : "revoke");
  } else if (consent.marketing) {
    // Meta's standard base code, without the inline <script> wrapper.
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = window._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("consent", "grant");
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }
  if (!consent.marketing) deleteCookies(PIXEL_COOKIES);
}

/** Bring the tags in line with a consent choice. Safe to call repeatedly. */
export function applyConsent(consent: Consent) {
  applyGoogle(consent);
  applyPixel(consent);
}
