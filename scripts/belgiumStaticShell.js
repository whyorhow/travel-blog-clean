/**
 * Belgium — static in-flow hero BEFORE #root (mobile LCP).
 */
const { BELGIUM_HERO_DATA_URI } = require("./belgium-hero-inline.cjs");
const {
  buildStaticHeroStyles,
  buildStaticHeroHtml,
} = require("./staticShellUtils");

const BELGIUM_STATIC_INTRO = {
  title: "Belgium",
  note: "This country is currently represented by one city — Antwerp. More destinations may be added over time.",
  headline: "Belgium feels composed rather than constructed.",
  body: "As if everything has found its place over time. You notice it slowly, in details more than landmarks. Antwerp is where that feeling begins.",
};

const SHELL_STYLES = buildStaticHeroStyles({
  bodyClass: "belgium-static-page",
  heroId: "belgium-static-hero",
  stackClass: "belgium-static-hero-stack",
  titleClass: "belgium-static-hero-title",
  noteClass: "belgium-static-hero-note",
  headlineClass: "belgium-static-hero-headline",
  bodyTextClass: "belgium-static-hero-body",
});

function buildBelgiumStaticHero() {
  const heroSrc = BELGIUM_HERO_DATA_URI || "";
  const { title, note, headline, body } = BELGIUM_STATIC_INTRO;

  return buildStaticHeroHtml({
    heroId: "belgium-static-hero",
    imageClass: "belgium-static-hero-primary",
    heroSrc,
    alt: "Belgium travel journal",
    width: 400,
    height: 267,
    stackClass: "belgium-static-hero-stack",
    stackChildren:
      `<p class="belgium-static-hero-title">${title}</p>` +
      `<p class="belgium-static-hero-note">${note}</p>` +
      `<p class="belgium-static-hero-headline">${headline}</p>` +
      `<p class="belgium-static-hero-body">${body}</p>`,
  });
}

function buildBelgiumBodyPrefix() {
  return buildBelgiumStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildBelgiumBodyPrefix,
  BODY_CLASS: "belgium-static-page",
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
