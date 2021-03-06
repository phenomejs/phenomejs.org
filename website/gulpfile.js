const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const buildPages = require('./scripts/build-pages');
const buildDocs = require('./scripts/build-docs');
const buildLess = require('./scripts/build-less');
const buildImages = require('./scripts/build-images');
const buildJs = require('./scripts/build-js');

gulp.task('pages', buildPages);
gulp.task('docs', buildDocs);
gulp.task('less', buildLess);
gulp.task('images', buildImages);
gulp.task('js', buildJs);

gulp.task('build', ['pages', 'docs', 'less', 'images', 'js']);

gulp.task('watch', () => {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./pages/**/*.pug', ['pages']);
  gulp.watch(['./i/*.*', './i/**/*.*'], ['images']);

  gulp.watch(['../docs/**/*.md'], ['docs']);
  gulp.watch(['./templates/*.pug'], ['docs', 'pages']);

  gulp.watch(['./js/*.js'], ['js']);
});

/* =================================
Server
================================= */
gulp.task('connect', function () {
  return connect.server({
    root: [ '../build' ],
    livereload: true,
    port:'3000'
  });
});

gulp.task('open', function () {
  return gulp.src('../build/index.html').pipe(open({ uri: 'http://localhost:3000/'}));
});

gulp.task('server', [ 'watch', 'connect', 'open' ]);

gulp.task('default', [ 'build', 'server' ]);