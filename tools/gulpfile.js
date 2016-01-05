'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat-util');
var gulpinject = require('gulp-inject');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var del = require('del');


var paths = {
  src: '../src/',
  dist: '../dist/'
};


var jsSourceFiles = [
  paths.src + '**/*.js',
];


var jsLibs = [
  paths.dist + 'lib/angular/angular.js'
];


var plugins = [
];


var jsFiles = [
  paths.dist + 'index.module.js',
  paths.dist + 'framework/**/*.module.js',
  paths.dist + 'app/**/*.module.js',
  paths.dist + 'framework/**/*.js',
  paths.dist + 'app/**/*.js',
  '!' + paths.dist + '**/*.mock.js',
  '!' + paths.dist + '**/*.spec.js'
];


var scssSourceFiles = [
  paths.src + 'index.scss'
];


var cssFiles = [
   paths.dist + 'index.css'
];


var partials = [
  paths.src + 'lib/**/*.html',
  paths.src + 'framework/**/*.html',
  paths.src + 'app/**/*.html'
];


gulp.task('js', function () {
  return gulp
    .src(jsSourceFiles, { base: paths.src })
    .pipe(gulp.dest(paths.dist));
});


gulp.task('css', function () {
  return gulp
    .src(scssSourceFiles, { base: paths.src })
    .pipe(sass())
    .pipe(gulp.dest(paths.dist));
});


gulp.task('html', function () {
  return gulp
    .src(partials, { base: paths.src })
    .pipe(gulp.dest(paths.dist))  ;
});


gulp.task('index:copy', function () {
  return gulp
    .src(paths.src + 'index.html')
    .pipe(gulp.dest(paths.dist));
});


gulp.task('index:inject', function () {
  var sources = gulp.src(
    [paths.dist + 'config.js']
    .concat(jsLibs)
    .concat(plugins)
    .concat(jsFiles)
    .concat(cssFiles), { read: false });

  return gulp
    .src(paths.dist + 'index.html')
    .pipe(gulpinject(sources, { relative: true }))
    .pipe(concat.header())
    .pipe(gulp.dest(paths.dist));
});


gulp.task('clean', function (next) {
  del(paths.dist, { force: true }, next);
});


gulp.task('default', function (next) {
  runSequence(
    'js',
    'css',
    'html',
    'index:copy',
    'index:inject',
    next
  );
});
