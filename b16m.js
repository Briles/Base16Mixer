(function () {
  'use strict';

  // Dependencies
  var fs = require('fs');
  var path = require('path');
  var tinycolor = require('tinycolor2');
  var yaml = require('js-yaml');
  var _ = require('lodash');

  var inputSchemes = process.argv[2];
  var tempScheme = {
    scheme: [],
    author: [],
    base00: [],
    base01: [],
    base02: [],
    base03: [],
    base04: [],
    base05: [],
    base06: [],
    base07: [],
    base08: [],
    base09: [],
    base0A: [],
    base0B: [],
    base0C: [],
    base0D: [],
    base0E: [],
    base0F: [],
  };
  var mixedScheme = {};

  if (typeof (inputSchemes) === 'undefined') {
    throw new Error('Usage: b16m <Scheme 1>,<Scheme 2>');
  }

  inputSchemes = inputSchemes.split(',');
  var numSchemes = inputSchemes.length;

  if (numSchemes !== 2) {
    throw new Error('Missing ' + (2 - numSchemes) + ' inputSchemes to mix');
  }

  inputSchemes.forEach(function (scheme) {
    var raw = fs.readFileSync(path.resolve(scheme), 'utf8');

    var contents = yaml.safeLoad(raw, function (err) {
      if (err) {
        return console.log(err);
      }
    });

    for (var prop in contents) {
      if (!contents.hasOwnProperty(prop)) {
        continue;
      }

      if (tempScheme[prop] === undefined) {
        throw new Error('"' + prop + '" not a valid Base16 scheme property');
      }

      tempScheme[prop].push(contents[prop]);
    }
  });

  for (var prop in tempScheme) {
    if (!tempScheme.hasOwnProperty(prop)) {
      continue;
    }

    if (prop === 'scheme' || prop === 'author') {
      mixedScheme[prop] = _(tempScheme[prop]).uniq().sortBy().join(' - ');
    } else {
      mixedScheme[prop] = tinycolor.mix.apply(null, tempScheme[prop]).toHex();
      console.log(tempScheme[prop][0] + ' + ' + tempScheme[prop][1] + ' --> ' + mixedScheme[prop]);
    }
  }

  var destPath = path.join(process.cwd(), '/output/', mixedScheme.scheme + '.yml');

  fs.writeFile(destPath, yaml.dump(mixedScheme), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('Scheme saved to "' + destPath + '"');
  });
}());
