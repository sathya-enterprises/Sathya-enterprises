import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/digital", "/technology", "/products", "/services", "/contact"];
  const lastModified = new Date();
  return pages.map((p) => ({ url: `${base}${p}`, lastModified, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 }));
}
