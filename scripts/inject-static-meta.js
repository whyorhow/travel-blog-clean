const fs = require('fs');
const path = require('path');
const { ROUTE_META, canonicalFor } = require('../src/config/staticRouteMeta');
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');
const { buildRootShell } = require('./homeStaticShell');
const {
  SHELL_STYLES: BRAZIL_SHELL_STYLES,
  buildBrazilBodyPrefix,
  BODY_CLASS: BRAZIL_BODY_CLASS,
} = require('./brazilStaticShell');
const {
  SHELL_STYLES: SAO_PAULO_SHELL_STYLES,
  buildSaoPauloBodyPrefix,
  BODY_CLASS: SAO_PAULO_BODY_CLASS,
} = require('./saopauloStaticShell');
const {
  SHELL_STYLES: FLORIANOPOLIS_SHELL_STYLES,
  buildFlorianopolisBodyPrefix,
  BODY_CLASS: FLORIANOPOLIS_BODY_CLASS,
} = require('./florianopolisStaticShell');
const {
  SHELL_STYLES: RIO_SHELL_STYLES,
  buildRioBodyPrefix,
  BODY_CLASS: RIO_BODY_CLASS,
} = require('./rioStaticShell');
const {
  SHELL_STYLES: SANTOS_SHELL_STYLES,
  buildSantosBodyPrefix,
  BODY_CLASS: SANTOS_BODY_CLASS,
} = require('./santosStaticShell');
const {
  SHELL_STYLES: PANTANAL_SHELL_STYLES,
  buildPantanalBodyPrefix,
  BODY_CLASS: PANTANAL_BODY_CLASS,
} = require('./pantanalStaticShell');
const {
  SHELL_STYLES: BONITO_SHELL_STYLES,
  buildBonitoBodyPrefix,
  BODY_CLASS: BONITO_BODY_CLASS,
} = require('./bonitoStaticShell');
const {
  SHELL_STYLES: MANAUS_SHELL_STYLES,
  buildManausBodyPrefix,
  BODY_CLASS: MANAUS_BODY_CLASS,
} = require('./manausStaticShell');
const {
  SHELL_STYLES: SALVADOR_SHELL_STYLES,
  buildSalvadorBodyPrefix,
  BODY_CLASS: SALVADOR_BODY_CLASS,
} = require('./salvadorStaticShell');
const {
  SHELL_STYLES: FOZ_SHELL_STYLES,
  buildFozBodyPrefix,
  BODY_CLASS: FOZ_BODY_CLASS,
} = require('./fozStaticShell');
const {
  SHELL_STYLES: FOOD_DRINK_SHELL_STYLES,
  buildFoodDrinkBodyPrefix,
  BODY_CLASS: FOOD_DRINK_BODY_CLASS,
} = require('./foodDrinkStaticShell');
const {
  deferBrazilAssetsUntilHero,
  extractMainJsSrc,
  extractMainCssHref,
} = require('./brazilBootScript');

const BUILD_DIR = path.join(__dirname, '../build');
const INDEX_PATH = path.join(BUILD_DIR, 'index.html');

