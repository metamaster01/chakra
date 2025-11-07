import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "qpghcimdivxmyxpqxnxv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  /* other config options here */

  eslint: {
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
