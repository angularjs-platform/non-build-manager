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
      if(key.startsWith('non-') > -1) {
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

module.exports = {
    getNonModules: getNonModules,
    getPackageFileName: getPackageFileName,
    getSourceFileFolders: getSourceFileFolders
};