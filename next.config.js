module.exports = {
    // env: {
    //   NODE_TLS_REJECT_UNAUTHORIZED: '0',
    // },
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      // Perform customizations to webpack config
      // Important: return the modified config
      return config
    },
    webpackDevMiddleware: config => {
      // Perform customizations to webpack dev middleware config
      // Important: return the modified config
      return config
    },

  }
