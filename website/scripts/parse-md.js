const Remarkable = require('remarkable');
const yaml = require('js-yaml');
const highlight = require('./highlight');
const md = new Remarkable({
  html: true,
  highlight(code, lang) {
    return highlight(code, lang);
  }
});

function alias(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^\w]/g, '-')
    .replace(/[-]{2,}/g, '-');
}

function parse(contents = '') {
  let mdContent = contents.trim();
  let yamlContent = '';
  let data = {};
  if (mdContent.indexOf('---') === 0) {
    yamlContent = mdContent.split('---')[1];
    mdContent = mdContent.split('---').filter((el, index) => index > 1).join('').trim();
  }

  const index = [];

  mdContent = mdContent
    .replace(/\n## ([^\n]*)/g, function (str, found) {
      index.push(`* [${found}](#${alias(found)})`);
      return `\n## <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n### ([^\n]*)/g, function (str, found) {
      index.push(`  * [${found}](#${alias(found)})`);
      return `\n### <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n#### ([^\n]*)/g, function (str, found) {
      index.push(`    * [${found}](#${alias(found)})`);
      return `\n#### <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n##### ([^\n]*)/g, function (str, found) {
      index.push(`      * [${found}](#${alias(found)})`);
      return `\n##### <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    });

  mdContent = mdContent.replace('\n{{index}}\n', `\n${index.join('\n')}\n`);

  const html = md.render(mdContent);

  if (yamlContent) data = yaml.safeLoad(yamlContent);

  return {
    data,
    html,
  };
}

module.exports = parse;
