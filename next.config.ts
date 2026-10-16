import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for the hero layers, which are zoomed on scroll and show compression artifacts at 75.
    qualities: [75, 90],
  },
  // Products and Services were merged into one Solutions page.
  async redirects() {
    return [
      { source: "/products", destination: "/solutions", permanent: true },
      { source: "/services", destination: "/solutions", permanent: true },
    ];
  },
};

export default nextConfig;
