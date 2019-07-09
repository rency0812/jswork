/* eslint-disable no-undef,no-unused-vars,indent,linebreak-style */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')

fs.open('./src/libs/env1.js', 'w', function (err, fd) {
    const buf = 'export default "development";'
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
    })
})

module.exports = merge(webpackBaseConfig, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    output: {
        publicPath: '/assets/',
        filename: 'scripts/[name].js',
        chunkFilename: 'chunk/[name].chunk.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: {colors: true},
        //跨域代理，所以axios的baseurl不要使用带http的绝对路径，直接使用'/api/‘即可
        proxy: {
            '/jt808web/*': {
                target: 'http://180.101.255.219:38009',//http://180.101.255.219:38009/
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    '^/jt808web': '/jt808web'
                }
            },
            '/bs': {
                target: 'http://192.168.1.88:35004',
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    '^/bs': ''
                }
            },
            '/ch': {
                target: 'http://192.168.1.199:35004',
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    '^/ch': ''
                }
            },
            '/test': {
                target: 'http://192.168.1.244:35004',
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    '^/test': ''
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: true
        }),


        new webpack.optimize.OccurrenceOrderPlugin()
    ]


})