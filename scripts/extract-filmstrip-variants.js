const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../public/assets");
const outJson = path.join(__dirname, "../src/assets/filmstripVariants.json");

function extractVariant(file, meta) {
  const svg = fs.readFileSync(path.join(assetsDir, file), "utf8");
  const pathMatch = svg.match(/<path[^>]+d="([^"]+)"/);
  if (!pathMatch) throw new Error(`No path in ${file}`);
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  return {
    ...meta,
    src: `/assets/${file}`,
    viewBoxX: viewBox[0],
    viewBoxY: viewBox[1],
    viewBoxW: viewBox[2],
    viewBoxH: viewBox[3],
    pathD: pathMatch[1],
    pathFillRule: meta.pathFillRule ?? "nonzero",
  };
}

const variants = {
  "4Hv2": extractVariant("Filmstrip-4Hv2.svg", {
    pathFillRule: "nonzero",
    frameCount: 4,
    frameSlots: [
      { x: 62, y: -58, w: 180, h: 121 },
      { x: 265, y: -58, w: 182, h: 121 },
      { x: 468, y: -58, w: 182, h: 121 },
      { x: 671, y: -60, w: 181, h: 121 },
    ],
  }),
};

fs.writeFileSync(outJson, `${JSON.stringify(variants, null, 2)}\n`);
console.log("Wrote", path.relative(process.cwd(), outJson));
