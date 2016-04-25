if (!process.argv[3]) {
  console.log('Usage:\n\tindex.js <scheme 1> <scheme 2>\n\tindex.js "atelier heath" google');
  process.exit(1);
}

var b16m = require('./b16m');
var fs = require('fs');
var yaml = require('js-yaml');

var mixedScheme = b16m(process.argv[2], process.argv[3]);
fs.writeFileSync('./' + mixedScheme.scheme + '.yml', yaml.dump(mixedScheme));
