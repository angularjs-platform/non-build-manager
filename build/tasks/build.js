var webpack = require('webpack-stream');
var webpackDevConfig = require('../configurations/webpack.config.dev');
var webpackProdConfig = require('../configurations/webpack.config.prod');
var webpackCoverageConfig = require('../configurations/webpack.config.coverage');
//var webpackPublishConfig = require('../configurations/webpack.config.publish');

var configs = require('../configurations/default-configs');

function buildTasks(gulp, packageJSON, cwd) {

    // Build for Development
	function buildDev() {
    	return gulp.src(packageJSON.browser)
        	.pipe(webpack(webpackDevConfig))
        	.pipe(gulp.dest(configs.distFolder));
	}
	gulp.task('private:build:dev', buildDev);
    
    // Build for Production
	function buildProd() {
    	return gulp.src(packageJSON.browser)
        	.pipe(webpack(webpackProdConfig))
        	.pipe(gulp.dest(configs.distFolder));
	}
	gulp.task('private:build:prod', buildProd);
    
    // Build for Coverage
	function buildCoverage() {
    	return gulp.src(packageJSON.browser)
        	.pipe(webpack(webpackCoverageConfig))
        	.pipe(gulp.dest(configs.coverageFolder));
	}
	gulp.task('private:build:coverage', buildCoverage);
    
    // Build for Publish
	/*function buildPublish() {
    	return gulp.src(packageJSON.browser)
        	.pipe(webpack(webpackPublishConfig))
        	.pipe(gulp.dest(configs.distfolder));
	}
	gulp.task('private:build:publish', buildPublish);*/
}

module.exports = buildTasks;