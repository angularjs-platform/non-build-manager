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
        sourceMapFilename: '[file].map',
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
                loaders: ['json-loader']
            },
            {
                test: /\.svg$/,
                loader: 'file?name=icons/[name].[ext]'
            },
            {
                test: /\.ico$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\ui-grid.(ttf|eot|woff)$/,
                loader: 'url-loader?limit=100000'
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
    ts: {
    	compilerOptions: {
        	"target": "es5",
            "module": "commonjs",
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "moduleResolution": "node",
            "noEmitOnError": false,
            "noEmitHelpers": false,
            "noImplicitAny": true,
            "removeComments": true,
            "sourceMap": true,
            "noImplicitReturns": true,
            "noFallthroughCasesInSwitch": true,
            "allowUnreachableCode": false,
            "allowSyntheticDefaultImports": false,
            "allowJs": false,
            "noImplicitUseStrict": true
    	}
	},
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}
