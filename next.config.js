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

      // 更新 CSS 规则
      const cssRule = config.module.rules.find(rule => rule.test?.test?.('.css'))
      if (cssRule) {
        cssRule.use = [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    }
    return config;
  },
  // 外部包配置 - 从experimental移至根级别
  serverExternalPackages: ['@imgly/background-removal'],
  // 其他 Next.js 配置
  images: {
    domains: ['rmbg.hellokaton.me'],
  },
  experimental: {
    // 新的实验性选项可以放在这里
  },
};

module.exports = nextConfig; 