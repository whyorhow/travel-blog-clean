/**
 * Extract frame slot coordinates from registration markers in a custom filmstrip SVG.
 *
 * Run: node scripts/extract-filmstrip-template.js Filmstrip-4H-custom-01.svg 4HCustom01
 */
const fs = require("fs");
const path = require("path");

const REGISTRATION_FILLS = new Set([
  "#00e676",
  "#00ff00",
  "#ff00ff",
]);

const assetsDir = path.join(__dirname, "../public/assets");
const templatesDir = path.join(__dirname, "../src/assets/filmstripTemplates");

function parseViewBox(svg) {
  const m = svg.match(/viewBox="([^"]+)"/);
  if (!m) throw new Error("No viewBox on SVG");
  const [x, y, w, h] = m[1].trim().split(/\s+/).map(Number);
  return { viewBoxX: x, viewBoxY: y, viewBoxW: w, viewBoxH: h };
}

function parseRegistrationClasses(svg) {
  const classes = new Set();
  const re = /\.([\w-]+)\s*\{[^}]*fill:\s*(#[0-9a-fA-F]{3,8})/gi;
  let m;
  while ((m = re.exec(svg))) {
    if (REGISTRATION_FILLS.has(m[2].toLowerCase())) {
      classes.add(m[1]);
    }
  }
  return classes;
}

function parseAttrs(attrString) {
  const get = (name) => {
    const a = attrString.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
    return a ? a[1] : null;
  };
  const dMatch = attrString.match(/\bd=["']([^"']+)["']/is);
  return {
    className: get("class") || "",
    id: get("id") || "",
    fill: (get("fill") || "").toLowerCase(),
    dataFrame: get("data-frame"),
    x: parseFloat(get("x") || "0"),
    y: parseFloat(get("y") || "0"),
    w: parseFloat(get("width") || "0"),
    h: parseFloat(get("height") || "0"),
    d: dMatch ? dMatch[1].replace(/\s+/g, " ").trim() : "",
  };
}

function hasRegistrationClass(className, registrationClasses) {
  return className.split(/\s+/).some((c) => registrationClasses.has(c));
}

function isRegistrationMarker(attrs, registrationClasses) {
  return (
    /frame-slot/i.test(attrs.className) ||
    /frame-slot/i.test(attrs.id) ||
    attrs.dataFrame != null ||
    REGISTRATION_FILLS.has(attrs.fill) ||
    hasRegistrationClass(attrs.className, registrationClasses)
  );
}

function tokenize(pathD) {
  return pathD.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
}

/** Illustrator rect paths: M{x},{y}h-{w}…V{top} or M{x},{y}c…,{-w},0…V{top} */
function pathRectBBox(pathD) {
  const d = pathD.replace(/\s+/g, " ").trim();
  const move = d.match(/^[Mm]([\d.]+),([\d.]+)/);
  if (!move) return null;

  const anchorX = parseFloat(move[1]);
  const anchorY = parseFloat(move[2]);
  const vAbsMatch = d.match(/[V]([\d.]+)/);
  const topY = vAbsMatch ? parseFloat(vAbsMatch[1]) : null;
  const cMatch = d.match(/[cC]([-\d.,\s]+)/);

  const hNeg = d.match(/[hH]-([\d.]+)/);
  if (hNeg && topY != null) {
    const w = parseFloat(hNeg[1]);
    return {
      x: Math.round((anchorX - w) * 100) / 100,
      y: Math.round(topY * 100) / 100,
      w: Math.round(w * 100) / 100,
      h: Math.round((anchorY - topY) * 100) / 100,
    };
  }

  if (cMatch && topY != null) {
    const nums = cMatch[1].match(/-?[\d.]+/g)?.map(Number) || [];
    const width = nums.length >= 6 ? Math.abs(nums[4]) : Math.abs(nums[nums.length - 2] || 0);
    if (width > 0) {
      return {
        x: Math.round((anchorX - width) * 100) / 100,
        y: Math.round(topY * 100) / 100,
        w: Math.round(width * 100) / 100,
        h: Math.round((anchorY - topY) * 100) / 100,
      };
    }
  }

  const vRel = d.match(/[vV](-?[\d.]+)/);
  if (!vRel) return null;

  const height = Math.abs(parseFloat(vRel[1]));
  let width = height;
  if (cMatch) {
    const nums = cMatch[1].match(/-?[\d.]+/g)?.map(Number) || [];
    if (nums.length >= 6) width = Math.abs(nums[4]);
    else if (nums.length >= 2) width = Math.abs(nums[nums.length - 2]);
  }

  return {
    x: Math.round((anchorX - width) * 100) / 100,
    y: Math.round((anchorY - height) * 100) / 100,
    w: Math.round(width * 100) / 100,
    h: Math.round(height * 100) / 100,
  };
}

function pathBBoxFromTokens(pathD) {
  const d = pathD.replace(/\s+/g, " ").trim();
  const tokens = tokenize(d);
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
        const x1 = x + dx1;
        const y1 = y + dy1;
        const x2 = x + dx2;
        const y2 = y + dy2;
        x += dx;
        y += dy;
        mark(x1, y1);
        mark(x2, y2);
        mark(x, y);
        break;
      }
      case "Z":
      case "z":
        break;
      default:
        i++;
        break;
    }
  }

  if (!Number.isFinite(minX)) return null;
  return {
    x: Math.round(minX * 100) / 100,
    y: Math.round(minY * 100) / 100,
    w: Math.round((maxX - minX) * 100) / 100,
    h: Math.round((maxY - minY) * 100) / 100,
  };
}

