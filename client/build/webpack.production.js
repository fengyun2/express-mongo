const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// const getEntries = require('./getEntries')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BannerPlugin = webpack.BannerPlugin

/**
 * banners
 */
const json = require('../package.json')

const version = json
    .version
    .split('.')
const v = (version.shift() + '.' + version.join('')).replace(/0+$/, '0')
const now = new Date()
const snow = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ':' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

/**
 * 目录/路径
 */
const srcPath = path.join(__dirname, '../src')
const buildPath = path.resolve(__dirname, '../dist')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')

const productionConf = merge(baseConfig, {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'react-router-redux',
            'redux-thunk',
            'seamless-immutable',
            'isomorphic-fetch',
            'classnames',
            'babel-polyfill',
            'react-tap-event-plugin'
        ]
    },
    output: {
        path: buildPath,
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js'
    },
    stats: {
        children: false
    },
    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack
            .optimize
            .UglifyJsPlugin({ // 压缩js
                minimize: true,
                compress: {
                    warnings: false
                },
                except: ['$super', '$', 'exports', 'require'] // 排除关键字
            }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    postcss: [require('autoprefixer')({flexbox: true, browsers: ['last 3 versions']})],
                    css: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader'
                        ],
                        fallbackLoader: "vue-style-loader"
                    }),
                    scss: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader', 'sass-loader'
                        ],
                        fallbackLoader: "vue-style-loader"
                    }),
                    sass: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader', 'sass-loader'
                        ],
                        fallbackLoader: "vue-style-loader"
                    })
                }

            }
        }),
        new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
            favicon: faviconPath, // favicon路径
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true,
            minify: {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
                // more options: https://github.com/kangax/html-minifier#options-quick-reference
            },
            cache: false,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new CommonsChunkPlugin({
            name: ['vendor'], // 将公共模块提取, 参照 entry
            minChunks: Infinity // 提取所有entry共同依赖的模块
        }),
        function () {
            return this.plugin('done', function (stats) {
                var content
                content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2)
                console.log('版本是：' + JSON.stringify(stats.toJson().hash))
            })
        },
        new webpack.BannerPlugin('built in ' + snow + ' version ' + v + ' by luyun\n'),
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
})

module.exports = productionConf