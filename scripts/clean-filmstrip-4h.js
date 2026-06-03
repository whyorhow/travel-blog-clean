const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "../public/assets/Filmstrip-4H.svg");
const svg = fs.readFileSync(srcPath, "utf8");

const pathMatch = svg.match(/<path class="cls-2"[^>]+d="([^"]+)"/);
if (!pathMatch) {
  console.error("Could not find cls-2 path");
  process.exit(1);
}

const MIN_X = 125.36;
const MIN_Y = 14.06;
const WIDTH = 1236;
const HEIGHT = 267;

const cleaned = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="${MIN_X} ${MIN_Y} ${WIDTH} ${HEIGHT}">
  <defs>
    <style>
      .cls-1 {
        fill: #17181b;
      }
    </style>
  </defs>
  <path class="cls-1" fill-rule="evenodd" d="${pathMatch[1]}"/>
</svg>
`;

fs.writeFileSync(srcPath, cleaned);
console.log("Cleaned Filmstrip-4H.svg");
console.log(`viewBox="${MIN_X} ${MIN_Y} ${WIDTH} ${HEIGHT}"`);
console.log(
  "frameSlots",
  JSON.stringify(
    [
      { x: 21, y: 72, w: 180, h: 123 },
      { x: 225, y: 72, w: 179, h: 123 },
      { x: 429, y: 72, w: 178, h: 123 },
      { x: 633, y: 72, w: 178, h: 123 },
    ],
    null,
    2
  )
);
