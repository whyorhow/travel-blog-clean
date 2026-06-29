/**
 * Generates optimize scripts, static shells, and mobile shell apps
 * for mobile LCP hero pages. Run: node scripts/staticHeroGenerator.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const PHASE2_PAGES = [
  {
    route: '/brazil/saopaulo/green-spaces',
    bootstrap: 'green-spaces',
    slug: 'green-spaces',
    shellModule: 'greenSpacesStaticShell',
    heroId: 'Brazil/Sao Paulo/Green Spaces/green-spaces-backup',
    resolvePublicId: 'Brazil/Sao Paulo/Green Spaces/green-spaces-backup',
    title: 'Green Spaces',
    alt: 'São Paulo green spaces travel journal',
    pageImport: './pages/GreenSpaces',
    pageFile: 'GreenSpaces.js',
    mobileApp: 'MobileGreenSpacesShellApp',
    hasFn: 'hasGreenSpacesStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/brazil/saopaulo/street-art',
    bootstrap: 'street-art',
    slug: 'street-art',
    shellModule: 'streetArtStaticShell',
    heroId: 'Brazil/Sao Paulo/Street Art/Murals-backup',
    resolvePublicId: 'Brazil/Sao Paulo/Street Art/Murals-backup',
    title: 'Street Art',
    alt: 'São Paulo street art travel journal',
    pageImport: './pages/Graffiti',
    pageFile: 'Graffiti.js',
    mobileApp: 'MobileStreetArtShellApp',
    hasFn: 'hasStreetArtStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/brazil/saopaulo/carnival',
    bootstrap: 'carnival',
    slug: 'carnival',
    shellModule: 'carnivalSpStaticShell',
    heroId: 'Brazil/Sao Paulo/Carnival/Carnival-backup',
    resolvePublicId: 'Brazil/Sao Paulo/Carnival/Carnival-backup',
    title: 'Carnival',
    alt: 'São Paulo carnival travel journal',
    pageImport: './pages/CarnivalSaoPaulo',
    pageFile: 'CarnivalSaoPaulo.js',
    mobileApp: 'MobileCarnivalSaoPauloShellApp',
    hasFn: 'hasCarnivalSaoPauloStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/brazil/saopaulo/galleries',
    bootstrap: 'galleries',
    slug: 'galleries',
    shellModule: 'artGalleriesStaticShell',
    heroId: 'Brazil/Sao Paulo/Galleries/Galleries-backup',
    resolvePublicId: 'Brazil/Sao Paulo/Galleries/Galleries-backup',
    title: 'Art Galleries',
    alt: 'São Paulo art galleries travel journal',
    pageImport: './pages/ArtGalleries',
    pageFile: 'ArtGalleries.js',
    mobileApp: 'MobileArtGalleriesShellApp',
    hasFn: 'hasArtGalleriesStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/greece/athens',
    bootstrap: 'athens',
    slug: 'athens',
    shellModule: 'athensStaticShell',
    heroId: 'Assets/Diary Athens',
    resolvePublicId: 'Assets/Diary Athens',
    title: 'Athens',
    alt: 'Athens travel journal',
    pageImport: './pages/AthensNew',
    pageFile: 'AthensNew.js',
    mobileApp: 'MobileAthensShellApp',
    hasFn: 'hasAthensStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/belgium/antwerp',
    bootstrap: 'antwerp',
    slug: 'antwerp',
    shellModule: 'antwerpStaticShell',
    heroId: 'Assets/Diary Antwerp',
    resolvePublicId: 'Assets/Diary Antwerp',
    title: 'Antwerp',
    alt: 'Antwerp travel journal',
    pageImport: './pages/AntwerpNew',
    pageFile: 'AntwerpNew.js',
    mobileApp: 'MobileAntwerpShellApp',
    hasFn: 'hasAntwerpStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/hungary/budapest',
    bootstrap: 'budapest',
    slug: 'budapest',
    shellModule: 'budapestStaticShell',
    heroId: 'Assets/Diary Budapest',
    resolvePublicId: 'Assets/Diary Budapest',
    title: 'Budapest',
    alt: 'Budapest travel journal',
    pageImport: './pages/BudapestNew',
    pageFile: 'BudapestNew.js',
    mobileApp: 'MobileBudapestShellApp',
    hasFn: 'hasBudapestStaticHero',
    bg: '#1a1a1a',
  },
];

const PHASE4_PAGES = [
  {
    route: '/austria',
    bootstrap: 'austria',
    slug: 'austria',
    shellModule: 'austriaStaticShell',
    heroId: 'Austria/Austria-backup',
    resolvePublicId: 'Austria/Austria-backup',
    title: 'Austria',
    alt: 'Austria travel journal',
    pageImport: './pages/Austria',
    pageFile: 'Austria.js',
    mobileApp: 'MobileAustriaShellApp',
    hasFn: 'hasAustriaStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/austria/vienna',
    bootstrap: 'vienna',
    slug: 'vienna',
    shellModule: 'viennaStaticShell',
    heroId: 'Austria/Vienna-backup',
    resolvePublicId: 'Austria/Vienna-backup',
    title: 'Vienna',
    alt: 'Vienna travel journal',
    pageImport: './pages/ViennaNew',
    pageFile: 'ViennaNew.js',
    mobileApp: 'MobileViennaShellApp',
    hasFn: 'hasViennaStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/austria/salzburg',
    bootstrap: 'salzburg',
    slug: 'salzburg',
    shellModule: 'salzburgStaticShell',
    heroId: 'Austria/Salzburg-backup',
    resolvePublicId: 'Austria/Salzburg-backup',
    title: 'Salzburg',
    alt: 'Salzburg travel journal',
    pageImport: './pages/SalzburgNew',
    pageFile: 'SalzburgNew.js',
    mobileApp: 'MobileSalzburgShellApp',
    hasFn: 'hasSalzburgStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/austria/wider-country',
    bootstrap: 'wider-country',
    slug: 'wider-country',
    shellModule: 'widerCountryStaticShell',
    heroId: 'Austria/Wider-Country-backup',
    resolvePublicId: 'Austria/Wider-Country-backup',
    title: 'Beyond the Cities',
    alt: 'Austria countryside travel journal',
    pageImport: './pages/WiderCountryNew',
    pageFile: 'WiderCountryNew.js',
    mobileApp: 'MobileWiderCountryShellApp',
    hasFn: 'hasWiderCountryStaticHero',
    bg: '#1a1a1a',
  },
];

const PHASE3_PAGES = [
  {
    route: '/belgium',
    bootstrap: 'belgium',
    slug: 'belgium',
    shellModule: 'belgiumStaticShell',
    heroId: 'Belgium/Belgium-backup',
    resolvePublicId: 'Belgium/Belgium-backup',
    title: 'Belgium',
    alt: 'Belgium travel journal',
    pageImport: './pages/Belgium',
    pageFile: 'Belgium.js',
    mobileApp: 'MobileBelgiumShellApp',
    hasFn: 'hasBelgiumStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/greece',
    bootstrap: 'greece',
    slug: 'greece',
    shellModule: 'greeceStaticShell',
    heroId: 'Greece/Greece-backup',
    resolvePublicId: 'Greece/Greece-backup',
    title: 'Greece',
    alt: 'Greece travel journal',
    pageImport: './pages/Greece',
    pageFile: 'Greece.js',
    mobileApp: 'MobileGreeceShellApp',
    hasFn: 'hasGreeceStaticHero',
    bg: '#1a1a1a',
  },
  {
    route: '/hungary',
    bootstrap: 'hungary',
    slug: 'hungary',
    shellModule: 'hungaryStaticShell',
    heroId: 'Hungary/Hungary-backup',
    resolvePublicId: 'Hungary/Hungary-backup',
    title: 'Hungary',
    alt: 'Hungary travel journal',
    pageImport: './pages/Hungary',
    pageFile: 'Hungary.js',
    mobileApp: 'MobileHungaryShellApp',
    hasFn: 'hasHungaryStaticHero',
    bg: '#1a1a1a',
  },
];

function pascalCase(slug) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function constName(slug) {
  return slug.replace(/-/g, '_').toUpperCase();
}

function writeOptimizeScript(page) {
  const constKey = `${constName(page.slug)}_HERO_DATA_URI`;
  const optimize = `/**
 * Self-host ${page.title} mobile LCP hero from Cloudinary source.
 * Run: npm run optimize:${page.slug}-hero
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { cloudinaryImageUrl } = require('./routeLcpPreload.cjs');

const HERO_ID = ${JSON.stringify(page.heroId)};
const SOURCE_URL = cloudinaryImageUrl(HERO_ID, { width: 800 });
const OUTPUT = path.join(__dirname, '../public/assets/${page.slug}-hero-400.webp');
const INLINE_OUT = path.join(__dirname, '${page.slug}-hero-inline.cjs');
const WIDTH = 400;
const QUALITY = 72;

async function main() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(\`Failed to fetch hero: \${response.status} \${SOURCE_URL}\`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const meta = await sharp(buffer).metadata();
  const webpBuffer = await sharp(buffer)
    .resize(WIDTH)
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(OUTPUT, webpBuffer);
  const dataUri = \`data:image/webp;base64,\${webpBuffer.toString('base64')}\`;
  const inlineBody =
    '/** Generated by npm run optimize:${page.slug}-hero — do not edit */\\n' +
    'module.exports = { ${constKey}: ' + JSON.stringify(dataUri) + ' };\\n';
  await fs.promises.writeFile(INLINE_OUT, inlineBody);
  const height = meta.width && meta.height ? Math.round((WIDTH * meta.height) / meta.width) : 534;
  console.log(
    \`${page.slug}-hero-400.webp: \${WIDTH}x\${height}, \${(webpBuffer.length / 1024).toFixed(1)} KiB\`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`;
  fs.writeFileSync(path.join(ROOT, 'scripts', `optimize-${page.slug}-hero.js`), optimize);
}

