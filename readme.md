# Base16 Mixer
Mix colors from two Base16 Color Schemes

##### Usage
b16m will mix the colors from the two schemes and output the resulting mixed scheme as YAML in the `output` directory.
The schemes' Names and Authors are joined by ` - `.
The schemes' Names will be sorted so no duplicate schemes are ever created.

Mix the `Default` and `Monokai` Base16 schemes using the command line:

`node b16m.js Default.yml Monokai.yml // Writes "Default - Monokai.yml" to output directory`

You can also `require` b16m for use in other scripts:

```js
var b16m = require('b16m');

// call b16m with two scheme paths as the parameters
// Does not currently return anything
b16m("Default.yml", "Monokai.yml") // Writes "Default - Monokai.yml" to output directory
```

Run `batch.js` to mix all schemes in the `schemes` directory
