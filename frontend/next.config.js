/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cesium.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    })

    return config
  },
}

module.exports = nextConfig
