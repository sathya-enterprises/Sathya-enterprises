import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "The Sathya Enterprises business ecosystem";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "03 — Ecosystem", title: "One enterprise. Many possibilities.", tone: "default" });
}
