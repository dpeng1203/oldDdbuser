// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/' : './',
    outputDir: 'htdocs',
    assetsDir: 'ddbxryuser',
    lintOnSave: false,
    devServer: {
        port: 8082, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://test.2qzs.com/mg'
        proxy: {
            '/api': {
                // target: 'http://localhost',
                target: 'http://xry.dodohz.com/',
                // target: 'http://60.186.28.1:10001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                  }
            },
            '/foo': {
                target: '<other_url>'
            }
        },  // 配置多个代理
    },
    // configureWebpack: { // webpack 配置    
    //     output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】      
    //         filename: `js/[name].01.js`,      
    //         chunkFilename: `js/[name].01.js`    
    //     }
    // },
    chainWebpack: (config) => {
        // config.resolve.alias.set('@', resolve('src'))
        // .set('@assets', resolve('src/assets'))
        // .set('@utils', resolve('src/utils'))
        // .set('@api', resolve('src/api'))
        // .set('@c', resolve('src/components'))
        config.plugins.delete('prefetch')
        // config.optimization.delete('splitChunks')
    },
    
    productionSourceMap: false,
    filenameHashing: false
}