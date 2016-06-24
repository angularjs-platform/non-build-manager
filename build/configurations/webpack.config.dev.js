var webpackCommonConfig = require('./webpack.config.common');
var webpackMerge = require('webpack-merge');

var webpackDevConfig = {
    devtool: 'eval',
    debug: true,
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

