import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/seo";
import { businesses } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/ecosystem", "/money-making-system", "/digital", "/technology", "/products", "/services", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...businesses.map((b) => ({ url: `${base}/${b.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
