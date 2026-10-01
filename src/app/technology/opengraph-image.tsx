import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises Technology — SaaS, AI automation, WhatsApp solutions and data";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "02 — Technology", title: "Technology creates systems.", tone: "technology" });
}
