// Core
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');

// Deploy
var rsync  = require('gulp-rsync');
var path = require('path');
var gulpReplace = require('gulp-replace-path');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

// Javascript
var uglify = require('gulp-uglify');
var jsonlint = require("gulp-jsonlint");

// Extra
var fs = require('fs');
var print = require('gulp-print');
var tattoo = require('gulp-tattoo');
var asciiArt = fs.readFileSync('ascii.txt', 'utf8');
var imagemin = require('gulp-imagemin');

// Compile SASS/SCSS
// Run through autoprefixer
// Pipe into CSS app dir
// Stream with browsersync
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 5 versions'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Tattoo .html files with ASCII
// Replace development paths
// Concatenates CSS files
// Minifies CSS files
// Pipe into DIST root dir
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(tattoo(asciiArt))
    .pipe(gulpReplace('js/jspm_packages', 'js'))
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Lint JSON data for errors
gulp.task('json', function() {
  return gulp.src('app/data/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

// Optimize image files
// Pipe into DIST images dir
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
});

// Run JSPM module
// Pipe into DIST js dir
gulp.task('jspm', function() {
  return gulp.src('app/js/jspm_packages/system.js')
    .pipe(gulp.dest('dist/js'))
});

// Bundle ES6 Modules
// Pipe into DIST js dir
gulp.task('javascript', function() {
  return gulp.src('app/js/build.js')
    .pipe(gulp.dest('dist/js'))
});

// Nunjucks templating
gulp.task('nunjucks', function() {
  return gulp.src('app/templates/pages/**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  .pipe(gulp.dest('app'))
});

// Setup browsersync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// Pipe JSON data to DIST dir
gulp.task('data', function() {
  return gulp.src('app/data/**/*')
  .pipe(gulp.dest('dist/data'))
});

// Delete contents of DIST dir
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Print file changes in terminal
// Ignore JSPM modules
gulp.task('print', function() {
  gulp.src(['app/**/*', '!app/js/jspm_packages/**/*.js'])
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }))
});

// Gulp watch
gulp.task('watch', ['browserSync', 'nunjucks', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['nunjucks', browserSync.reload]);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Gulp build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    ['useref', 'sass', 'json', 'jspm', 'javascript', 'images'],
    'data',
    callback
  );
});

// Gulp default
gulp.task('default', function (callback) {
  runSequence(['sass', 'json', 'browserSync', 'print', 'watch'],
    callback
  );
});

// Gulp deploy
gulp.task('deploy', function() {
  return gulp.src('dist/**')
    .pipe(rsync({
      destination: '~/public_html/bananarama/',
      root: 'dist',
      hostname: 'truemaxdesign.com',
      username: 'truemaxd',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }));
});
