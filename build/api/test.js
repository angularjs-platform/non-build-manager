var runSequence = require('run-sequence');
function testAPI(gulp, packageJSON, cwd) {

    /* Final test Development Task */
    gulp.task('test:dev', ['private:test:dev']);
    
    /* Final test Production Task */
    gulp.task('test:prod', ['private:test:prod']);
    
    /* Final test Publish Task */
    gulp.task('test:publish', ['private:test:publish']);
    
    /* Final test Coverage Task */
    gulp.task('test:coverage', ['private:test:coverage']);
}

module.exports = testAPI;
