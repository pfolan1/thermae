/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' — the AI chat API route requires a server runtime.
  // Deploy to Vercel (or similar) for full Next.js support including API routes.
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
