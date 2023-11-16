const { defineConfig } = require('@vue/cli-service');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://52.78.77.1:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove the /api prefix when forwarding the request
        },
      },
      '/another-api': {
        target: 'http://52.78.77.1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/another-api': '', // Remove the /api prefix when forwarding the request
        },
      },
    },
  },
};


/*
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Disable eslint
  devServer: {
    proxy: {
      '/api': {
        target: 'http://52.78.77.1:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  pluginOptions: {
    vuetify: {
    },
  },
});
*/