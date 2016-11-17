const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const getEntries = require('./getEntries')
// module.exports = Object.assign({}, base, {
//   target: 'node',
//   devtool: false,
//   entry: {
//     index: [path.resolve(__dirname, '../src/index.js')]
//   },
//   // output: Object.assign({}, base.output, {
//   //   filename: 'server/[name].js',
//   //   libraryTarget: 'commonjs2'
//   // }),
//   externals: Object.keys(require('../package.json').dependencies),
//   plugins: [new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//       'process.env.REACT_ENV': '"server"'
//     })]
// })


const developmentConf = merge(baseConfig, {
    entry: {
        index: [path.resolve(__dirname, '../src/server.js')]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [
                    require('autoprefixer')({
                        flexbox: true,
                        browsers: ['last 3 versions']
                    })
                ],
                css: ExtractTextPlugin.extract({
                    loader: ['css', 'postcss'],
                    fallbackLoader: "vue-style-loader"
                }),
                scss: ExtractTextPlugin.extract({
                    loader: ['css', 'postcss', 'sass'],
                    fallbackLoader: "vue-style-loader"
                }),
                sass: ExtractTextPlugin.extract({
                    loader: ['css', 'postcss', 'sass'],
                    fallbackLoader: "vue-style-loader"
                })
            }
        }),
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
})

module.exports = developmentConf