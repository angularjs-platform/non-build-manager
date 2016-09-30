var utils = require('../utils');
var fs = require('fs');

function extractLocalizations(gulp, packageJSON, cwd) {

    function extract() {
        const nonModules = utils.getNonModules();

        nonModules.forEach(function(dependency) {

            const localizationFileName = cwd + '/node_modules/'+dependency + '/mock-server/localization.json';
            const tokens = dependency.split('/');
            const folderName = tokens.length > 1 ? tokens[1] : tokens[0];

            try {
                // Check if file exists
                fs.statSync(localizationFileName);
                gulp.src(localizationFileName)
        	    .pipe(gulp.dest('./extract/' + folderName));
            }
            catch (e) {
                // DO Nothing
            }
        });

    }

    gulp.task('extract:localization', extract);
}

module.exports = extractLocalizations;
