function serverAPI(gulp, packageJSON, cwd) {

    /* Starts the mock server and serves both Static resources with endpoints */
    gulp.task('mock:server', ['private:mock:server:static:endpoints']);
}

module.exports = serverAPI;
