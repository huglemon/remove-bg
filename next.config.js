const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 仅在客户端构建时添加 mini-css-extract-plugin
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        })
      );
    }
    return config;
  },
  // 其他 Next.js 配置...
  images: {
    domains: ['rmbg.hellokaton.me'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@imgly/background-removal'],
  },
};

module.exports = nextConfig; 