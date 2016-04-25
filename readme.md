# Base16 Mixer
Mix colors from two Base16 Color Schemes

##### Usage

`b16m(scheme1Name=Default, scheme2Name=Default, [asYaml=false])`

Arguments:

* `scheme1Name`: The name of the first base16 scheme to mix
* `scheme2Name`: The name of the second base16 scheme to mix
* `asYaml`: When set to true, returns the mixed scheme as YAML

**Command Line**

`index.js <scheme 1 name> <scheme 2 name>`

Mixed schemes are automatically written to the current directory

Run `batch.js` to mix all the base16 schemes and write the mixed schemes to
an `output` directory (results in 1275 schemes)

**In JavaScript**

```javascript
  var b16m = require('./b16m.js');

  var mixed = b16m('Default', 'Monokai');
```
