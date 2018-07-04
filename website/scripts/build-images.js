const gulp = require('gulp');
const pug = require('pug');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');

const config = require('../config');

function build(cb) {
  const time = Date.now();
  gulp.src(['i/*.*', 'i/**/*.*'])
    .pipe(gulp.dest('../build/i'))
    .pipe(connect.reload())
    .on('end', () => {
      console.log(`Finished images in ${Date.now() - time}ms`);
      if(cb) cb();
    });
}

module.exports = build;