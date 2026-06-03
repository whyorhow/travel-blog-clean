const fs = require("fs");
const path = require("path");

const files = ["Filmstrip-3H.svg", "Filmstrip-4H.svg", "Filmstrip-5H.svg", "Filmstrip-6H.svg"];

for (const file of files) {
  const svg = fs.readFileSync(path.join(__dirname, "../public/assets", file), "utf8");
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const pathMatch = svg.match(/<path[^>]+d="([^"]+)"/);
  const d = pathMatch[1];

  const re = /M(\d+(?:\.\d+)?),72c[^Z]*?v119[^Z]*?h(\d+(?:\.\d+)?)/gi;
  const frames = [];
  let m;
  while ((m = re.exec(d))) {
    frames.push({ x: +m[1], y: 72, w: +m[2], h: 121 });
  }

  console.log(
    JSON.stringify({
      file,
      viewBoxW: +vb[1],
      viewBoxH: +vb[2],
      frameCount: frames.length,
      frameSlots: frames,
    })
  );
}
