(function () {
  'use strict';

  module.exports = function (scheme1, scheme2, asYaml) {

    var clone = require('lodash.clone');
    var mergeWith = require('lodash.mergewith');
    var schemes = require('./schemes');
    var sortedUniq = require('lodash.sorteduniq');
    var tinycolor = require('tinycolor2');
    var yaml = require('js-yaml');

    asYaml = asYaml || false;

    function fetchScheme(name) {
      return schemes[(name || 'default').toLowerCase()];
    }

    var mergedScheme = mergeWith(clone(fetchScheme(scheme1)), fetchScheme(scheme2), function (a, b, key) {
      var mergedValue;
      var objPair = [a, b];

      if (key === 'scheme' || key === 'author') {
        mergedValue = sortedUniq(objPair.sort()).join(' - ');
      } else {
        mergedValue = tinycolor.mix.apply(tinycolor, objPair).toHex();
      }

      return mergedValue;
    });

    return asYaml ? yaml.dump(mergedScheme) : mergedScheme;
  };
}());
