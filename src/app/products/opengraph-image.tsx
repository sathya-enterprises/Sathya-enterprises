import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises — Data creates intelligence.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "03 · Products", title: "Data creates intelligence.", tone: "products" });
}
