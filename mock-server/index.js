function runMockServer(serveStaticResources, PORT, folderToServe){
    var express = require('express');
    var bodyParser = require('body-parser');
    var multiparty = require('connect-multiparty');
    var _ = require('lodash');
    var utils = require('../build/utils');

    var cwd = process.cwd();
    var packageJSON = require(cwd + '/package.json');
    var mockServerConfig = packageJSON.config.non.mockServerConfig;
    var filePath = '/mock-server/endpoints';

    var app = express();
    var multipartyMiddleware = multiparty();

    app.use(bodyParser.text({ type: 'text/plain' }));
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: false }));

    // Serve static data
    if(serveStaticResources === true)
    {
        console.log(folderToServe.replace('.',''));
        app.use(express.static(cwd + folderToServe.replace('.','')));
    }

    // Create routes based on config
    const routes = getApiEndpoints();
    routes.forEach((config) => {
        app.use(config.mainUrl, createEndpoints(config.routes));
    });

    // Setup localization route
    if(mockServerConfig.localizationConfig) {
        setupLocalizationValues();
    };

    app.set('port', PORT);

    app.listen(PORT, function () {
        console.log('Experience awesomeness on port: ', PORT);
    });

    function getApiEndpoints() {
        var routes = [];

        mockServerConfig.apimodules.forEach((module) => {
            try {
                var apiEndpoints;
                if (module === packageJSON.name) {
                    // Module is the same where the program started
                    apiEndpoints = require(cwd + filePath);
                } else {
                    // Module must be in the cwd/node_modules
                    apiEndpoints = require(cwd + '/node_modules/' + module + filePath);
                }

                routes.push(apiEndpoints);
            } catch (err) {
                // Log an understandable error message and throw error to exit
                console.error('Error while loading a serverEmulatorConfig module: ' + module
                    + '. Please check if the module name is correctly typed and the module is installed in the current working directory node_modules and has server-emulator/routes.js file.');

                throw err;
            }
        });

        return routes;
    }

    // Create all endpoints with the given url and attach the callback
    function createEndpoints(apiEndpoints) {
        var router = express.Router();

        apiEndpoints.forEach((route) => {
            var url = route.url;
            var callback = route.callback;

            // Currently only GET, POST and PUT are supported
            if (route.method === 'GET') {
                router.get(url, callback);
            } else if (route.method === 'POST') {
                if(route.isupload) {
                    router.post(url, multipartyMiddleware, callback);
                }
                else {
                    router.post(url, callback);
                }
            } else if (route.method === 'PUT') {
                router.put(url, callback);
            }
        });

        return router;
    }

    function setupLocalizationValues () {

        mockServerConfig.localizationConfig.forEach((config) => {
            app.get(config.url, function(req, res, next) {
                res.json(utils.getLocalizationValues(config.modules));
            });
        });
    }
}

module.exports = {
    start: runMockServer
};
