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
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "192.168.0.10"],
};

module.exports = nextConfig;
