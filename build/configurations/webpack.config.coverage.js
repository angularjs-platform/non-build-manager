const webpackDevConfig = require('./webpack.config.dev');
const webpackMerge = require('webpack-merge');

const webpackCoverageConfig = {
	devtool: 'inline-source-map',
	ts: {
    	compilerOptions: {
        	"sourceMap": false,
        	"inlineSourceMap": true
    	}
	},
	module: {
    	postLoaders: [
        	{
            	test: /\.ts$/,
            	exclude: [/node_modules/],
            	loader: 'istanbul-instrumenter'
        	}
    	]
	}
};

module.exports = webpackMerge(webpackDevConfig, webpackCoverageConfig);
