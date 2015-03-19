var glob = require('glob');
var whacko = require('whacko');
var fs = require('fs');
var path = require('path');
var api = require('jspm/api');

function bundleJs(config){
   api.bundle(config.moduleExpression, config.fileName, config.options);
}

function bundleTemplate(config) {
 // use chalk
  console.log('bundling templates ...');
 
  var templates = [];
  $ = whacko.load('<html><head></head><body></body></html>');
  
  var files = glob.sync(config.patterns[0], {});

  var baseUrl = config.baseUrl;

  files.forEach(function(t) {
    var $$ = whacko.load(readFile(t));
    var tp = t.replace(/.html$/, '');
    setId($$, tp);
    var template = $$('head').html();
    templates.push(template);
  });

  var content = templates.join('\n');

  $('body').prepend(content);
  fs.writeFileSync('bundle.html', $.html(), 'utf8');
}

function setId($, id){
  $('template').attr('id', id);
}

function readFile(file) {
  var content = fs.readFileSync(file, 'utf8');
  return content.replace(/^\uFEFF/, '');
}

module.exports = {
  bundleTemplate : bundleTemplate,
  bundleJs : bundleJs
}