/** Full path extents — matches filled green registration shape in Illustrator */
function pathBBox(pathD) {
  const rect = pathRectBBox(pathD);
  const tokens = pathBBoxFromTokens(pathD);
  const sane = (box) => box && box.w > 10 && box.h > 10;
  if (sane(rect)) return rect;
  if (sane(tokens)) return tokens;
  return rect || tokens;
}

/** Extra tuck beyond rounded corners (viewBox units) — covers AA + film lip overlap */
const APERTURE_PAD = { top: 0.8, left: 0.8, right: 0.4, bottom: 0.4 };

/** Leftmost frame — rail/bevel eats more of the top-left corner */
const FIRST_FRAME_NUDGE = { top: 1, left: 0.5 };

/** Illustrator rounded-rect paths use c…,-1-0.4-1-1 style corners (~1 unit radius) */
function parseCornerRadius(pathD) {
  if (/,0-1-0\.4-1-1/i.test(pathD) || /,-1-0\.4-1-1/i.test(pathD)) return 1;
  return 0;
}

function applyApertureInset(box, pathD = "") {
  const r = parseCornerRadius(pathD);
  const top = r + APERTURE_PAD.top;
  const left = r + APERTURE_PAD.left;
  const right = r + APERTURE_PAD.right;
  const bottom = r + APERTURE_PAD.bottom;
  return {
    x: Math.round((box.x + left) * 100) / 100,
    y: Math.round((box.y + top) * 100) / 100,
    w: Math.round((box.w - left - right) * 100) / 100,
    h: Math.round((box.h - top - bottom) * 100) / 100,
  };
}

