const gulp = require('gulp');
const connect = require('gulp-connect');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('gulp-uglify');
const commonjs = require('rollup-plugin-commonjs');

let cache;
function build(cb) {
  const time = Date.now();

  rollup.rollup({
    input: './js/main.js',
    cache,
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      buble(),
    ],
  }).then((bundle) => {
    cache = bundle;
    return bundle.write({
      strict: true,
      file: '../build/js/main.js',
      format: 'iife',
      name: 'main',
      sourcemap: false,
    });
  }).then(() => {
    // Minified version
    gulp.src('../build/js/main.js')
      .pipe(uglify())
      .pipe(gulp.dest('../build/js/'))
      .on('end', () => {
        console.log(`Finished js in ${Date.now() - time}ms`);
        cb();
      });
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}

module.exports = build;