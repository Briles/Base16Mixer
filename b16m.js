'use strict';

// Dependencies
var fs = require('fs'),
    path = require('path'),
    tinycolor = require("tinycolor2"),
    yaml = require('js-yaml');

// Utility Functions
var uniques = function(arr)
{
    var a = [];
    for (var i = 0, l = arr.length; i < l; i++)
    {
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
        {
            a.push(arr[i]);
        }
    }
    return a;
};

var inputSchemes = process.argv[2],
    tempScheme = {
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
        base0F: []
    },
    mixedScheme = {};

if (typeof(inputSchemes) === 'undefined') throw new Error('Usage: b16m <Scheme 1>,<Scheme 2>');

inputSchemes = inputSchemes.split(',');
var numSchemes = inputSchemes.length;

if (numSchemes != 2) throw new Error('Missing ' + (2 - numSchemes) + ' inputSchemes to mix');

for (var i = numSchemes - 1; i >= 0; i--)
{
    var contents = yaml.safeLoad(fs.readFileSync(path.resolve(inputSchemes[i]), 'utf8'), function(err)
    {
        if (err) return console.log(err);
        console.log('Scheme saved to "' + destPath + '"');
    });

    for (var prop in contents)
    {
        if (!contents.hasOwnProperty(prop)) continue;

        if (tempScheme[prop] === undefined) throw new Error('"' + prop + '" not a valid Base16 scheme property');
        tempScheme[prop].push(contents[prop]);
    }
}

for (var prop in tempScheme)
{
    if (!tempScheme.hasOwnProperty(prop)) continue;

    if (prop === 'scheme' || prop === 'author')
    {
        mixedScheme[prop] = uniques(tempScheme[prop]).join(' - ');
    }
    else
    {
        mixedScheme[prop] = tinycolor.mix.apply(null, tempScheme[prop]).toHex();
        console.log(tempScheme[prop][0] + ' + ' + tempScheme[prop][1] + ' --> ' + mixedScheme[prop]);
    }
}

var destPath = path.join(process.cwd(), mixedScheme.scheme + '.yml');

fs.writeFile(destPath, yaml.dump(mixedScheme), function(err)
{
    if (err) return console.log(err);
    console.log('Scheme saved to "' + destPath + '"');
});
