import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises Products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "03 — Products", title: "SaaS, data, marketplace and physical products.", tone: "products" });
}
