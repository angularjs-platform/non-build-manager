var webpack = require('webpack');
var webpackCommonConfig = require('./webpack.config.common');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils = require('../utils');

var webpackProdConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?name=images/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin(utils.getPackageFileName() + '.css')
    ]
};

module.exports = webpackMerge(webpackCommonConfig, webpackProdConfig);

