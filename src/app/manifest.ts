import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sathya Enterprises",
    short_name: "Sathya",
    description: "One Enterprise. Multiple Businesses. One Connected Ecosystem.",
    start_url: "/",
    display: "standalone",
    background_color: "#061b2b",
    theme_color: "#c8102e",
    icons: [{ src: "/logo-512.png", sizes: "512x512", type: "image/png" }],
  };
}
