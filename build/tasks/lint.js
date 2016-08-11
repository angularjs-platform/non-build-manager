var tslint = require('gulp-tslint');
var path = require('path');
var utils = require('../utils');
var sassLint = require('gulp-sass-lint');

function lintTasks(gulp, packageJSON, cwd) {

	// Lint TS Src Files
	function lintTS() {

     	var srcFileFolders = utils.getSourceFileFolders('ts', '/src');
        var tslintRules = require(path.join(__dirname, '../../coding-conventions/rules/typescript'));

    	return gulp.src(srcFileFolders)
        	.pipe(tslint({
                	rulesDirectory: path.join(__dirname, '../../node_modules/tslint-eslint-rules/dist/rules'),
                	configuration: {
                        	rules: tslintRules.rules
                    	}
                	}
       	)).pipe(tslint.report('prose', { summarizeFailureOutput: true }));
	}
	gulp.task('private:lint:ts', lintTS);

	// Lint JS Test Files
	function lintTests() {

        var srcFileFolders = utils.getSourceFileFolders('ts', '/test');
     	var tslintRules = require(path.join(__dirname, '../../coding-conventions/rules/typescript'));

        return gulp.src(srcFileFolders)
        	.pipe(tslint({
                	rulesDirectory: path.join(__dirname, '../../node_modules/tslint-eslint-rules/dist/rules'),
                	configuration: {
                        	rules: tslintRules.rules
                    	}
                	}
       	)).pipe(tslint.report('prose', { summarizeFailureOutput: true }));
	}
	gulp.task('private:lint:tests', lintTests);

	// Lint SCSS
	function lintSCSS() {

        var srcFileFolders = utils.getSourceFileFolders('scss', '/src');
    	return gulp.src(srcFileFolders)
            .pipe(sassLint({
                configFile: path.join(__dirname, '../../coding-conventions/rules/scss.yaml')
            }))
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError())
	}
	gulp.task('private:lint:scss', lintSCSS);
}

module.exports = lintTasks;


