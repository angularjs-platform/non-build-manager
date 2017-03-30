var utils = require('../utils');
var fs = require('fs');
var path = require('path');
var cwd = process.cwd();

function extractLocalizations(gulp, packageJSON, cwd) {

    function extract() {
        var outputFolder = path.join(cwd, 'extract');
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        };

        packageJSON.config.non.mockServerConfig.localizationConfig.forEach((config) => {
            var file = path.join(cwd, 'extract', 'localization'+ config.url.split('/').join('_') + '.json');
            fs.writeFileSync(file, JSON.stringify(utils.getLocalizationValues(config.modules), null, 4));
        });
    }

    gulp.task('extract:localization', extract);
}

module.exports = extractLocalizations;
