/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGES_HOST_NAME,
      },
    ],
  },
};

module.exports = nextConfig;
