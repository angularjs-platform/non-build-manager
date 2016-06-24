var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gutil = require('gulp-util');

var mockServer = require('../../mock-server/index');
var configs = require('../configurations/default-configs');

var webpackWatch = require('../configurations/webpack.config.watch.js');
var webpackWatchModeConfig = webpackWatch.webpackWatchModeConfig;
var webpackDevServerConfig = webpackWatch.webpackDevServerConfig;

function server(gulp, packageJSON, cwd) {
    var mockServerPort = configs.MOCK_SERVER_PORT;
    var serverPort = configs.SERVER_PORT;
    
    // Mock Server : Don't Serve Static Resources
    function startDev() {
        mockServer.start(false, mockServerPort, configs.distFolder);
    }
    gulp.task('private:mock:server:endpoints', startDev);

    // Mock Server : Serve Static Resources
    function startProd() {
        mockServer.start(true, serverPort, configs.distFolder);
    }
    gulp.task('private:mock:server:static:endpoints', startProd);

    // Webpack Dev Server : Hot Module Replacement
    function runDevServer() {
        // Start webpack-dev-server
        var server = new WebpackDevServer(
            webpack(webpackWatchModeConfig),
            webpackDevServerConfig
        )
        server.listeningApp.on('listening', function () {
            console.log('webpack-dev-server is up and running. \nPlease visit http://localhost:' + serverPort + ' to run your app');
        });
        server.listen(serverPort, 'localhost', function (err) {
            if (err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }
        });
    }
    gulp.task('private:webpack:server', runDevServer);
}

module.exports = server;