const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../public/assets");
const outJson = path.join(__dirname, "../src/assets/filmstripMaskPaths.json");
const files = [
  { file: "Filmstrip-3H.svg", count: 3 },
  { file: "Filmstrip-4H.svg", count: 4 },
  { file: "Filmstrip-5H.svg", count: 5 },
  { file: "Filmstrip-6H.svg", count: 6 },
];

const paths = {};

for (const { file, count } of files) {
  const src = fs.readFileSync(path.join(assetsDir, file), "utf8");
  const pathMatch = src.match(/<path[^>]+d="([^"]+)"/);
  if (!pathMatch) {
    console.error("No path in", file);
    continue;
  }

  const viewBox = src.match(/viewBox="([^"]+)"/)[1];
  paths[count] = { pathD: pathMatch[1], viewBox };
}

fs.writeFileSync(outJson, `${JSON.stringify(paths, null, 2)}\n`);
console.log("Wrote", path.relative(process.cwd(), outJson));
