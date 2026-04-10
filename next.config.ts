import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    // B2 images are served through our /api/image proxy (same origin), so no
    // external hostname is required. unoptimized is set per <Image> component.
  },
};

export default nextConfig;
