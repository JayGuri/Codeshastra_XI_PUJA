/** @type {import('next').NextConfig} */
const nextConfig = {
  // Update from deprecated domains to remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cesium.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Webpack configuration for Cesium
  webpack: (config, { isServer }) => {
    // Add node-loader for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    })

    // Cesium-specific configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
      }
    }

    return config
  },
}

module.exports = nextConfig

