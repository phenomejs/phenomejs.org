const Remarkable = require('remarkable');
const yaml = require('js-yaml');
const highlight = require('./highlight');
const md = new Remarkable({
  html: true,
  highlight(code, lang) {
    return highlight(code, lang);
  }
});

function alias(string) {
  let str = string
    .trim()
    .toLowerCase()
    .replace(/[^\w]/g, '-')
    .replace(/[-]{2,}/g, '-');
  if (str[0] === '-') str = str.substr(1);
  if (str[str.length - 1] === '-') str = str.substr(0, str.length - 1);
  return str;
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

  function parseCode() {
    mdContent = mdContent
      .replace(/<pre><code([ ]?)([a-z]*)>([^<]*)<\/code><\/pre>/g, (original, $1, lang, code) => {
        let trimSpaces = code.match(/[^ ^\n]/);
        code = code
          .trim()
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')

        if (trimSpaces && trimSpaces.index > 0) {
          const trimSpacesRE = new RegExp(`\n[\ ]{${trimSpaces.index - 1}}`, 'g')
          code = code.replace(trimSpacesRE, '\n');
        }
        let highlighted = highlight(code, lang);
        highlighted = highlighted.replace(/[\n]/g, '<br>');
        return `<pre><code>${highlighted}</code></pre>`
      });
    if (mdContent.indexOf('{{#code') >= 0) parseCode();
  }
  parseCode();

  mdContent = mdContent
    .replace(/\n## ([^\n]*)/g, function (str, found) {
      index.push(`* [${found}](#${alias(found)})`);
      return `\n## <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n### ([^\n]*)/g, function (str, found) {
      return `\n### <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n#### ([^\n]*)/g, function (str, found) {
      return `\n#### <a name="${alias(found)}"></a>[${found}](#${alias(found)})`
    })
    .replace(/\n##### ([^\n]*)/g, function (str, found) {
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
