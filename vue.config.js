const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/exercise': {
        target: 'http://15.164.228.112:8080',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
  lintOnSave: false, // eslint 끄기
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
