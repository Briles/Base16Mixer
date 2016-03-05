(function () {
  'use strict';

  var b16m = function (schemes) {
    // Dependencies
    const fs = require('fs');
    const path = require('path');
    const tinycolor = require('tinycolor2');
    const yaml = require('js-yaml');
    const _ = require('lodash');

    if (typeof (schemes) === 'undefined') {
      console.log('Usage: b16m <Scheme 1>,<Scheme 2>');
      process.exit(1);
    }

    schemes = schemes.split(',');
    var numSchemes = schemes.length;

    if (numSchemes !== 2) {
      throw new Error(`Missing ${2 - numSchemes} schemes to mix`);
    }

    var schemeObjects = [];
    schemes.forEach(function (scheme) {
      schemeObjects.push(loadScheme(scheme));
    });

    var mixedScheme = _.clone(schemeObjects[0]);

    _.mergeWith(mixedScheme, schemeObjects[1], function (a, b, key) {
      var mergedValue;
      var objPair = [a, b];

      if (key === 'scheme' || key === 'author') {
        mergedValue = _(objPair).uniq().sortBy().join(' - ');
      } else {
        mergedValue = tinycolor.mix.apply(null, objPair).toHex();
      }

      return mergedValue;
    });

    var destPath = path.join(process.cwd(), '/output/', mixedScheme.scheme + '.yml');

    fs.writeFile(destPath, yaml.dump(mixedScheme), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log(`Scheme saved to "${destPath}`);
    });

    function loadScheme(schemePath) {
      var raw = fs.readFileSync(path.resolve(schemePath), 'utf8');

      return yaml.safeLoad(raw, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

  };

  if (require.main !== module && typeof module !== 'undefined' && module.exports) {
    module.exports = b16m;
  } else {
    b16m(process.argv[2]);
  }

}());
