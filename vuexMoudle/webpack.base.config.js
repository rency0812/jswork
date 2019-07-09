/* eslint-disable indent,no-undef,no-unused-vars,quotes,camelcase,linebreak-style */
const os = require("os")
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const manifest = require('./assets/vue.manifest.json')

module.exports = {
    entry: {
        common: ["babel-polyfill", './src/config/common.js'],
        main: './src/config/main.js'
    },
    output: {
        publicPath: '/assets/',
        path: path.join(__dirname, '/assets')
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new VueLoaderPlugin(),
        new ParallelUglifyPlugin({
            workerCount: 4,
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 保留注释
                },
                compress: { // 压缩
                    warnings: false, // 删除无用代码时不输出警告
                    drop_console: false, // 删除console语句
                    collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new webpack.DllReferencePlugin({
            manifest
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new HappyPack({ // 基础参数设置
            id: 'babel', // 上面loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    externals: {
        "Vue": "vue"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: {
                                    use: [MiniCssExtractPlugin.loader,
                                        'css-loader',
                                        'postcss-loader',
                                        'less-loader'],
                                    fallback: 'vue-style-loader'
                                },
                                css: {
                                    use: [MiniCssExtractPlugin.loader,
                                        'css-loader',
                                        'postcss-loader'],
                                    fallback: 'vue-style-loader'
                                }
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babel',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 为 css 创建 style 标签并置入其中插入页面
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader' // loader 由下往上依次开始处理
                ]
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf)\??.*$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    }
}