(function () {
  'use strict';

  // Dependencies
  const fs = require('fs');
  const path = require('path');
  const _ = require('lodash');
  const b16m = require('./b16m');

  var finished = [];

  var schemes = fs.readdirSync('./schemes').filter(function (file) {
    return path.extname(file) === '.yml';
  });

  schemes.forEach(function (scheme) {
    var scheme1 = scheme;

    schemes.filter(function (file) {
      if (!_.includes(finished, file) && file !== scheme) {
        return file;
      }
    }).forEach(function (scheme2) {
      var schemePaths = [scheme1, scheme2].map(function (schemepath) {
        return path.join('./schemes/', schemepath);
      }).join(',');

      console.log(`Merging ${scheme1} with ${scheme2}`);
      b16m(schemePaths);
    });

    finished.push(scheme);
  });

}());
