const { defineConfig } = require('@vue/cli-service');

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    vuetify: {
      // Vuetify options
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  // 개발 서버 설정
  devServer: {
      // 프록시 설정
      proxy: {
          // 프록시 요청을 보낼 api의 시작 부분
          '/api': {
              // 프록시 요청을 보낼 서버의 주소
              target: 'http://52.78.77.1:8000',
              pathRewrite: { '^/api': '' }, // 이 부분을 추가하여 경로에서 '/api'를 제거
          }
      }
  }
};