/** Routes with static HTML hero + deferred JS/CSS (mobile LCP). */
const MOBILE_LCP_SHELLS = {
  '/brazil': {
    shellStyles: BRAZIL_SHELL_STYLES,
    buildBodyPrefix: buildBrazilBodyPrefix,
    bodyClass: BRAZIL_BODY_CLASS,
  },
  '/brazil/saopaulo': {
    shellStyles: SAO_PAULO_SHELL_STYLES,
    buildBodyPrefix: buildSaoPauloBodyPrefix,
    bodyClass: SAO_PAULO_BODY_CLASS,
  },
  '/brazil/florianopolis': {
    shellStyles: FLORIANOPOLIS_SHELL_STYLES,
    buildBodyPrefix: buildFlorianopolisBodyPrefix,
    bodyClass: FLORIANOPOLIS_BODY_CLASS,
  },
  '/brazil/rio': {
    shellStyles: RIO_SHELL_STYLES,
    buildBodyPrefix: buildRioBodyPrefix,
    bodyClass: RIO_BODY_CLASS,
  },
  '/brazil/santos': {
    shellStyles: SANTOS_SHELL_STYLES,
    buildBodyPrefix: buildSantosBodyPrefix,
    bodyClass: SANTOS_BODY_CLASS,
  },
  '/brazil/pantanal': {
    shellStyles: PANTANAL_SHELL_STYLES,
    buildBodyPrefix: buildPantanalBodyPrefix,
    bodyClass: PANTANAL_BODY_CLASS,
  },
  '/brazil/bonito': {
    shellStyles: BONITO_SHELL_STYLES,
    buildBodyPrefix: buildBonitoBodyPrefix,
    bodyClass: BONITO_BODY_CLASS,
  },
  '/brazil/manaus': {
    shellStyles: MANAUS_SHELL_STYLES,
    buildBodyPrefix: buildManausBodyPrefix,
    bodyClass: MANAUS_BODY_CLASS,
  },
  '/brazil/salvador': {
    shellStyles: SALVADOR_SHELL_STYLES,
    buildBodyPrefix: buildSalvadorBodyPrefix,
    bodyClass: SALVADOR_BODY_CLASS,
  },
  '/brazil/foz': {
    shellStyles: FOZ_SHELL_STYLES,
    buildBodyPrefix: buildFozBodyPrefix,
    bodyClass: FOZ_BODY_CLASS,
  },
  '/brazil/food-drink': {
    shellStyles: FOOD_DRINK_SHELL_STYLES,
    buildBodyPrefix: buildFoodDrinkBodyPrefix,
    bodyClass: FOOD_DRINK_BODY_CLASS,
  },
};

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

function lcpPreloadTag(routePath) {
  const href = ROUTE_LCP_PRELOAD[routePath];
  if (!href) return null;
  return `<link rel="preload" as="image" href="${escapeHtml(href)}" fetchpriority="high" />`;
}

function injectLcpPreload(html, routePath) {
  const tag = lcpPreloadTag(routePath);
  if (!tag || html.includes(tag)) return html;
  return html.replace('</head>', `  ${tag}\n</head>`);
}

/** Brazil: discover LCP image before other head resources. */
function injectLcpPreloadEarly(html, routePath) {
  const tag = lcpPreloadTag(routePath);
  if (!tag || html.includes(tag)) return html;
  return html.replace('<head>', `<head>\n  ${tag}`);
}

/** Brazil mobile LCP: drop favicon/manifest fetches from critical path. */
function stripBrazilHeadNoise(html) {
  return html
    .replace(/<link rel="icon"[^>]*\/?>\s*/g, '')
    .replace(/<link rel="apple-touch-icon"[^>]*\/?>\s*/g, '')
    .replace(/<link rel="manifest"[^>]*\/?>\s*/g, '');
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
    } else if (MOBILE_LCP_SHELLS[routePath]) {
      const shell = MOBILE_LCP_SHELLS[routePath];
      const mainJsSrc = extractMainJsSrc(html);
      const mainCssHref = extractMainCssHref(html);
      html = injectLcpPreloadEarly(html, routePath);
      html = stripBrazilHeadNoise(html);
      html = html.replace(rootBlockPattern, `${shell.buildBodyPrefix()}${emptyRoot}`);
      html = html.replace(/<body([^>]*)>/, `<body$1 class="${shell.bodyClass}">`);
      html = html.replace(logoPreloadPattern, '');
      html = html.replace(shellStylePattern, '');
      html = html.replace('</head>', `  ${shell.shellStyles}\n</head>`);
      if (mainJsSrc) {
        html = deferBrazilAssetsUntilHero(html, { mainJsSrc, mainCssHref });
      }
    } else {
      // Shell + logo preload live in public/index.html for dev/homepage; strip elsewhere
      html = html.replace(rootBlockPattern, emptyRoot);
      html = html.replace(logoPreloadPattern, '');
      html = html.replace(shellStylePattern, '');
      if (ROUTE_LCP_PRELOAD[routePath]) {
        html = injectLcpPreloadEarly(html, routePath);
      } else {
        html = injectLcpPreload(html, routePath);
      }
    }
    writeRouteHtml(routePath, html);
    count += 1;
  }

  console.log(`inject-static-meta: injected <head> for ${count} routes`);
}

main();
