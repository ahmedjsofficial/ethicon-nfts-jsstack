/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'img.seadn.io', 'ethereum.org', 'thirdweb.com', 'gateway.ipfscdn.io']
  }
}

module.exports = nextConfig
