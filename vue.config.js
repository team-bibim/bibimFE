const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Disable eslint
  devServer: {
    //proxy: 'http://52.78.77.1:8000'
    proxy: {
      '/api': {
        target: 'http://52.78.77.1:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove the /api prefix when forwarding the request
        },
      },
    },
  },
  pluginOptions: {
    vuetify: {
      // Vuetify options
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});