"use strict"

let fs = require('fs');
let datei = fs.openSync('gruss.text', 'w');
fs.writeSync(datei, 'Hallo Welt.\n');
fs.closeSync(datei);
