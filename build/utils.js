var _ = require('lodash');

// Import config from the current working directory package.json
const path = require('path');
const cwd = process.cwd();
const packageJSON = require(path.resolve(cwd, 'package.json'));

// Get all the linked modules
function getNonModules() {
    var linkedModules = [];
    var packageDependencies = packageJSON.dependencies;

    _.forEach(packageDependencies, function(value, key) {
      if(key.startsWith('@norn')) {
            linkedModules.push(key);
        }
    });

    return linkedModules;
}

// Get the final bundle filename from packageJSON
function getPackageFileName() {
    var tokens = _.split(packageJSON.name, '/');
    var filename = tokens.length > 1 ? tokens[1] : tokens[0];

    return filename;
}

// Get the Source Files for Lint, Docs etc.
function getSourceFileFolders(fileType, filePath) {

    var fileSelector;
    if(fileType === 'scss'){
        fileSelector = filePath + '/**/*.s+(a|c)ss';
    }
    else if(fileType === null) {
        fileSelector = filePath;
    }
    else {
        fileSelector = filePath + '/**/*.' + fileType;
    }

    var srcFileFolders = [cwd + fileSelector];

    // Iterate over all the linked dependencies and add it
    var linkedDependencies = getNonModules();

    linkedDependencies.forEach(function(dependency){
        srcFileFolders.push(cwd + '/node_modules/'+dependency + fileSelector);
    });

    return srcFileFolders;
}

function getLocalizationValues (configModules) {

    var localizationFilePath = '/mock-server/localization.json';
    var localizationValues = {};

    configModules.forEach((module) => {
        try {
            var values;
            if (module === packageJSON.name) {
                // Module is the same where the program started
                values = require(cwd + localizationFilePath);
            } else {
                // Module must be in the cwd/node_modules
                values = require(cwd + '/node_modules/' + module + localizationFilePath);
            }

            _.merge(localizationValues, values);
        } catch (err) {
            // Log an understandable error message and throw error to exit
            console.error('Error while loading a localization module: ' + module
                + '. Please check if the module name is correctly typed and the module is installed in the current working directory node_modules and has server-emulator/localization.json file.');

            throw err;
        }
    });
    return localizationValues;
}

module.exports = {
    getNonModules: getNonModules,
    getPackageFileName: getPackageFileName,
    getSourceFileFolders: getSourceFileFolders,
    getLocalizationValues: getLocalizationValues
};
