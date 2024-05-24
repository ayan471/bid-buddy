/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https://pub-d0cdad033be343e19adaeb54b9748131.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
