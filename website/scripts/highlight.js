const Prism = require('prismjs');

function highlight(code, lang) {
  let prismLang = lang;
  if (lang === 'js') lang = 'javascript';
  return Prism.highlight(code, Prism.languages[prismLang], prismLang)
}

module.exports = highlight;