const fs = require('fs');
const path = require('path');
const { ROUTE_META, canonicalFor } = require('../src/config/staticRouteMeta');
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');
const { buildRootShell } = require('./homeStaticShell');
const {
  SHELL_STYLES: UNITED_STATES_SHELL_STYLES,
  buildUnitedStatesBodyPrefix,
  BODY_CLASS: UNITED_STATES_BODY_CLASS,
  skipLcpPreload: UNITED_STATES_SKIP_LCP_PRELOAD,
  bootMinDelayMs: UNITED_STATES_BOOT_MIN_DELAY_MS,
} = require('./unitedStatesStaticShell');
const {
  SHELL_STYLES: TENNESSEE_SHELL_STYLES,
  buildTennesseeBodyPrefix,
  BODY_CLASS: TENNESSEE_BODY_CLASS,
  skipLcpPreload: TENNESSEE_SKIP_LCP_PRELOAD,
  bootMinDelayMs: TENNESSEE_BOOT_MIN_DELAY_MS,
} = require('./tennesseeStaticShell');
const {
  SHELL_STYLES: MEMPHIS_SHELL_STYLES,
  buildMemphisBodyPrefix,
  BODY_CLASS: MEMPHIS_BODY_CLASS,
  skipLcpPreload: MEMPHIS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: MEMPHIS_BOOT_MIN_DELAY_MS,
} = require('./memphisStaticShell');
const {
  SHELL_STYLES: NASHVILLE_SHELL_STYLES,
  buildNashvilleBodyPrefix,
  BODY_CLASS: NASHVILLE_BODY_CLASS,
  skipLcpPreload: NASHVILLE_SKIP_LCP_PRELOAD,
  bootMinDelayMs: NASHVILLE_BOOT_MIN_DELAY_MS,
} = require('./nashvilleStaticShell');
const {
  SHELL_STYLES: MOUNTAINS_SHELL_STYLES,
  buildMountainsBodyPrefix,
  BODY_CLASS: MOUNTAINS_BODY_CLASS,
  skipLcpPreload: MOUNTAINS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: MOUNTAINS_BOOT_MIN_DELAY_MS,
} = require('./mountainsStaticShell');
const {
  SHELL_STYLES: ILHA_GRANDE_SHELL_STYLES,
  buildIlhaGrandeBodyPrefix,
  BODY_CLASS: ILHA_GRANDE_BODY_CLASS,
  skipLcpPreload: ILHA_GRANDE_SKIP_LCP_PRELOAD,
  bootMinDelayMs: ILHA_GRANDE_BOOT_MIN_DELAY_MS,
} = require('./ilhaGrandeStaticShell');
const {
  SHELL_STYLES: NATURAL_SPACES_SHELL_STYLES,
  buildNaturalSpacesBodyPrefix,
  BODY_CLASS: NATURAL_SPACES_BODY_CLASS,
  skipLcpPreload: NATURAL_SPACES_SKIP_LCP_PRELOAD,
  bootMinDelayMs: NATURAL_SPACES_BOOT_MIN_DELAY_MS,
} = require('./naturalSpacesStaticShell');
const {
  SHELL_STYLES: GREEN_SPACES_SHELL_STYLES,
  buildGreenSpacesBodyPrefix,
  BODY_CLASS: GREEN_SPACES_BODY_CLASS,
  skipLcpPreload: GREEN_SPACES_SKIP_LCP_PRELOAD,
  bootMinDelayMs: GREEN_SPACES_BOOT_MIN_DELAY_MS,
} = require('./greenSpacesStaticShell');
const {
  SHELL_STYLES: STREET_ART_SHELL_STYLES,
  buildStreetArtBodyPrefix,
  BODY_CLASS: STREET_ART_BODY_CLASS,
  skipLcpPreload: STREET_ART_SKIP_LCP_PRELOAD,
  bootMinDelayMs: STREET_ART_BOOT_MIN_DELAY_MS,
} = require('./streetArtStaticShell');
const {
  SHELL_STYLES: CARNIVAL_SP_SHELL_STYLES,
  buildCarnivalBodyPrefix,
  BODY_CLASS: CARNIVAL_BODY_CLASS,
  skipLcpPreload: CARNIVAL_SKIP_LCP_PRELOAD,
  bootMinDelayMs: CARNIVAL_BOOT_MIN_DELAY_MS,
} = require('./carnivalSpStaticShell');
const {
  SHELL_STYLES: ART_GALLERIES_SHELL_STYLES,
  buildGalleriesBodyPrefix,
  BODY_CLASS: GALLERIES_BODY_CLASS,
  skipLcpPreload: ART_GALLERIES_SKIP_LCP_PRELOAD,
  bootMinDelayMs: ART_GALLERIES_BOOT_MIN_DELAY_MS,
} = require('./artGalleriesStaticShell');
const {
  SHELL_STYLES: ATHENS_SHELL_STYLES,
  buildAthensBodyPrefix,
  BODY_CLASS: ATHENS_BODY_CLASS,
  skipLcpPreload: ATHENS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: ATHENS_BOOT_MIN_DELAY_MS,
} = require('./athensStaticShell');
const {
  SHELL_STYLES: ANTWERP_SHELL_STYLES,
  buildAntwerpBodyPrefix,
  BODY_CLASS: ANTWERP_BODY_CLASS,
  skipLcpPreload: ANTWERP_SKIP_LCP_PRELOAD,
  bootMinDelayMs: ANTWERP_BOOT_MIN_DELAY_MS,
} = require('./antwerpStaticShell');
const {
  SHELL_STYLES: BUDAPEST_SHELL_STYLES,
  buildBudapestBodyPrefix,
  BODY_CLASS: BUDAPEST_BODY_CLASS,
  skipLcpPreload: BUDAPEST_SKIP_LCP_PRELOAD,
  bootMinDelayMs: BUDAPEST_BOOT_MIN_DELAY_MS,
} = require('./budapestStaticShell');
const {
  SHELL_STYLES: BELGIUM_SHELL_STYLES,
  buildBelgiumBodyPrefix,
  BODY_CLASS: BELGIUM_BODY_CLASS,
  skipLcpPreload: BELGIUM_SKIP_LCP_PRELOAD,
  bootMinDelayMs: BELGIUM_BOOT_MIN_DELAY_MS,
} = require('./belgiumStaticShell');
const {
  SHELL_STYLES: GREECE_SHELL_STYLES,
  buildGreeceBodyPrefix,
  BODY_CLASS: GREECE_BODY_CLASS,
  skipLcpPreload: GREECE_SKIP_LCP_PRELOAD,
  bootMinDelayMs: GREECE_BOOT_MIN_DELAY_MS,
} = require('./greeceStaticShell');
const {
  SHELL_STYLES: HUNGARY_SHELL_STYLES,
  buildHungaryBodyPrefix,
  BODY_CLASS: HUNGARY_BODY_CLASS,
  skipLcpPreload: HUNGARY_SKIP_LCP_PRELOAD,
  bootMinDelayMs: HUNGARY_BOOT_MIN_DELAY_MS,
} = require('./hungaryStaticShell');
const {
  SHELL_STYLES: AUSTRIA_SHELL_STYLES,
  buildAustriaBodyPrefix,
  BODY_CLASS: AUSTRIA_BODY_CLASS,
  skipLcpPreload: AUSTRIA_SKIP_LCP_PRELOAD,
  bootMinDelayMs: AUSTRIA_BOOT_MIN_DELAY_MS,
} = require('./austriaStaticShell');
const {
  SHELL_STYLES: VIENNA_SHELL_STYLES,
  buildViennaBodyPrefix,
  BODY_CLASS: VIENNA_BODY_CLASS,
  skipLcpPreload: VIENNA_SKIP_LCP_PRELOAD,
  bootMinDelayMs: VIENNA_BOOT_MIN_DELAY_MS,
} = require('./viennaStaticShell');
const {
  SHELL_STYLES: SALZBURG_SHELL_STYLES,
  buildSalzburgBodyPrefix,
  BODY_CLASS: SALZBURG_BODY_CLASS,
  skipLcpPreload: SALZBURG_SKIP_LCP_PRELOAD,
  bootMinDelayMs: SALZBURG_BOOT_MIN_DELAY_MS,
} = require('./salzburgStaticShell');
const {
  SHELL_STYLES: WIDER_COUNTRY_SHELL_STYLES,
  buildWiderCountryBodyPrefix,
  BODY_CLASS: WIDER_COUNTRY_BODY_CLASS,
  skipLcpPreload: WIDER_COUNTRY_SKIP_LCP_PRELOAD,
  bootMinDelayMs: WIDER_COUNTRY_BOOT_MIN_DELAY_MS,
} = require('./widerCountryStaticShell');
const {
  SHELL_STYLES: BRAZIL_SHELL_STYLES,
  buildBrazilBodyPrefix,
  BODY_CLASS: BRAZIL_BODY_CLASS,
  skipLcpPreload: BRAZIL_SKIP_LCP_PRELOAD,
  bootMinDelayMs: BRAZIL_BOOT_MIN_DELAY_MS,
} = require('./brazilStaticShell');
const {
  SHELL_STYLES: SAO_PAULO_SHELL_STYLES,
  buildSaoPauloBodyPrefix,
  BODY_CLASS: SAO_PAULO_BODY_CLASS,
  skipLcpPreload: SAO_PAULO_SKIP_LCP_PRELOAD,
  bootMinDelayMs: SAO_PAULO_BOOT_MIN_DELAY_MS,
} = require('./saopauloStaticShell');
const {
  SHELL_STYLES: FLORIANOPOLIS_SHELL_STYLES,
  buildFlorianopolisBodyPrefix,
  BODY_CLASS: FLORIANOPOLIS_BODY_CLASS,
  skipLcpPreload: FLORIANOPOLIS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: FLORIANOPOLIS_BOOT_MIN_DELAY_MS,
} = require('./florianopolisStaticShell');
const {
  SHELL_STYLES: RIO_SHELL_STYLES,
  buildRioBodyPrefix,
  BODY_CLASS: RIO_BODY_CLASS,
  skipLcpPreload: RIO_SKIP_LCP_PRELOAD,
  bootMinDelayMs: RIO_BOOT_MIN_DELAY_MS,
} = require('./rioStaticShell');
const {
  SHELL_STYLES: SANTOS_SHELL_STYLES,
  buildSantosBodyPrefix,
  BODY_CLASS: SANTOS_BODY_CLASS,
  skipLcpPreload: SANTOS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: SANTOS_BOOT_MIN_DELAY_MS,
} = require('./santosStaticShell');
const {
  SHELL_STYLES: PANTANAL_SHELL_STYLES,
  buildPantanalBodyPrefix,
  BODY_CLASS: PANTANAL_BODY_CLASS,
  skipLcpPreload: PANTANAL_SKIP_LCP_PRELOAD,
  bootMinDelayMs: PANTANAL_BOOT_MIN_DELAY_MS,
} = require('./pantanalStaticShell');
const {
  SHELL_STYLES: BONITO_SHELL_STYLES,
  buildBonitoBodyPrefix,
  BODY_CLASS: BONITO_BODY_CLASS,
  skipLcpPreload: BONITO_SKIP_LCP_PRELOAD,
  bootMinDelayMs: BONITO_BOOT_MIN_DELAY_MS,
} = require('./bonitoStaticShell');
const {
  SHELL_STYLES: MANAUS_SHELL_STYLES,
  buildManausBodyPrefix,
  BODY_CLASS: MANAUS_BODY_CLASS,
  skipLcpPreload: MANAUS_SKIP_LCP_PRELOAD,
  bootMinDelayMs: MANAUS_BOOT_MIN_DELAY_MS,
} = require('./manausStaticShell');
const {
  SHELL_STYLES: SALVADOR_SHELL_STYLES,
  buildSalvadorBodyPrefix,
  BODY_CLASS: SALVADOR_BODY_CLASS,
  skipLcpPreload: SALVADOR_SKIP_LCP_PRELOAD,
  bootMinDelayMs: SALVADOR_BOOT_MIN_DELAY_MS,
} = require('./salvadorStaticShell');
const {
  SHELL_STYLES: FOZ_SHELL_STYLES,
  buildFozBodyPrefix,
  BODY_CLASS: FOZ_BODY_CLASS,
  skipLcpPreload: FOZ_SKIP_LCP_PRELOAD,
  bootMinDelayMs: FOZ_BOOT_MIN_DELAY_MS,
} = require('./fozStaticShell');
const {
  SHELL_STYLES: FOOD_DRINK_SHELL_STYLES,
  buildFoodDrinkBodyPrefix,
  BODY_CLASS: FOOD_DRINK_BODY_CLASS,
  skipLcpPreload: FOOD_DRINK_SKIP_LCP_PRELOAD,
  bootMinDelayMs: FOOD_DRINK_BOOT_MIN_DELAY_MS,
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
  '/united-states': {
    shellStyles: UNITED_STATES_SHELL_STYLES,
    buildBodyPrefix: buildUnitedStatesBodyPrefix,
    bodyClass: UNITED_STATES_BODY_CLASS,
    skipLcpPreload: UNITED_STATES_SKIP_LCP_PRELOAD,
    bootMinDelayMs: UNITED_STATES_BOOT_MIN_DELAY_MS,
  },
  '/united-states/tennessee': {
    shellStyles: TENNESSEE_SHELL_STYLES,
    buildBodyPrefix: buildTennesseeBodyPrefix,
    bodyClass: TENNESSEE_BODY_CLASS,
    skipLcpPreload: TENNESSEE_SKIP_LCP_PRELOAD,
    bootMinDelayMs: TENNESSEE_BOOT_MIN_DELAY_MS,
  },
  '/united-states/tennessee/memphis': {
    shellStyles: MEMPHIS_SHELL_STYLES,
    buildBodyPrefix: buildMemphisBodyPrefix,
    bodyClass: MEMPHIS_BODY_CLASS,
    skipLcpPreload: MEMPHIS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: MEMPHIS_BOOT_MIN_DELAY_MS,
  },
  '/united-states/tennessee/nashville': {
    shellStyles: NASHVILLE_SHELL_STYLES,
    buildBodyPrefix: buildNashvilleBodyPrefix,
    bodyClass: NASHVILLE_BODY_CLASS,
    skipLcpPreload: NASHVILLE_SKIP_LCP_PRELOAD,
    bootMinDelayMs: NASHVILLE_BOOT_MIN_DELAY_MS,
  },
  '/united-states/tennessee/mountains': {
    shellStyles: MOUNTAINS_SHELL_STYLES,
    buildBodyPrefix: buildMountainsBodyPrefix,
    bodyClass: MOUNTAINS_BODY_CLASS,
    skipLcpPreload: MOUNTAINS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: MOUNTAINS_BOOT_MIN_DELAY_MS,
  },
  '/brazil': {
    shellStyles: BRAZIL_SHELL_STYLES,
    buildBodyPrefix: buildBrazilBodyPrefix,
    bodyClass: BRAZIL_BODY_CLASS,
    skipLcpPreload: BRAZIL_SKIP_LCP_PRELOAD,
    bootMinDelayMs: BRAZIL_BOOT_MIN_DELAY_MS,
  },
  '/brazil/saopaulo': {
    shellStyles: SAO_PAULO_SHELL_STYLES,
    buildBodyPrefix: buildSaoPauloBodyPrefix,
    bodyClass: SAO_PAULO_BODY_CLASS,
    skipLcpPreload: SAO_PAULO_SKIP_LCP_PRELOAD,
    bootMinDelayMs: SAO_PAULO_BOOT_MIN_DELAY_MS,
  },
  '/brazil/saopaulo/green-spaces': {
    shellStyles: GREEN_SPACES_SHELL_STYLES,
    buildBodyPrefix: buildGreenSpacesBodyPrefix,
    bodyClass: GREEN_SPACES_BODY_CLASS,
    skipLcpPreload: GREEN_SPACES_SKIP_LCP_PRELOAD,
    bootMinDelayMs: GREEN_SPACES_BOOT_MIN_DELAY_MS,
  },
  '/brazil/saopaulo/street-art': {
    shellStyles: STREET_ART_SHELL_STYLES,
    buildBodyPrefix: buildStreetArtBodyPrefix,
    bodyClass: STREET_ART_BODY_CLASS,
    skipLcpPreload: STREET_ART_SKIP_LCP_PRELOAD,
    bootMinDelayMs: STREET_ART_BOOT_MIN_DELAY_MS,
  },
  '/brazil/saopaulo/carnival': {
    shellStyles: CARNIVAL_SP_SHELL_STYLES,
    buildBodyPrefix: buildCarnivalBodyPrefix,
    bodyClass: CARNIVAL_BODY_CLASS,
    skipLcpPreload: CARNIVAL_SKIP_LCP_PRELOAD,
    bootMinDelayMs: CARNIVAL_BOOT_MIN_DELAY_MS,
  },
  '/brazil/saopaulo/galleries': {
    shellStyles: ART_GALLERIES_SHELL_STYLES,
    buildBodyPrefix: buildGalleriesBodyPrefix,
    bodyClass: GALLERIES_BODY_CLASS,
    skipLcpPreload: ART_GALLERIES_SKIP_LCP_PRELOAD,
    bootMinDelayMs: ART_GALLERIES_BOOT_MIN_DELAY_MS,
  },
  '/greece': {
    shellStyles: GREECE_SHELL_STYLES,
    buildBodyPrefix: buildGreeceBodyPrefix,
    bodyClass: GREECE_BODY_CLASS,
    skipLcpPreload: GREECE_SKIP_LCP_PRELOAD,
    bootMinDelayMs: GREECE_BOOT_MIN_DELAY_MS,
  },
  '/greece/athens': {
    shellStyles: ATHENS_SHELL_STYLES,
    buildBodyPrefix: buildAthensBodyPrefix,
    bodyClass: ATHENS_BODY_CLASS,
    skipLcpPreload: ATHENS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: ATHENS_BOOT_MIN_DELAY_MS,
  },
  '/belgium': {
    shellStyles: BELGIUM_SHELL_STYLES,
    buildBodyPrefix: buildBelgiumBodyPrefix,
    bodyClass: BELGIUM_BODY_CLASS,
    skipLcpPreload: BELGIUM_SKIP_LCP_PRELOAD,
    bootMinDelayMs: BELGIUM_BOOT_MIN_DELAY_MS,
  },
  '/belgium/antwerp': {
    shellStyles: ANTWERP_SHELL_STYLES,
    buildBodyPrefix: buildAntwerpBodyPrefix,
    bodyClass: ANTWERP_BODY_CLASS,
    skipLcpPreload: ANTWERP_SKIP_LCP_PRELOAD,
    bootMinDelayMs: ANTWERP_BOOT_MIN_DELAY_MS,
  },
  '/hungary': {
    shellStyles: HUNGARY_SHELL_STYLES,
    buildBodyPrefix: buildHungaryBodyPrefix,
    bodyClass: HUNGARY_BODY_CLASS,
    skipLcpPreload: HUNGARY_SKIP_LCP_PRELOAD,
    bootMinDelayMs: HUNGARY_BOOT_MIN_DELAY_MS,
  },
  '/hungary/budapest': {
    shellStyles: BUDAPEST_SHELL_STYLES,
    buildBodyPrefix: buildBudapestBodyPrefix,
    bodyClass: BUDAPEST_BODY_CLASS,
    skipLcpPreload: BUDAPEST_SKIP_LCP_PRELOAD,
    bootMinDelayMs: BUDAPEST_BOOT_MIN_DELAY_MS,
  },
  '/austria': {
    shellStyles: AUSTRIA_SHELL_STYLES,
    buildBodyPrefix: buildAustriaBodyPrefix,
    bodyClass: AUSTRIA_BODY_CLASS,
    skipLcpPreload: AUSTRIA_SKIP_LCP_PRELOAD,
    bootMinDelayMs: AUSTRIA_BOOT_MIN_DELAY_MS,
  },
  '/austria/vienna': {
    shellStyles: VIENNA_SHELL_STYLES,
    buildBodyPrefix: buildViennaBodyPrefix,
    bodyClass: VIENNA_BODY_CLASS,
    skipLcpPreload: VIENNA_SKIP_LCP_PRELOAD,
    bootMinDelayMs: VIENNA_BOOT_MIN_DELAY_MS,
  },
  '/austria/salzburg': {
    shellStyles: SALZBURG_SHELL_STYLES,
    buildBodyPrefix: buildSalzburgBodyPrefix,
    bodyClass: SALZBURG_BODY_CLASS,
    skipLcpPreload: SALZBURG_SKIP_LCP_PRELOAD,
    bootMinDelayMs: SALZBURG_BOOT_MIN_DELAY_MS,
  },
  '/austria/wider-country': {
    shellStyles: WIDER_COUNTRY_SHELL_STYLES,
    buildBodyPrefix: buildWiderCountryBodyPrefix,
    bodyClass: WIDER_COUNTRY_BODY_CLASS,
    skipLcpPreload: WIDER_COUNTRY_SKIP_LCP_PRELOAD,
    bootMinDelayMs: WIDER_COUNTRY_BOOT_MIN_DELAY_MS,
  },
  '/brazil/florianopolis': {
    shellStyles: FLORIANOPOLIS_SHELL_STYLES,
    buildBodyPrefix: buildFlorianopolisBodyPrefix,
    bodyClass: FLORIANOPOLIS_BODY_CLASS,
    skipLcpPreload: FLORIANOPOLIS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: FLORIANOPOLIS_BOOT_MIN_DELAY_MS,
  },
  '/brazil/rio': {
    shellStyles: RIO_SHELL_STYLES,
    buildBodyPrefix: buildRioBodyPrefix,
    bodyClass: RIO_BODY_CLASS,
    skipLcpPreload: RIO_SKIP_LCP_PRELOAD,
    bootMinDelayMs: RIO_BOOT_MIN_DELAY_MS,
  },
  '/brazil/rio/ilha-grande': {
    shellStyles: ILHA_GRANDE_SHELL_STYLES,
    buildBodyPrefix: buildIlhaGrandeBodyPrefix,
    bodyClass: ILHA_GRANDE_BODY_CLASS,
    skipLcpPreload: ILHA_GRANDE_SKIP_LCP_PRELOAD,
    bootMinDelayMs: ILHA_GRANDE_BOOT_MIN_DELAY_MS,
  },
  '/brazil/natural-spaces': {
    shellStyles: NATURAL_SPACES_SHELL_STYLES,
    buildBodyPrefix: buildNaturalSpacesBodyPrefix,
    bodyClass: NATURAL_SPACES_BODY_CLASS,
    skipLcpPreload: NATURAL_SPACES_SKIP_LCP_PRELOAD,
    bootMinDelayMs: NATURAL_SPACES_BOOT_MIN_DELAY_MS,
  },
  '/brazil/santos': {
    shellStyles: SANTOS_SHELL_STYLES,
    buildBodyPrefix: buildSantosBodyPrefix,
    bodyClass: SANTOS_BODY_CLASS,
    skipLcpPreload: SANTOS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: SANTOS_BOOT_MIN_DELAY_MS,
  },
  '/brazil/pantanal': {
    shellStyles: PANTANAL_SHELL_STYLES,
    buildBodyPrefix: buildPantanalBodyPrefix,
    bodyClass: PANTANAL_BODY_CLASS,
    skipLcpPreload: PANTANAL_SKIP_LCP_PRELOAD,
    bootMinDelayMs: PANTANAL_BOOT_MIN_DELAY_MS,
  },
  '/brazil/bonito': {
    shellStyles: BONITO_SHELL_STYLES,
    buildBodyPrefix: buildBonitoBodyPrefix,
    bodyClass: BONITO_BODY_CLASS,
    skipLcpPreload: BONITO_SKIP_LCP_PRELOAD,
    bootMinDelayMs: BONITO_BOOT_MIN_DELAY_MS,
  },
  '/brazil/manaus': {
    shellStyles: MANAUS_SHELL_STYLES,
    buildBodyPrefix: buildManausBodyPrefix,
    bodyClass: MANAUS_BODY_CLASS,
    skipLcpPreload: MANAUS_SKIP_LCP_PRELOAD,
    bootMinDelayMs: MANAUS_BOOT_MIN_DELAY_MS,
  },
  '/brazil/salvador': {
    shellStyles: SALVADOR_SHELL_STYLES,
    buildBodyPrefix: buildSalvadorBodyPrefix,
    bodyClass: SALVADOR_BODY_CLASS,
    skipLcpPreload: SALVADOR_SKIP_LCP_PRELOAD,
    bootMinDelayMs: SALVADOR_BOOT_MIN_DELAY_MS,
  },
  '/brazil/foz': {
    shellStyles: FOZ_SHELL_STYLES,
    buildBodyPrefix: buildFozBodyPrefix,
    bodyClass: FOZ_BODY_CLASS,
    skipLcpPreload: FOZ_SKIP_LCP_PRELOAD,
    bootMinDelayMs: FOZ_BOOT_MIN_DELAY_MS,
  },
  '/brazil/food-drink': {
    shellStyles: FOOD_DRINK_SHELL_STYLES,
    buildBodyPrefix: buildFoodDrinkBodyPrefix,
    bodyClass: FOOD_DRINK_BODY_CLASS,
    skipLcpPreload: FOOD_DRINK_SKIP_LCP_PRELOAD,
    bootMinDelayMs: FOOD_DRINK_BOOT_MIN_DELAY_MS,
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
      if (!shell.skipLcpPreload) {
        html = injectLcpPreloadEarly(html, routePath);
      }
      html = stripBrazilHeadNoise(html);
      html = html.replace(rootBlockPattern, `${shell.buildBodyPrefix()}${emptyRoot}`);
      html = html.replace(/<body([^>]*)>/, `<body$1 class="${shell.bodyClass}">`);
      html = html.replace(logoPreloadPattern, '');
      html = html.replace(shellStylePattern, '');
      html = html.replace('</head>', `  ${shell.shellStyles}\n</head>`);
      if (mainJsSrc) {
        html = deferBrazilAssetsUntilHero(html, {
          mainJsSrc,
          mainCssHref,
          minDelayMs: shell.bootMinDelayMs || 0,
        });
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
