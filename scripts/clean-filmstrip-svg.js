const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "../public/assets/Filmstrip-V1.svg");
let svg = fs.readFileSync(svgPath, "utf8");

svg = svg.replace(/<style[\s\S]*?<\/style>/, "");
svg = svg.replace(/<path class="st0"[\s\S]*?\/>/g, "");

const mainPath = svg.match(/<path d="M0\.5,1v106\.6[\s\S]*?<\/path>/);
if (mainPath) {
  svg = svg.replace(
    mainPath[0],
    mainPath[0].replace("<path d=", '<path fill="#0a0a0a" fill-rule="evenodd" d=')
  );
}

fs.writeFileSync(svgPath, svg);
console.log("Cleaned Filmstrip-V1.svg");
