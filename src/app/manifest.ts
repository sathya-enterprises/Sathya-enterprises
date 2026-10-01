import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sathya Enterprises",
    short_name: "Sathya",
    description: "One Enterprise. Multiple Businesses. One Connected Ecosystem.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#c8102e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
