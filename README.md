# aurelia-cli
Aurelia CLI tool

# example `Aureliafile`

```javascript
module.exports = function(aurelia) {
  aurelia.bundleConfig({
    tmpl: {
      patterns: [
        'dist/*.html'
      ],
      baseUrl: './'
    },
    js: {
      moduleExpression: 'aurelia-bootstrapper + dist/**/* + github:aurelia/history-browser@0.2.3 + github:aurelia/templating-binding@0.8.4 + github:aurelia/templating-resources@0.8.4 + github:aurelia/templating-router@0.9.2 + github:aurelia/event-aggregator@0.2.2',
      fileName: 'build.js',
      options: {
        inject: true
      }
    }
  });
}
```
