import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises Digital — marketing, websites, SEO, SEM, social media and lead generation";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "01 — Digital", title: "Digital creates attention.", tone: "digital" });
}
