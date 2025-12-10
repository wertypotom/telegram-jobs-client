import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Proxy /api/backend/* to external API server
        source: '/api/backend/:path*',
        destination: 'https://api.jobsniper.work/api/:path*',
      },
    ];
  },
};

export default nextConfig;