function writeStaticShell(page) {
  const constKey = `${constName(page.slug)}_HERO_DATA_URI`;
  const buildFn = `build${pascalCase(page.slug)}BodyPrefix`;
  const content = `/**
 * ${page.title} — static in-flow hero BEFORE #root (mobile LCP).
 */
const { ${constKey} } = require('./${page.slug}-hero-inline.cjs');

const SHELL_STYLES = \`<style>
  body.${page.slug}-static-page{margin:0;background:${page.bg}}
  #${page.slug}-static-hero{position:relative;width:100%;min-height:60vh;background:${page.bg};overflow:hidden;padding-top:48px;box-sizing:border-box}
  #${page.slug}-static-hero .${page.slug}-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #${page.slug}-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #${page.slug}-static-hero .${page.slug}-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #${page.slug}-static-hero .${page.slug}-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#${page.slug}-static-hero{display:none}body.${page.slug}-static-page{background:transparent}}
</style>\`;

function build${pascalCase(page.slug)}StaticHero() {
  const heroSrc = ${constKey} || '';
  if (!heroSrc) {
    return '<div id="${page.slug}-static-hero" aria-hidden="true"></div>';
  }
  return (
    \`<div id="${page.slug}-static-hero">\` +
    \`<div class="${page.slug}-static-hero-frame">\` +
    \`<img class="static-hero-primary ${page.slug}-static-hero-primary" src="\${heroSrc}" alt="${page.alt}" width="400" height="534" fetchpriority="high" decoding="sync" />\` +
    \`<p class="${page.slug}-static-hero-title">${page.title}</p>\` +
    \`<div class="${page.slug}-static-hero-overlay" aria-hidden="true"></div>\` +
    \`</div></div>\`
  );
}

function ${buildFn}() {
  return build${pascalCase(page.slug)}StaticHero();
}

module.exports = {
  SHELL_STYLES,
  ${buildFn},
  BODY_CLASS: '${page.slug}-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
`;
  const fileName =
    page.shellModule.charAt(0).toLowerCase() +
    page.shellModule
      .slice(1)
      .replace(/StaticShell$/, 'StaticShell')
      .replace(/^./, (c) => c);
  fs.writeFileSync(path.join(ROOT, 'scripts', `${page.shellModule}.js`), content);
}

