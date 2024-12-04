import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yr4doregd9jnzr5a.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
