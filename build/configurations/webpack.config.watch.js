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

var webpackWatchConfig = {
    entry: [
        __dirname + '/../../node_modules/webpack-dev-server/client?http://localhost:'+ webpackDevServerPort +'/',
        __dirname + '/../../node_modules/webpack/hot/dev-server',
        cwd + '/' + packageJSON.browser,
    ],
    output: {
        path: cwd + '/' + configs.distFolder,
        filename: utils.getPackageFileName() + '.js',
        pathinfo: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
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