function writeMobileShell(page) {
  const pageComponent = path.basename(page.pageImport).replace('./pages/', '');
  const content = `import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import VisualHeader from "./components/VisualHeader";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import { NarrativeProvider } from "./context/NarrativeContext";
import { ${page.hasFn} } from "./utils/staticPageHero";
import {
  useStaticHeroPageChunkLoader,
  useStaticHeroDeferredFonts,
} from "./utils/staticHeroScrollGate";
import {
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  scheduleAnalyticsLoad,
  loadAnalyticsScript,
} from "./utils/analytics";

function UpgradeOnLeave({ onUpgrade }) {
  const location = useLocation();
  useEffect(() => {
    onUpgrade(location);
  }, [location, onUpgrade]);
  return null;
}

/** Mobile ${page.route} — static HTML hero is LCP. */
export default function ${page.mobileApp}({ root }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [PageComponent, setPageComponent] = useState(null);
  const staticHero = ${page.hasFn}();
  const importPage = useCallback(() => import("${page.pageImport}"), []);
  useStaticHeroPageChunkLoader(staticHero, importPage, setPageComponent, 10000);
  useStaticHeroDeferredFonts(staticHero);

  const upgradeToFullApp = useCallback(
    (location) => {
      import("./App").then(({ default: App }) => {
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        if (location && location.pathname !== "${page.route}") {
          window.history.replaceState(
            null,
            "",
            location.pathname + location.search + location.hash
          );
        }
      });
    },
    [root]
  );

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted") === "true";
    const rejected = localStorage.getItem("cookiesRejected") === "true";
    if (accepted) {
      setCookiesAccepted(true);
      scheduleAnalyticsLoad().then(() => grantAnalyticsConsent());
    } else if (rejected) {
      setCookiesAccepted(false);
    }
  }, []);

  const handleConsentChange = (choice) => {
    setCookiesAccepted(choice);
    if (choice === true) {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.removeItem("cookiesRejected");
      loadAnalyticsScript().then(() => grantAnalyticsConsent());
    } else if (choice === false) {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
      denyAnalyticsConsent();
    } else {
      localStorage.setItem("cookiesAccepted", "partial");
      localStorage.removeItem("cookiesRejected");
      denyAnalyticsConsent();
    }
  };

  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="min-h-screen flex flex-col">
          <Nav />
          <VisualHeader />
          <main id="main-content" className="flex-grow">
            <NarrativeProvider>
              {PageComponent ? (
                <PageComponent />
              ) : staticHero ? null : (
                <RouteLoadingFallback />
              )}
            </NarrativeProvider>
          </main>
          {cookiesAccepted === null && (
            <CookieConsent
              onAccept={() => handleConsentChange(true)}
              onReject={() => handleConsentChange(false)}
            />
          )}
          <Footer cookiesAccepted={cookiesAccepted} />
        </div>
        <Routes>
          <Route path="*" element={<UpgradeOnLeave onUpgrade={upgradeToFullApp} />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
`;
  fs.writeFileSync(path.join(ROOT, 'src', `${page.mobileApp}.js`), content);
}

const phaseArg = process.argv[2] || 'phase2';
const pages =
  phaseArg === 'phase4'
    ? PHASE4_PAGES
    : phaseArg === 'phase3'
      ? PHASE3_PAGES
      : PHASE2_PAGES;
const manifestName =
  phaseArg === 'phase4'
    ? 'phase4-pages.manifest.json'
    : phaseArg === 'phase3'
      ? 'phase3-pages.manifest.json'
      : 'phase2-pages.manifest.json';

for (const page of pages) {
  writeOptimizeScript(page);
  writeStaticShell(page);
  writeMobileShell(page);
  console.log('generated', page.slug);
}

fs.writeFileSync(
  path.join(ROOT, 'scripts', manifestName),
  JSON.stringify(pages, null, 2)
);
console.log('Done —', pages.length, 'pages');
