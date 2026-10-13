import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises — More than a business. A vision.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "About · Sathya Enterprises", title: "More than a business. A vision.", tone: "default" });
}
