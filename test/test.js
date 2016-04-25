(function () {
  'use strict';

  var assert = require('chai').assert;
  var b16m = require('../b16m.js');
  var schemes = require('../schemes.js');

  var validYamlScheme = `scheme: Default
author: 'Chris Kempson (http://chriskempson.com)'
base00: '181818'
base01: '282828'
base02: '383838'
base03: '585858'
base04: b8b8b8
base05: d8d8d8
base06: e8e8e8
base07: f8f8f8
base08: ab4642
base09: dc9656
base0A: f7ca88
base0B: a1b56c
base0C: 86c1b9
base0D: 7cafc2
base0E: ba8baf
base0F: a16946
`;
  var validObjectScheme = b16m('Default', 'Default');

  describe('b16m()', function () {
    it('should remove duplicate names', function () {
      assert.equal(validObjectScheme.scheme, schemes.default.scheme);
    });

    it('should remove duplicate authors', function () {
      assert.equal(validObjectScheme.author, schemes.default.author);
    });

    it('should return base16 scheme as object', function () {
      assert.deepEqual(validObjectScheme, schemes.default);
    });

    it('should return base16 scheme as YAML', function () {
      assert.equal(b16m('Default', 'Default', true), validYamlScheme);
    });

    it('should return default scheme when scheme arguments are not defined', function () {
      assert.deepEqual(b16m(undefined, undefined), schemes.default);
    });
  });

}());
