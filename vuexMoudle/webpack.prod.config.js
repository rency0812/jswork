/* eslint-disable no-undef,camelcase,indent,no-unused-vars,linebreak-style */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

fs.open('./src/libs/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";'
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
    })
})

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        publicPath: '/assets/',
        filename: 'scripts/[name].[hash].js',
        chunkFilename: 'chunk/[name].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['assets/chunk/', 'assets/scripts/']),
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './src/template/index.ejs',
            inject: false
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
        ],
        // 采用splitChunks提取出entry chunk的chunk Group
        splitChunks: {
            chunks: 'async',
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20,
                    reuseExistingChunk: true
                },
                main: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
        // 为每个入口提取出webpack runtime模块
        runtimeChunk: {
            name: 'runtime'
        }
    }
})