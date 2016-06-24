var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('../utils');

module.exports = {
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    resolveLoader: {
        modulesDirectories: [path.join(__dirname, './../../node_modules')]
    },
    output: {
        filename: utils.getPackageFileName() + '.js'
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
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            console.log((percentage * 100) + '%', msg);
        }),
        new HtmlWebpackPlugin({
            title: 'NoN Page',
            filename: './index.html',
            template: './src/index.html',
            inject: 'body',
            hash: true
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
