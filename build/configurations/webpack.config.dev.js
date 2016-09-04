var webpack = require('webpack');
var webpackCommonConfig = require('./webpack.config.modularized');
var webpackMerge = require('webpack-merge');

var webpackDevConfig = {
    devtool: '#eval-source-map',
    debug: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass-loader?sourceMap']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url'
            }
        ]
    }
};

module.exports = webpackMerge(webpackCommonConfig, webpackDevConfig);

