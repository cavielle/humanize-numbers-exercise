var gulp    = require('gulp');
var plugins = require('gulp-load-plugins');

// # Initial gulp-load-plugins here
// # ################################################
var $ = plugins();

// # Tests
// # ################################################
gulp.task('mocha', function () {

  // Environment
  process.env.NODE_ENV = 'test';

  // Mocha setup
  var should = require('should');
  global.should = require('should');

  // the task
  gulp.src('./lib/**/*.test.js', { read: false })
    .pipe($.mocha({
      ui: 'bdd',
      reporter: 'spec',
      globals: { should: should }
    }))
    .on('error', $.util.log);
});

gulp.task('mocha-watch', ['mocha'], function () {
  gulp.watch('./lib/**/*.js', ['mocha'])
});

gulp.task('test', ['mocha']);
gulp.task('test-watch', ['mocha-watch']);

// # Default
// # ################################################
gulp.task('default');