module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://static.etwas.cn/magazine/4.1.0/'
    : '/',
  // chainWebpack: config => {
  //   config.module
  //     .rule('videoRule')
  //     .test(/\.mov$/)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .end()
  // }
}