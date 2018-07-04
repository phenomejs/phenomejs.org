const Remarkable = require('remarkable');
const yaml = require('js-yaml');
const highlight = require('./highlight');
const md = new Remarkable({
  highlight(code, lang) {
    return highlight(code, lang);
  }
});

function parse(contents = '') {
  let mdContent = contents.trim();
  let yamlContent = '';
  let data = {};
  if (mdContent.indexOf('---') === 0) {
    yamlContent = mdContent.split('---')[1];
    mdContent = mdContent.split('---').filter((el, index) => index > 1).join('').trim();
  }
  const html = md.render(mdContent);
  if (yamlContent) data = yaml.safeLoad(yamlContent);
  return {
    data,
    html,
  };
}

module.exports = parse;
