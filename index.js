var program = require('commander');
var bundler = require('./lib/bundle');

function Aurelia(env) {
  this.env = env;
}

Aurelia.prototype.bundleConfig = function(config) {
  this.bundleConfig = config;
}

Aurelia.prototype.run = function(argv) {
  var self = this;

  program
    .version('0.0.1');

  program
    .command('bundle')
    .description('run bundle command')
    .action(function(options) {
      var templateBundleConfig = self.bundleConfig.tmpl;
      var jsBundleConfig = self.bundleConfig.js;

      bundler.bundleTemplate(templateBundleConfig);
      bundler.bundleJs(jsBundleConfig);
    });

  program
    .command('new')
    .action(function(options) {
      console.log('set a new aurelia project');
    });

  program.parse(argv);
}

module.exports = Aurelia;
