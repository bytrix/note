// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://blog-api-2g8nea5tcfdeadd4-1304508799.ap-shanghai.app.tcloudbase.com/express-starter/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         new BundleAnalyzerPlugin()
    //     ]
    // }
}