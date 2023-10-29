/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

const NEXT_PUBLIC_REMOTE_NOTIFY_MODULE =
  process.env.NEXT_PUBLIC_REMOTE_NOTIFY_MODULE;

module.exports = {
  webpack(config, options) {
    Object.assign(config.experiments, { topLevelAwait: true });

    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "consumer",
          remotes: {
            notify: NEXT_PUBLIC_REMOTE_NOTIFY_MODULE,
          },
          filename: "static/chunks/remoteEntry.js",
          shared: {},
        })
      );
    }

    return config;
  },
};
