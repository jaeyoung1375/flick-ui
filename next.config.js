const nextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://152-67-196-0.sslip.io/api/v1/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
    ],
  },
};

module.exports = nextConfig;
