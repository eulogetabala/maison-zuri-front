import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Autorise tous les domaines (Firebase Storage, unspash, etc)
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};


export default nextConfig;
