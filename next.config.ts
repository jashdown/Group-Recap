import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'images.ctfassets.net',
      }
    ]
  },
};

export default nextConfig;
