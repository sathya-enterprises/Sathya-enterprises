import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for the hero layers, which are zoomed on scroll and show compression artifacts at 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
