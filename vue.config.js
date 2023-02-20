const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8081', /* 后台服务器地址 */
        hot: true,
        ws: false,
        changeOrigin: true
      }
    }
  }
})
