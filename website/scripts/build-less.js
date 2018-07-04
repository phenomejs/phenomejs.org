const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

function build(cb) {
  const time = Date.now();

  gulp.src(['./less/main.less'])
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      advanced: false,
      aggressiveMerging: false,
    }))
    .pipe(gulp.dest('../build/css/'))
    .pipe(connect.reload())
    .on('end', function () {
      console.log(`Finished less in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

module.exports = build;