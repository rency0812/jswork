/* eslint-disable no-undef,camelcase,indent,no-unused-vars,linebreak-style */
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        vue: ['vue', 'vue-router', 'vuex', 'iview', 'echarts-gl', 'echarts']
    },
    output: {
        path: path.join(__dirname, '/assets'),
        filename: '[name].dll.js', //生成vue.dll.js
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            // manifest.json 描述动态链接库包含了哪些内容
            path: path.join(__dirname, 'assets', '[name].manifest.json')
        })
    ],
    optimization: {
        namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
        namedChunks: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    },
                    cache: false,
                    parallel: true,
                    sourcMap: true,
                    warnings: false,
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    toplevel: false,
                    ie8: true
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}