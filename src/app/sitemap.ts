import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/digital", "/technology", "/products", "/services", "/contact"];
  return pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 }));
}
