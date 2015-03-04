var JS = 'script:not([type]), script[type="text/javascript"]';
var URL_ATTR = ['href', 'src', 'action', 'style'];

module.exports = {
  EOL: require('os').EOL,
  ABS_URL: /(^\/)|(^#)|(^[\w-\d]*:)/,
  REMOTE_ABS_URL: /(^http[s]?:)|(^\/\/)/,
  IMPORTS: 'link[rel="import"][href]',
  AURELIA_IMPORTS: 'import[src]',
  URL: /url\([^)]*\)/g,
  URL_ATTR: URL_ATTR,
  URL_ATTR_SEL: '[' + URL_ATTR.join('],[') + ']',
  URL_TEMPLATE: '{{.*}}',
  JS: JS,
  JS_SRC: JS.split(',').map(function(s){ return s + '[src]'; }).join(','),
  JS_INLINE: JS.split(',').map(function(s) { return s + ':not([src])'; }).join(','),
  CSS: 'style:not([type]), style[type="text/css"]',
};

