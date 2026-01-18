import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["rmbg.hellokaton.me"],
  },
  serverExternalPackages: ["@imgly/background-removal"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      );

      const cssRule = (config.module?.rules || []).find(
        (rule: unknown) =>
          typeof rule === "object" &&
          rule !== null &&
          "test" in rule &&
          rule.test instanceof RegExp &&
          rule.test.test(".css"),
      ) as { use?: unknown } | undefined;

      if (cssRule && Array.isArray(cssRule.use)) {
        cssRule.use = [
          (MiniCssExtractPlugin as unknown as { loader: string }).loader,
          "css-loader",
          "postcss-loader",
        ];
      }
    }

    return config;
  },
};

export default nextConfig;
