# Base16 Mixer
Mix colors from two Base16 Color Schemes

##### Usage
b16m will mix the colors from the two schemes and output the resulting mixed scheme as YAML in the current working directory.
b16m joins the Names and Authors of the two schemes.

Mix the `Default` and `Monokai` Base16 Schemes:

`b16m "Default.yml","Monokai.yml" // Outputs "Default - Monokai.yml"`
