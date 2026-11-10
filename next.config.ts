import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // เพิ่มโดเมนรูปภาพภายนอกที่นี่ หากเก็บรูปไว้บน CDN
    remotePatterns: [],
  },
  poweredByHeader: false,
};

export default nextConfig;
