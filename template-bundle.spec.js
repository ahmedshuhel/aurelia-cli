var assert = require('assert');
var utils = require('./utils');
var whacko = require('whacko');

describe('template bundle', function() {
  var template =
    ' <template> ' +
    '  <import from="./nav-bar"></import> ' +
    '  <import from="./side-bar"></import> ' +
    '  <nav-bar router.bind="router"></nav-bar> ' +
    '  <div class="page-host"> ' +
    '   <router-view></router-view> ' +
    '  </div> ' +
    ' </template> ';

  it('extracts imports from the template', function() {
    var $ = whacko.load(template);
    var imports = utils.searchImports($);
    assert.equal(imports.length, 2);
  });

  it('returns the template paths', function() {
    var $ = whacko.load(template);
    var imports = utils.getTemplatePaths($);
    assert.equal(imports[1], './side-bar.html');
    assert.equal(imports[0], './nav-bar.html');
  });

})
