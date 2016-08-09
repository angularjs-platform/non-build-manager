const webpackCommonConfig = require('./webpack.config.common');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const _ = require('lodash');
const gutil = require('gulp-util');
var utils = require('../utils');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Import config from the current working directory package.json
const path = require('path');
const cwd = process.cwd();
const packageJSON = require(path.resolve(cwd, 'package.json'));

const webpackConfig = packageJSON.config.non.webpackConfig;

const filename = utils.getPackageFileName();

function getEntry(webpackConfig) {
    var entry = {};
    Object.keys(webpackConfig.entry).forEach(key => entry[key] = cwd + webpackConfig.entry[key]);
    return entry;
}

function getCopyAssets(webpackConfig) {
    var copyAssets = [];
    _.forEach(webpackConfig.copyAssets, function(copyAssetsConfig) {
        copyAssets.push({
            from: cwd + copyAssetsConfig.from,
            to: cwd + copyAssetsConfig.to
        });
    });
    return copyAssets;
}

function getWebpackModuleConfig() {

    var webpackModuleConfig = {};

    if(webpackConfig !== undefined) {

        if(webpackModuleConfig.plugins === undefined) {
            webpackModuleConfig.plugins = [];
        }
        // Copy assets
        if(webpackConfig.copyAssets !== undefined) {
            webpackModuleConfig.plugins.push(new CopyWebpackPlugin(getCopyAssets(webpackConfig)));
        }

        // Provide library alias
        if(webpackConfig.libAlias !== undefined) {
            webpackModuleConfig.plugins.push(new webpack.ProvidePlugin(webpackConfig.libAlias));
        }

        // Entry files
        if(webpackConfig.entry !== undefined) {
            webpackModuleConfig.entry = getEntry(webpackConfig);

            webpackModuleConfig.plugins.push(
                new webpack.optimize.OccurenceOrderPlugin(true),
                new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'non', 'vendor'], minChunks: Infinity })
            );
        }
        else {
            // If entrypoints are not specified, fallback on the main
            webpackModuleConfig.entry = {
                main: packageJSON.main
            };
        }
    }

    return webpackModuleConfig;
}

module.exports = webpackMerge(webpackCommonConfig, getWebpackModuleConfig());
