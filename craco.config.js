module.exports = {
  webpack: {
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
