var program = require('commander');
var bundler = require('./lib/bundle');

function Aurelia(env) {
  this.env = env;
}

Aurelia.prototype.run = function(argv) {
  var self = this;

  program
    .version('0.0.1');

  program
    .command('bundle')
    .description('run bundle command')
    .action(function(options) {
       bundler.bundleTmpl();
    });

  program
    .command('*')
    .action(function(env) {
      console.log('deploying "%s"', env);
    });

  program.parse(argv);
}

module.exports = Aurelia;
