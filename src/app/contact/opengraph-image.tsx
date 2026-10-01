import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Contact Sathya Enterprises";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "25 — Contact", title: "Let's build what's next.", tone: "default" });
}
