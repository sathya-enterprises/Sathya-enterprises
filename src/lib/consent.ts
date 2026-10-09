/**
 * Cookie consent, stored in a first-party cookie so the server can read it too (e.g. to decide
 * whether to render an analytics script). Necessary cookies are always on; the rest are opt-in.
 *
 * Gate any non-essential script on `readConsent()?.analytics` / `.marketing`, and listen for
 * CONSENT_EVENT to react when the visitor changes their mind.
 */

export const CONSENT_COOKIE = "se_consent";
/** Bump when the categories change, so everyone is asked again. */
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export type Consent = { analytics: boolean; marketing: boolean };

/** Fired on window after a choice is saved; detail is the new Consent. */
export const CONSENT_EVENT = "se:consent";
/** Dispatch on window to reopen the banner's preferences (e.g. from a footer link). */
export const OPEN_CONSENT_EVENT = "se:consent-open";

export function parseConsent(raw: string | undefined | null): Consent | null {
  if (!raw) return null;
  const [v, a, m] = decodeURIComponent(raw).split(".");
  if (Number(v) !== VERSION) return null;
  return { analytics: a === "1", marketing: m === "1" };
}

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return parseConsent(match?.[1]);
}

export function writeConsent(consent: Consent) {
  const value = `${VERSION}.${consent.analytics ? 1 : 0}.${consent.marketing ? 1 : 0}`;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
