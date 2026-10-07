/** @type {import('next').NextConfig} */

const API_TARGET = process.env.API_TARGET_URL || 'http://localhost:5000';

const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/ws/:path*',
          destination: `${API_TARGET}/ws/:path*`,
        },
      ],
      afterFiles: [
        {
          source: '/api/:path*',
          destination: `${API_TARGET}/api/:path*`,
        },
      ],
      fallback: [],
    };
  },
  sassOptions: {
    includePaths: ['./public/assets', './node_modules'],
  },
};

export default nextConfig;
