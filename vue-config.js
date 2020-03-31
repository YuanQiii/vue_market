const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.export = {
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  // chainWebpack: (config)=>{
  //   config.resolve.alias
  //     .set('@$', resolve('src'))
  //     .set('assets',resolve('src/assets'))
  //     .set('components',resolve('src/components'))
  //     .set('layout',resolve('src/layout'))
  //     .set('base',resolve('src/base'))
  //     .set('static',resolve('src/static'))
  // }
}

