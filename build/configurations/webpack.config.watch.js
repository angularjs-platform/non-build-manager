var webpack = require('webpack');
var path = require('path');

var webpackDevConfig = require('./webpack.config.dev');
var webpackMerge = require('webpack-merge');

// Import config from the current working directory package.json
var cwd = process.cwd();
var packageJSON = require(path.resolve(cwd, 'package.json'));

var configs = require('./default-configs');
var webpackDevServerPort = configs.SERVER_PORT;
var mockServerPort = configs.MOCK_SERVER_PORT;

var utils = require('../utils');

var tslintRules = require(path.join(__dirname, '../../coding-conventions/rules/typescript'));

var webpackWatchConfig = {
    entry: {
        devserver: __dirname + '/../../node_modules/webpack-dev-server/client?http://localhost:'+ webpackDevServerPort +'/',
        hmr: __dirname + '/../../node_modules/webpack/hot/dev-server'
    },
    output: {
        path: cwd + '/',
        pathinfo: true
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    tslint: {
        rulesDirectory: path.join(__dirname, '../../node_modules/tslint-eslint-rules/dist/rules'),
        configuration: {
            rules: tslintRules.rules
        },
        emitErrors: true,
        failOnHint: false
    }
};

module.exports = {
    webpackWatchModeConfig: webpackMerge(webpackDevConfig, webpackWatchConfig),
    webpackDevServerConfig: {
        hot: true,
        proxy: {
            '*': 'http://localhost:'+ mockServerPort
        },
        stats: 'errors-only'
    }
}
