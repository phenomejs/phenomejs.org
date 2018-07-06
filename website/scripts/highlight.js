const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');

loadLanguages(['jsx']);

function highlight(code, lang) {
  if (lang === 'js') lang = 'javascript';
  return Prism.highlight(code, Prism.languages[lang], lang)
}

module.exports = highlight;