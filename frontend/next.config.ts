import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/services/custom-software-digital-solutions",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/custom-software-digital-solutions/:path*",
        destination: "/services/custom-software-development/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
