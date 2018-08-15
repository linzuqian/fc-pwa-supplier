const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'app.fccn.cc',
    port: '8080',
    https: false
  },
  chainWebpack: config => {
    config.module.rule('js').exclude.add(path.join(__dirname, '/src/assets/js/nim'))

    if (process.env.NODE_ENV === 'production') {
      config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin)
    }
  }
}
