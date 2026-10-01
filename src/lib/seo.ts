import type { Metadata } from "next";
import { brand, contact, type Business } from "@/content/site";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sathyaenterprises-nine.vercel.app").replace(/\/$/, "");
export const siteName = "Sathya Enterprises";

/**
 * One place that shapes every page's metadata: canonical URL, Open Graph and Twitter cards.
 * Titles stay short (the layout template appends " — Sathya Enterprises").
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const full = absoluteTitle ? title : `${title} — ${siteName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_IN",
      url: path,
      title: full,
      description,
    },
    twitter: { card: "summary_large_image", title: full, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** "Digital Growth. Built Around Results." — published headlines are all caps; metadata reads better in title case. */
export function titleCase(s: string) {
  return s.toLowerCase().replace(/(^|[\s.—-])([a-z])/g, (_, p, c) => p + c.toUpperCase());
}

export function businessDescription(b: Business) {
  const offers = b.groups.flatMap((g) => g.items.map((i) => i.label)).slice(0, 5);
  return `${b.intro}${offers.length ? ` ${offers.join(", ")}.` : ""} Sathya Enterprises, ${contact.location}.`.slice(0, 300);
}

/* ── JSON-LD ──────────────────────────────────────────────────────────── */

const orgId = `${siteUrl}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        slogan: brand.tagline,
        description: brand.summary,
        email: contact.email.value,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: brand.positioning,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${siteUrl}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

export function serviceLd(b: Business, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: b.name,
    serviceType: b.name,
    category,
    description: b.intro,
    url: `${siteUrl}/${b.slug}`,
    provider: { "@id": orgId, "@type": "Organization", name: siteName },
    hasOfferCatalog: b.groups.length
      ? {
          "@type": "OfferCatalog",
          name: b.name,
          itemListElement: b.groups.flatMap((g) =>
            g.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.label } })),
          ),
        }
      : undefined,
  };
}

export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${siteUrl}${it.path}`,
    })),
  };
}
