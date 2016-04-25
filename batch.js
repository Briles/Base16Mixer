(function () {
  'use strict';

  var b16m = require('./b16m');
  var fs = require('fs');
  var includes = require('lodash.includes');
  var schemes = require('./schemes');
  var yaml = require('js-yaml');

  function run() {
    var finished = [];
    for (var scheme in schemes) {
      for (var scheme2 in schemes) {
        var mixedScheme = b16m(scheme, scheme2);
        var mixedSchemeName = mixedScheme.scheme.toLowerCase();
        if (!includes(finished, mixedSchemeName) && scheme !== scheme2) {
          console.log(`Merging ${scheme} with ${scheme2}`);
          fs.writeFile('./output/' + mixedScheme.scheme + '.yml', yaml.dump(mixedScheme));
          finished.push(mixedSchemeName);
        }
      }
    }
  }

  fs.mkdir('./output', function (err) {
    if (err && err.code !== 'EEXIST') process.exit(1);
    run();
  });

}());
