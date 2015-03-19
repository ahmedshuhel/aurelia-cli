var assert = require('assert');
var utils = require('../lib/bundle');
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

  it('sets the path attribute to template', function(){
    var $ = whacko.load(template);

    bundler.setId($, 'dist/navbar');
    assertId($);
  });

  function assertId($){
     assert.equal($('#dist\\/navbar').attr('id'), 'dist/navbar');
  }
})