function parseFrameSlots(svg) {
  const registrationClasses = parseRegistrationClasses(svg);
  const slots = [];

  const rectRe = /<rect\b[^>]*\/?>/gi;
  let m;
  while ((m = rectRe.exec(svg))) {
    const attrs = parseAttrs(m[0]);
    if (!isRegistrationMarker(attrs, registrationClasses)) continue;
    if (!(attrs.w > 0 && attrs.h > 0)) continue;
    slots.push({
      x: Math.round(attrs.x * 100) / 100,
      y: Math.round(attrs.y * 100) / 100,
      w: Math.round(attrs.w * 100) / 100,
      h: Math.round(attrs.h * 100) / 100,
      clipD: `M${attrs.x},${attrs.y}h${attrs.w}v${attrs.h}h${-attrs.w}z`,
      _sort: attrs.dataFrame ? parseInt(attrs.dataFrame, 10) : attrs.x,
    });
  }

  const pathRe = /<path\b[\s\S]*?\/?>/gi;
  while ((m = pathRe.exec(svg))) {
    const attrs = parseAttrs(m[0]);
    if (!isRegistrationMarker(attrs, registrationClasses) || !attrs.d) continue;
    const box = pathBBox(attrs.d);
    if (!box || !(box.w > 0 && box.h > 0)) continue;
    slots.push({
      ...box,
      clipD: attrs.d.replace(/\s+/g, " ").trim(),
      _sort: attrs.dataFrame ? parseInt(attrs.dataFrame, 10) : box.x,
    });
  }

  slots.sort((a, b) => a._sort - b._sort);
  return slots.map(({ x, y, w, h, clipD }) => ({ x, y, w, h, clipD }));
}

function stripRegistrationStyles(svg, registrationClasses) {
  let out = svg;
  for (const cls of registrationClasses) {
    out = out.replace(new RegExp(`\\.${cls}\\s*\\{[^}]*\\}\\s*`, "gi"), "");
  }
  return out;
}

function stripRegistrationMarkers(svg) {
  const registrationClasses = parseRegistrationClasses(svg);
  let out = svg;

  // Illustrator exports may use <image …></image> or <image … />
  out = out.replace(/<image\b[\s\S]*?<\/image>\s*/gi, "");
  out = out.replace(/<image\b[^>]*\/>\s*/gi, "");
  out = out.replace(/<\/image>\s*/gi, "");

  out = out.replace(/<rect\b[\s\S]*?\/?>\s*/gi, (match) => {
    const attrs = parseAttrs(match);
    return isRegistrationMarker(attrs, registrationClasses) ? "" : match;
  });

  out = out.replace(/<path\b[\s\S]*?\/?>\s*/gi, (match) => {
    const attrs = parseAttrs(match);
    return isRegistrationMarker(attrs, registrationClasses) ? "" : match;
  });

  out = stripRegistrationStyles(out, registrationClasses);
  return out;
}

const ILLUSTRATOR_CLASS_SCOPES = {
  st0: "base",
  st1: "gloss-a",
  st2: "gloss-cut",
  st3: "gloss-b",
  st4: "gloss-film",
};

