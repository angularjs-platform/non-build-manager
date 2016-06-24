function cleanAPI(gulp, packageJSON, cwd) {

    /* Clean All Task */
    gulp.task('clean', ['private:clean:all']);
}

module.exports = cleanAPI;
