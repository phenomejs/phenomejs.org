const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const pug = require('pug');
const gulpPug = require('gulp-pug');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const parseMd = require('./parse-md');
const config = require('../config');

function build(cb) {
  const time = Date.now();
  const docsFiles = fs.readdirSync('../docs').filter(fileName => fileName.indexOf('.') !== 0);

  let cbs = 0;
  docsFiles.forEach((fileName) => {
    const filePath = path.join('../docs/', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const docData = parseMd(fileContent);

    gulp.src('templates/doc.pug')
      .pipe(gulpPug({
        pug,
        pretty: true,
        locals: {
          config,
          content: docData.html,
          ...docData.data,
        },
      }))
      .on('error', (err) => {
        console.log(err);
      })
      .pipe(rename((file) => {
        file.basename = path.parse(fileName).name;
      }))
      .pipe(gulp.dest('../build/docs'))
      .pipe(connect.reload())
      .on('end', () => {
        cbs += 1;
        if(cb && cbs === docsFiles.length) {
          console.log(`Finished docs in ${Date.now() - time}ms`);
          cb();
        }
      });
  });
}

module.exports = build;