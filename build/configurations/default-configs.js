var defaultConfigs = {
    distFolder: './dist',
    docsFolder: './docs',
    coverageFolder: './coverage',
    MOCK_SERVER_PORT: 7000,
    SERVER_PORT: 9000
};
                
// Import config from the current working directory package.json
const path = require('path');
const cwd = process.cwd();
const packageJSON = require(path.resolve(cwd, 'package.json'));

const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(defaultConfigs, packageJSON.config.non);