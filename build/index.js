#!/usr/bin/env node

var gulp = require('gulp');
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var prettyTime = require('pretty-hrtime');

// Import config from the current working directory package.json
var cwd = process.cwd();
var packageJSON = require(path.resolve(cwd,'package.json'));

// Load all gulp tasks from gulp subfolder
var normalizedPathAPI = path.join(__dirname, 'api');
fs.readdirSync(normalizedPathAPI).forEach(function(file) {
    require('./api/' + file)(gulp, packageJSON, cwd);
});

var normalizedPathTasks = path.join(__dirname, 'tasks');
fs.readdirSync(normalizedPathTasks).forEach(function(file) {
    require('./tasks/' + file)(gulp, packageJSON, cwd);
});

// Setup logging similar to running gulp directly from CLI
// Logging code copied from gulp.js file as suggested in https://github.com/gulpjs/gulp/issues/770
gulp.on('task_start', function(e) {
    gutil.log('Starting', '\'' + chalk.cyan(e.task) + '\'...');
});

gulp.on('task_stop', function(e) {
    var time = prettyTime(e.hrDuration);
    gutil.log(
      'Finished', '\'' + chalk.cyan(e.task) + '\'',
      'after', chalk.magenta(time)
    );
});

gulp.on('task_err', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    gutil.log(
      '\'' + chalk.cyan(e.task) + '\'',
      chalk.red('errored after'),
      chalk.magenta(time)
    );
    gutil.log(msg);
});

gulp.on('task_not_found', function(err) {
    gutil.log(
      chalk.red('Task \'' + err.task + '\' is not in your gulpfile')
    );
    gutil.log('Please check the documentation for proper gulpfile formatting');
    process.exit(1);
});


// Identify the task requested by the user
var userArgs = process.argv.slice(2);
var taskName = userArgs[0];

// Run the task
// FIXME: gulp.start('task') will be deprecated with Gulp 4.0 but can be replaced by gulp.parallel('task')();
// or gulp.series('task')(); as mentioned here https://github.com/gulpjs/gulp/issues/1125
gulp.start(taskName);

// Format errors
function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // Normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // Unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}
