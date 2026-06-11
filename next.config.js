/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export removed — API routes require server runtime.
  // Netlify uses @netlify/plugin-nextjs (see netlify.toml) to handle SSR + API routes.
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
