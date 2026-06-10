const fs = require('fs');
const path = require('path');
const { ROUTE_META, canonicalFor } = require('../src/config/staticRouteMeta');
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');
const { buildRootShell } = require('./homeStaticShell');
const {
  SHELL_STYLES: BRAZIL_SHELL_STYLES,
  PRECONECT: BRAZIL_PRECONNECT,
  buildBrazilBodyPrefix,
  BODY_CLASS: BRAZIL_BODY_CLASS,
} = require('./brazilStaticShell');
const { deferMainUntilBrazilHero, extractMainJsSrc } = require('./brazilBootScript');

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

function addMainScriptPreload(html) {
  const match = html.match(/<script defer="defer" src="(\/static\/js\/[^"]+)"><\/script>/);
  if (!match || html.includes(`href="${match[1]}" as="script"`)) return html;
  return html.replace(
    match[0],
    `<link rel="preload" href="${match[1]}" as="script" />${match[0]}`
  );
}

function injectLcpPreload(html, routePath) {
  const href = ROUTE_LCP_PRELOAD[routePath];
  if (!href) return html;
  const tag = `<link rel="preload" as="image" href="${escapeHtml(href)}" fetchpriority="high" />`;
  if (html.includes(tag)) return html;
  return html.replace('</head>', `  ${tag}\n</head>`);
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

  const emptyRoot = '<div id="root"></div>';
  const rootBlockPattern = /<div id="root">[\s\S]*?<\/div>(?=\s*<\/body>)/;
  const logoPreloadPattern =
    /<link rel="preload" as="image" href="\/assets\/Logo[^"]*"[^>]*\s*\/?>\s*/g;
  const shellStylePattern =
    /<style>\s*\.home-shell[\s\S]*?<\/style>\s*/;

  for (const routePath of routes) {
    const meta = ROUTE_META[routePath];
    let html = injectMeta(template, {
      title: meta.title,
      description: meta.description,
      canonical: canonicalFor(routePath),
    });
    if (routePath === '/') {
      html = html.replace(rootBlockPattern, buildRootShell(''));
      html = addMainScriptPreload(html);
    } else if (routePath === '/brazil') {
      const mainJsSrc = extractMainJsSrc(html);
      html = html.replace(rootBlockPattern, `${buildBrazilBodyPrefix()}${emptyRoot}`);
      html = html.replace(/<body([^>]*)>/, `<body$1 class="${BRAZIL_BODY_CLASS}">`);
      html = html.replace(logoPreloadPattern, '');
      html = html.replace(shellStylePattern, '');
      html = html.replace('</head>', `  ${BRAZIL_PRECONNECT}\n  ${BRAZIL_SHELL_STYLES}\n</head>`);
      html = injectLcpPreload(html, routePath);
      if (mainJsSrc) {
        html = deferMainUntilBrazilHero(html, mainJsSrc);
      }
    } else {
      // Shell + logo preload live in public/index.html for dev/homepage; strip elsewhere
      html = html.replace(rootBlockPattern, emptyRoot);
      html = html.replace(logoPreloadPattern, '');
      html = html.replace(shellStylePattern, '');
      html = injectLcpPreload(html, routePath);
    }
    writeRouteHtml(routePath, html);
    count += 1;
  }

  console.log(`inject-static-meta: injected <head> for ${count} routes`);
}

main();
