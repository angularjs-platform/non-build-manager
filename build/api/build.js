var runSequence = require('run-sequence');
function buildAPI(gulp, packageJSON, cwd) {

    /* Final Build Development Task */
    gulp.task('build:dev', ['private:build:dev']);
    
    /* Final Build Production Task */
    gulp.task('build:prod', ['private:build:prod']);
    
    /* Final Build Publish Task */
    gulp.task('build:publish', ['private:build:publish']);
    
    /* Final Build Coverage Task */
    gulp.task('build:coverage', ['private:build:coverage']);
    
    /* Final Build Watch Task */
    gulp.task('build:watch', ['private:mock:server:endpoints', 'private:webpack:server']);
}

module.exports = buildAPI;
