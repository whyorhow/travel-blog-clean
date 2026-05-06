const fs = require('fs');
const src = fs.readFileSync('src/components/HandwritingTagline.js', 'utf8');
const start = src.indexOf('const pathData = "') + 18;
const end = src.indexOf('";\n\n  return', start);
const path = src.slice(start, end);
fs.writeFileSync('src/components/taglinePathData.js', `export const taglinePathData = "${path}";\n`);
console.log('Written', path.length, 'chars');
