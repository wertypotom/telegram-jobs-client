import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Client calls: /api/channels/...
        // Destination: https://api.jobsniper.work/api/channels/...
        source: '/api/:path*',
        destination: 'https://api.jobsniper.work/api/:path*',
      },
    ];
  },
};

export default nextConfig;
