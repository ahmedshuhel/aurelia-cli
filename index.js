var glob = require('glob');
var whacko = require('whacko');
var constants = require('./constants');
var fs = require('fs');
var read = {};

bundle();

function bundle() {
  // reset shared buffers
  read = {};
  var templates = [];

  $ = whacko.load('<html><head></head><body></body></html>');
  var files = glob.sync('dist/*.html', {});

  files.forEach(function(t) {
    var $$ = whacko.load(readFile(t));
    var template = $$('head').html();
    templates.push(template);
  });
  var content = templates.join('\n');


  $('body').prepend(content);
  fs.writeFileSync('bundle.html', $.html(), 'utf8');
}

function readFile(file) {
  var content = fs.readFileSync(file, 'utf8');
  return content.replace(/^\uFEFF/, '');
}


function concat(filename) {
  if (!read[filename]) {
    read[filename] = true;

    var $ = whacko.load(readFile(filename));
    return $;

  } else if (options.verbose) {
    console.log('Dependency deduplicated');
  }
}

function processImports() {
  var bodyContent = [];

  searchAll($, constants.AURELIA_IMPORTS).each(function() {
    var el = $(this);
    var href = el.attr('src') + '.html';
    if (!excludeImport(href)) {
      var rel = href;
      var inputPath = path.dirname(options.input);
      if (constants.ABS_URL.test(rel)) {
        var abs = path.resolve(inputPath, path.join(options.abspath, rel));
        rel = path.relative(options.outputDir, abs);
      }
      var $$ = concat(path.resolve(options.outputDir, rel));
      if (!$$) {
        // remove import link
        el.remove();
        return;
      }
      // append import document head to main document head
      el.replaceWith($$('head').html());
      var bodyHTML = $$('body').html();
      // keep the ordering of the import body in main document, before main document's body
      bodyContent.push(bodyHTML);
    } else if (!options.keepExcludes) {
      // if the path is excluded for being absolute, then the import link must remain
      var absexclude = options.abspath ? constants.REMOTE_ABS_URL : constants.ABS_URL;
      if (!absexclude.test(href)) {
        el.remove();
      }
    }
  });
  // prepend the import document body contents to the main document, in order
  var content = bodyContent.join('\n');
  // hide import body content in the main document
  if (mainDoc && content) {
    content = '<div hidden>' + content + '</div>';
  }
  $('body').prepend(content);
}
