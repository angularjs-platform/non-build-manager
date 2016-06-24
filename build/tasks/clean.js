var del = require('del');
var configs = require('../configurations/default-configs');

function cleanTasks(gulp, packageJSON, cwd) {

    // Clean Dist Folder and Coverage 
    function cleanAll() {
        del([
            configs.distFolder + '**', configs.docsFolder + '**', configs.coverageFolder + '**'
        ]);
    }
    gulp.task('private:clean:all', cleanAll);
}

module.exports = cleanTasks;