const fs = require('fs');
const path = require('path');
const { ROUTE_META, canonicalFor } = require('../src/config/staticRouteMeta');

const BUILD_DIR = path.join(__dirname, '../build');
const INDEX_PATH = path.join(BUILD_DIR, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectMeta(html, { title, description, canonical }) {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<meta property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  out = out.replace(
    /<meta property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<meta property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  out = out.replace(
    /<meta name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  if (out.includes('rel="canonical"')) {
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, canonicalTag);
  } else {
    out = out.replace('</head>', `  ${canonicalTag}\n</head>`);
  }
  return out;
}

function writeRouteHtml(routePath, html) {
  const dir =
    routePath === '/'
      ? BUILD_DIR
      : path.join(BUILD_DIR, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function main() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('inject-static-meta: build/index.html not found — run after react-scripts build');
    process.exit(1);
  }

  const template = fs.readFileSync(INDEX_PATH, 'utf8');
  const routes = Object.keys(ROUTE_META);
  let count = 0;

  const homepageLcpPreload =
    '<link rel="preload" as="image" href="/assets/LogoV5.svg" fetchpriority="high" />';

  for (const routePath of routes) {
    const meta = ROUTE_META[routePath];
    let html = injectMeta(template, {
      title: meta.title,
      description: meta.description,
      canonical: canonicalFor(routePath),
    });
    if (routePath === '/') {
      html = html.replace('</head>', `  ${homepageLcpPreload}\n</head>`);
    }
    writeRouteHtml(routePath, html);
    count += 1;
  }

  console.log(`inject-static-meta: injected <head> for ${count} routes`);
}

main();
