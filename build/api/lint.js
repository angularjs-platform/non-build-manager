function lintAPI(gulp, packageJSON, cwd) {

    /* Lint TS Task */
    gulp.task('lint:ts', ['private:lint:ts']);
    
    /* Lint Tests Task */
    gulp.task('lint:tests', ['private:lint:tests']);
    
    /* Lint SCSS Task */
    gulp.task('lint:scss', ['private:lint:scss']);
    
    /* Lint  All Task */
    gulp.task('lint', ['private:lint:ts', 'private:lint:tests', 'private:lint:scss']);
}

module.exports = lintAPI;
