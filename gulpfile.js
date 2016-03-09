var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  webserver = require('gulp-webserver'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  ngHtml2Js = require("gulp-ng-html2js"),
  concat = require("gulp-concat");

gulp.task('lint', function () {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload());
});

gulp.task('html2js', function () {
  return gulp.src('./app/views/**/*.html')
    .pipe(ngHtml2Js({
      moduleName: 'Templates'
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest('./app/scripts'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(
    ['./app/scripts/**/*.js',
      './app/index.html',
      './app/styles/**/*.css',
      './app/views/**/*.html'
    ],
    ['lint', 'html2js']);
});

gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    port : 3242,
    root: 'app'
  });
});

gulp.task('default', ['webserver', 'lint', 'html2js', 'watch']);