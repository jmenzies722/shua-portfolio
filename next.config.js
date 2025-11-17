/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Optimize production builds
  swcMinify: true,
  // Reduce bundle size
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

