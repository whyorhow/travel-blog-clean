const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "../public/assets/Filmstrip-4H-custom-01.svg");
const svg = fs.readFileSync(svgPath, "utf8");
const d = svg.match(/class="cls-5" d="([^"]+)/)[1];

function tokenize(pathD) {
  return pathD.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
}

function simulate(pathD) {
  const tokens = tokenize(pathD);
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  const slots = [];

  const read = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const t = tokens[i];
    if (/^[a-zA-Z]$/.test(t)) {
      cmd = t;
      i++;
    }

    const x0 = x;
    const y0 = y;

    switch (cmd) {
      case "M":
        x = read();
        y = read();
        cmd = "L";
        break;
      case "m":
        x += read();
        y += read();
        cmd = "l";
        break;
      case "H":
        x = read();
        break;
      case "h": {
        const dx = read();
        x += dx;
        if (Math.abs(dx) >= 170 && Math.abs(dx) <= 190) {
          const nextCmd = tokens[i];
          if (nextCmd === "v" || nextCmd === "V") {
            i++;
            const dy = read();
            y += dy;
            if (Math.abs(dy) >= 110 && Math.abs(dy) <= 130) {
              slots.push({
                x: Math.round((dx > 0 ? x0 : x) * 100) / 100,
                y: Math.round((dy > 0 ? y0 : y) * 100) / 100,
                w: Math.round(Math.abs(dx)),
                h: Math.round(Math.abs(dy)),
              });
            }
            continue;
          }
        }
        break;
      }
      case "V":
        y = read();
        break;
      case "v":
        y += read();
        break;
      case "L":
        x = read();
        y = read();
        break;
      case "l":
        x += read();
        y += read();
        break;
      case "C":
        i += 6;
        break;
      case "c":
        i += 6;
        break;
      case "Z":
      case "z":
        break;
      default:
        i++;
        break;
    }
  }

  const uniq = [];
  for (const s of slots) {
    if (s.y > 0 && s.y < 200 && !uniq.some((u) => Math.abs(u.x - s.x) < 2 && Math.abs(u.y - s.y) < 2)) {
      uniq.push(s);
    }
  }
  return uniq.sort((a, b) => a.x - b.x);
}

console.log(JSON.stringify(simulate(d), null, 2));
