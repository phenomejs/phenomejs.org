const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');

loadLanguages(['jsx']);

// Extend JS
Prism.languages.javascript.keyword = /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|typeof|var|void|while|with|yield)\b/;
Prism.languages.javascript.context = /\b(?:this|self)\b/;
Prism.languages.javascript.literal = /\b(?:undefined|null)\b/;
Prism.languages.javascript['built-in'] = /\b(?:Number|String|Function|Boolean|Array|Symbol|Math|Date|RegExp|Map|Set|WeakMap|WeakSet|Object|JSON|Promise|Generator|Window|console|window|FormData)\b/;
Prism.languages.javascript['template-string'].inside.interpolation.inside.context = /\b(?:this|self)\b/;

// Extend JSX
Prism.languages.jsx.keyword = /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|typeof|var|void|while|with|yield)\b/;
Prism.languages.jsx.context = /\b(?:this|self)\b/;
Prism.languages.jsx.literal = /\b(?:undefined|null)\b/;
Prism.languages.jsx.script.inside.context = /\b(?:this|self)\b/;
Prism.languages.jsx['built-in'] = /\b(?:Number|String|Function|Boolean|Array|Symbol|Math|Date|RegExp|Map|Set|WeakMap|WeakSet|Object|JSON|Promise|Generator|Window|console|window|FormData)\b/;
Prism.languages.jsx['template-string'].inside.interpolation.inside.context = /\b(?:this|self)\b/;

function highlight(code, lang) {
  if (lang === 'js') lang = 'javascript';
  return Prism.highlight(code, Prism.languages[lang], lang)
}

module.exports = highlight;