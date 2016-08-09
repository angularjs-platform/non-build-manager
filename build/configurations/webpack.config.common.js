var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('../utils');

const cwd = process.cwd();

module.exports = {
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: [path.join(cwd, './node_modules'), './node_modules']
    },
    resolveLoader: {
        modulesDirectories: [path.join(__dirname, './../../node_modules')]
    },
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                include: [/src/],
                loaders: ['ng-annotate','ts-loader']
            },
            {
                test: /\.tpl$/,
                loader: 'raw'
            },
            {
                test: /\.json$/,
                loader: ['json-loader']
            },
            {
                test: /\.svg$/,
                loader: 'file?name=icons/[name].[ext]'
            },
            {
                test: /\.ico$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'NoN Page',
            filename: './index.html',
            template: './src/index.html',
            inject: 'body',
            hash: true,
            chunksSortMode: 'dependency'
        })
    ],
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}
