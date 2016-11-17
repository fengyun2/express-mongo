const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const developmentConf = merge(baseConfig, {
    entry: {
        index: [path.resolve(__dirname, '../src/index.js')]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
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
            },
            options: {
                devServer: {
                    contentBase: path.resolve(__dirname, '../src'), //本地服务器所加载的页面所在的目录
                    colors: true, // 终端中输出结果为彩色
                    historyApiFallback: true, //不跳转
                    inline: true //实时刷新
                }
            }
        }),
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
})

module.exports = developmentConf