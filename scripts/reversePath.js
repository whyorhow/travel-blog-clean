const fs = require('fs');
const { reverse } = require('svg-path-reverse');

const src = fs.readFileSync('src/components/taglinePathData.js', 'utf8');
const start = src.indexOf('"') + 1;
const end = src.lastIndexOf('"');
const path = src.slice(start, end);

const reversed = reverse(path);

fs.writeFileSync('src/components/taglinePathData.js', `export const taglinePathData = "${reversed}";\n`);
console.log('Reversed path written, length:', reversed.length);
