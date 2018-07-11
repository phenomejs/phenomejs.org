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
  const sidebarConfig = require('../doc-sidebar-config');
  const time = Date.now();
  const docsFiles = fs.readdirSync('../docs').filter(fileName => fileName.indexOf('.') !== 0);

  let cbs = 0;
  const docs = [];
  const sidebar = [];
  docsFiles.forEach((fileName) => {
    const filePath = path.join('../docs/', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const docData = parseMd(fileContent);
    docs.push({
      fileName,
      ...docData,
    });
  });
  sidebarConfig.forEach((section) => {
    const sidebarDocs = [];
    section.docs.forEach((sectionDoc) => {
      docs.forEach((doc) => {
        if (doc.data.id === sectionDoc.id)  {
          sidebarDocs.push({
            id: doc.data.id,
            title: sectionDoc.title,
            url: `/docs/${path.parse(doc.fileName).name}.html`
          });
        }
      })
    })
    sidebar.push({
      title: section.title,
      docs: sidebarDocs,
    })
  })

  docs.forEach((doc) => {
    gulp.src('templates/doc.pug')
      .pipe(gulpPug({
        pug,
        pretty: true,
        locals: {
          config,
          sectionId: 'docs',
          docId: doc.data.id,
          content: doc.html,
          sidebar,
          ...doc.data,
        },
      }))
      .on('error', (err) => {
        console.log(err);
      })
      .pipe(rename((file) => {
        file.basename = path.parse(doc.fileName).name;
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