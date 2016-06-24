var typedoc = require("gulp-typedoc");
var sassdoc = require('sassdoc');

var utils = require('../utils');
var configs = require('../configurations/default-configs');

function docsTasks(gulp, packageJSON, cwd) {

    // Typescript API Docs
    function tsDocs() {
        
        var srcFileFolders = utils.getSourceFileFolders('ts', '/src');
        
        var options = {
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,
            out: configs.docsFolder + '/typescript',
            name: packageJSON.description,
            ignoreCompilerErrors: true
        };
        
        // TODO: Few silly compilation errors are shown because of unknown reason, but the docs are generated as expected
        // https://github.com/TypeStrong/typedoc/issues/216
        // https://github.com/TypeStrong/typedoc/issues/157
        return gulp.src(srcFileFolders)
            .pipe(typedoc(options));
    }
    gulp.task('private:ts:docs', tsDocs);
    
    // SCSS API Docs
    function scssDocs() {
        
       var srcFileFolders = utils.getSourceFileFolders('scss', '/src');
       var options = {
            dest: configs.docsFolder + '/sass',
            verbose: true,
            package: {
                title: packageJSON.description
            }
        };
            
        return gulp.src(srcFileFolders)
            .pipe(sassdoc(options));
    }
    gulp.task('private:scss:docs', scssDocs);
}

module.exports = docsTasks;