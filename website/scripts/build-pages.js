const gulp = require('gulp');
const pug = require('pug');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');

const config = require('../config');

function build(cb) {
  const time = Date.now();
  gulp.src(['pages/*.pug', 'pages/**/*.pug'])
    .pipe(gulpPug({
      pug,
      pretty: true,
      locals: {
        config,
      }
    }))
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest('../build'))
    .pipe(connect.reload())
    .on('end', () => {
      console.log(`Finished pages in ${Date.now() - time}ms`);
      if(cb) cb();
    });
}

module.exports = build;