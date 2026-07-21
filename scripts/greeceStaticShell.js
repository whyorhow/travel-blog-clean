/**
 * Greece — static in-flow hero BEFORE #root (mobile LCP).
 */
const { GREECE_HERO_DATA_URI } = require("./greece-hero-inline.cjs");
const {
  buildStaticHeroStyles,
  buildStaticHeroHtml,
} = require("./staticShellUtils");

const GREECE_STATIC_INTRO = {
  title: "Greece",
  bodyLines: [
    "Some cities preserve their history.",
    "Athens carries it through everyday life.",
    "Ancient stone sits above busy streets, old neighbourhoods climb the hillsides below the Acropolis, and ordinary walks often pass places that have stood for thousands of years. This is where our journey through Greece begins.",
  ],
};

const SHELL_STYLES = buildStaticHeroStyles({
  bodyClass: "greece-static-page",
  heroId: "greece-static-hero",
  stackClass: "greece-static-hero-stack",
  titleClass: "greece-static-hero-title",
  headlineClass: "greece-static-hero-headline",
  bodyTextClass: "greece-static-hero-body",
});

function buildGreeceStaticHero() {
  const heroSrc = GREECE_HERO_DATA_URI || "";
  const { title, bodyLines } = GREECE_STATIC_INTRO;

  return buildStaticHeroHtml({
    heroId: "greece-static-hero",
    imageClass: "greece-static-hero-primary",
    heroSrc,
    alt: "Greece travel journal",
    width: 400,
    height: 528,
    stackClass: "greece-static-hero-stack",
    stackChildren:
      `<p class="greece-static-hero-title">${title}</p>` +
      `<p class="greece-static-hero-headline">${bodyLines[0]}</p>` +
      `<p class="greece-static-hero-body">${bodyLines[1]}</p>` +
      `<p class="greece-static-hero-body">${bodyLines[2]}</p>`,
  });
}

function buildGreeceBodyPrefix() {
  return buildGreeceStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildGreeceBodyPrefix,
  BODY_CLASS: "greece-static-page",
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
