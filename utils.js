function concatTemplates($, context, query, matches) {
  $('template, ' + query, context).each(function() {
    if (this.name === 'template') {
      concatTemplates($, this.children[0], query, matches);
    } else {
      matches.push(this);
    }
  });
}

function search($, query) {
  var matches = [];
  concatTemplates($, null, query, matches);
  return $(matches);
}

function searchImports($) {
  return search($, 'import[from]');
}

function getTemplatePaths($) {
  var paths = [];
  searchImports($).each(function() {
    var el = $(this);
    var p = el.attr('from') + '.html';
    paths.push(p);
  });
  return paths;
}

module.exports = {
  search : search,
  searchImports: searchImports,
  getTemplatePaths: getTemplatePaths
}
