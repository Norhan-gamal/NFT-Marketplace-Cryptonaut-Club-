/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  images: { 
    domains: [ 
      "alitaher.infura-ipfs.io", 
      "ipfs.io",
      "infura-ipfs.io", 
    ], 
  },
};
module.exports = nextConfig
