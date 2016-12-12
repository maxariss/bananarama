var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var print = require('gulp-print');

var tattoo = require('gulp-tattoo');
var fs = require('fs');
var asciiArt = fs.readFileSync('header.txt', 'utf8');

var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 5 versions'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('jspm', function() {
  return gulp.src('app/js/jspm_packages/system.js')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('javascript', function() {
  return gulp.src('app/js/build.js')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('art', function() {
  return gulp.src('app/index.html')
    .pipe(tattoo(asciiArt))
    .pipe(gulp.dest('dist'));
});

gulp.task('print', function() {
  gulp.src('app/**/*')
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'art', ['sass', 'useref', 'jspm', 'javascript', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'art', 'browserSync', 'print', 'watch'],
    callback
  )
});
