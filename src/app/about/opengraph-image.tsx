import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "About Sathya Enterprises";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "02 — About", title: "More than a business. A vision.", tone: "default" });
}
