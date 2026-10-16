import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/seo";
import { postHref, posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/digital", "/technology", "/products", "/services", "/blogs", "/contact"];
  const lastModified = new Date();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...posts.map((p) => ({ url: `${base}${postHref(p)}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
