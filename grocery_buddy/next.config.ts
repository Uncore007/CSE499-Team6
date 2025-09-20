import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: './grocery_buddy'
    }
  }
};

export default nextConfig;
