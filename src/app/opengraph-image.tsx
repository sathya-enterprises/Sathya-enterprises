import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises — One Enterprise. Multiple Businesses. One Connected Ecosystem.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "One Enterprise · Multiple Businesses", title: "One Connected Ecosystem.", tone: "default" });
}
