function generateAPI(gulp, packageJSON, cwd) {

    /* Generate API Docs Task for TS and SCSS */
    gulp.task('generate:docs', ['private:ts:docs', 'private:scss:docs']);
    
    /* Generate Changelog */
    gulp.task('generate:changelog', ['private:generate:changelog']);
}

module.exports = generateAPI;