/** Scope ids/classes so multiple strips on the wall cannot clash (.st2 = green on 4H, gradient on 3H). */
function finalizeProductionSvg(svg, templateId) {
  const slug = `fs-${templateId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`;
  let out = stripRegistrationMarkers(svg);

  // Hidden Illustrator guide layers (display:none, often st1 on 5H exports)
  out = out.replace(/<path[^>]*class="st1"[^>]*\/?>\s*/gi, "");
  out = out.replace(/\.st1\s*\{[^}]*display:\s*none[^}]*\}\s*/gi, "");

  out = out.replace(/\.[\w-]+\s*\{[^}]*#00[eE]676[^}]*\}\s*/gi, "");
  out = out.replace(/fill:\s*#00[eE]676\s*;?/gi, "");

  const ids = [...new Set([...out.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))];
  for (const oldId of ids) {
    const newId = `${slug}-${oldId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    out = out.split(`id="${oldId}"`).join(`id="${newId}"`);
    out = out.split(`url(#${oldId})`).join(`url(#${newId})`);
  }

  for (const [illCls, scope] of Object.entries(ILLUSTRATOR_CLASS_SCOPES)) {
    const scoped = `${slug}-${scope}`;
    out = out.replace(new RegExp(`\\.${illCls}(\\s*\\{)`, "g"), `.${scoped}$1`);
    out = out.replace(new RegExp(`class="${illCls}"`, "g"), `class="${scoped}"`);
  }

  // Illustrator sometimes points gloss-b at a different id than the vertical film gradient element
  const filmGrad =
    out.match(
      new RegExp(
        `<linearGradient id="(${slug}-[^"]+)"[^>]*x1="([\\d.]+)"[^>]*x2="\\2"[^>]*y2="(27[0-9]|28[0-9]|29[0-5])`,
      ),
    ) || out.match(new RegExp(`<linearGradient id="(${slug}-[^"]+)"[^>]*y2="276\\.5"`));
  if (filmGrad) {
    const gradId = filmGrad[1];
    const glossRule = `{fill-rule:evenodd;clip-rule:evenodd;fill:url(#${gradId});}`;
    const glossTarget = out.includes(`${slug}-gloss-film`) ? `${slug}-gloss-film` : `${slug}-gloss-b`;
    out = out.replace(
      new RegExp(`\\.${glossTarget}\\{[^}]*\\}`, "g"),
      `.${glossTarget}${glossRule}`,
    );
  }

  // Illustrator exports may reference gradient ids that were never defined
  out = out.replace(
    new RegExp(`\\.${slug}-gloss-b\\{fill:url\\(#[^)]*\\);\\}\\s*`, "g"),
    (rule) => (rule.includes(`#${slug}-`) ? rule : ""),
  );
  out = out.replace(/\.st5\s*\{[^}]*\}\s*/gi, "");

  return out;
}

/** Per-template extras not derived from registration markers */
const TEMPLATE_EXTRAS = {
  "4HCustom01": {
    pinAnchors: {
      left: { xPct: 6.5, yPct: 6.5 },
      right: { xPct: 86.5, yPct: 6.5 },
    },
  },
  "4HCustom02": {
    pinAnchors: {
      left: { xPct: 6.5, yPct: 6.5 },
      right: { xPct: 86.5, yPct: 6.5 },
    },
  },
  "3HCustom01": {
    pinAnchors: {
      left: { xPct: 6.5, yPct: 6.5 },
      right: { xPct: 86.5, yPct: 6.5 },
    },
  },
  "6HCustom01": {
    pinAnchors: {
      left: { xPct: 6.5, yPct: 6.5 },
      right: { xPct: 86.5, yPct: 6.5 },
    },
  },
  "5HCustom01": {
    pinAnchors: {
      left: { xPct: 6.5, yPct: 6.5 },
      right: { xPct: 86.5, yPct: 6.5 },
    },
  },
};

function main() {
  const file = process.argv[2] || "Filmstrip-4H-custom-01.svg";
  const templateId = process.argv[3] || "4HCustom01";
  const svgPath = path.join(assetsDir, file);

  if (!fs.existsSync(svgPath)) {
    console.error(`Not found: ${svgPath}`);
    process.exit(1);
  }

  const svg = fs.readFileSync(svgPath, "utf8");
  const viewBox = parseViewBox(svg);
  const frameSlots = parseFrameSlots(svg);

  if (frameSlots.length === 0) {
    console.error(
      "No registration markers found.\n" +
        "Add green (#00E676) frame-slot markers to the SVG and re-run."
    );
    process.exit(1);
  }

  const meta = {
    id: templateId,
    assetSrc: `/assets/${file.replace(/\.svg$/, ".production.svg")}`,
    ...viewBox,
    frameCount: frameSlots.length,
    frameSlots,
    bakedChrome: true,
    ...(TEMPLATE_EXTRAS[templateId] ?? {}),
  };

  fs.mkdirSync(templatesDir, { recursive: true });
  const outJson = path.join(templatesDir, `${templateId}.json`);
  fs.writeFileSync(outJson, `${JSON.stringify(meta, null, 2)}\n`);

  const prodName = file.replace(/\.svg$/, ".production.svg");
  fs.writeFileSync(path.join(assetsDir, prodName), finalizeProductionSvg(svg, templateId));

  console.log(`Wrote ${outJson}`);
  console.log(`Wrote public/assets/${prodName}`);
  console.log(JSON.stringify(meta, null, 2));
}

main();
