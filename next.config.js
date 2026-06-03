/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
