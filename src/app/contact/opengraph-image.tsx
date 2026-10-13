import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises — Let's build what's next.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Contact · Sathya Enterprises", title: "Let's build what's next.", tone: "default" });
}
