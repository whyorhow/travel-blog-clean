const fs = require("fs");
const path = require("path");

function tokenize(d) {
  return d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
}

function pathBBoxFromTokens(pathD) {
  const tokens = tokenize(pathD.replace(/\s+/g, " "));
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const mark = (px, py) => {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  };
  const read = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    const t = tokens[i];
    if (/^[a-zA-Z]$/.test(t)) {
      cmd = t;
      i++;
    }
    switch (cmd) {
      case "M":
        x = read();
        y = read();
        mark(x, y);
        cmd = "L";
        break;
      case "m":
        x += read();
        y += read();
        mark(x, y);
        cmd = "l";
        break;
      case "H":
        x = read();
        mark(x, y);
        break;
      case "h":
        x += read();
        mark(x, y);
        break;
      case "V":
        y = read();
        mark(x, y);
        break;
      case "v":
        y += read();
        mark(x, y);
        break;
      case "L":
        x = read();
        y = read();
        mark(x, y);
        break;
      case "l":
        x += read();
        y += read();
        mark(x, y);
        break;
      case "C": {
        const x1 = read();
        const y1 = read();
        const x2 = read();
        const y2 = read();
        const x3 = read();
        const y3 = read();
        mark(x1, y1);
        mark(x2, y2);
        mark(x3, y3);
        x = x3;
        y = y3;
        break;
      }
      case "c": {
        const dx1 = read();
        const dy1 = read();
        const dx2 = read();
        const dy2 = read();
        const dx = read();
        const dy = read();
        mark(x + dx1, y + dy1);
        mark(x + dx2, y + dy2);
        x += dx;
        y += dy;
        mark(x, y);
        break;
      }
      default:
        i++;
        break;
    }
  }
  if (!Number.isFinite(minX)) return null;
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

const file = process.argv[2] || "public/assets/Filmstrip-3H-custom-01.svg";
const svg = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
console.log("viewBox", vb);

const paths = [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)];
let overall = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
paths.forEach((m, idx) => {
  const b = pathBBoxFromTokens(m[1]);
  if (!b) return;
  overall.minX = Math.min(overall.minX, b.minX);
  overall.minY = Math.min(overall.minY, b.minY);
  overall.maxX = Math.max(overall.maxX, b.maxX);
  overall.maxY = Math.max(overall.maxY, b.maxY);
  console.log(`path ${idx}`, b);
});
console.log("overall content bounds", overall);
console.log("viewBox vs content overflow", {
  left: vb[0] - overall.minX,
  top: vb[1] - overall.minY,
  right: overall.maxX - (vb[0] + vb[2]),
  bottom: overall.maxY - (vb[1] + vb[3]),
});
