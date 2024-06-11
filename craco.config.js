const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new NodePolyfillPlugin({
          additionalAliases: ["process", "punycode"],
        }),
      ],
    },
    configure: {
      resolve: {
        fallback: {
          http: require.resolve("stream-http"),
          zlib: require.resolve("browserify-zlib"),
          https: require.resolve("https-browserify"),
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify"),
          vm: require.resolve("vm-browserify"),
        },
      },
    },
  },
};
