/**
 * United States hub — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #united-states-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require("./routeLcpPreload.cjs");
const { USA_HERO_DATA_URI } = require("./usa-hero-inline.cjs");
const {
  buildStaticHeroStyles,
  buildStaticHeroHtml,
} = require("./staticShellUtils");

const UNITED_STATES_STATIC_INTRO = {
  title: "United States",
  note: "This country is currently represented by one state — Tennessee. More destinations may be added over time.",
  body: "Tennessee is the first completed section on the site. We crossed river plain west of Memphis, music streets in Nashville, then ridgelines wrapped in low cloud over the Smokies — all within a few hours' drive of each other.",
};

const SHELL_STYLES = buildStaticHeroStyles({
  bodyClass: "united-states-static-page",
  heroId: "united-states-static-hero",
  stackClass: "united-states-static-hero-stack",
  titleClass: "united-states-static-hero-title",
  noteClass: "united-states-static-hero-note",
  bodyTextClass: "united-states-static-hero-body",
});

function buildUnitedStatesStaticHero() {
  const heroSrc =
    USA_HERO_DATA_URI || ROUTE_LCP_PRELOAD["/united-states"] || "";
  const { title, note, body } = UNITED_STATES_STATIC_INTRO;

  return buildStaticHeroHtml({
    heroId: "united-states-static-hero",
    imageClass: "united-states-static-hero-primary",
    heroSrc,
    alt: "United States travel journal",
    width: 400,
    height: 279,
    stackClass: "united-states-static-hero-stack",
    stackChildren:
      `<p class="united-states-static-hero-title">${title}</p>` +
      `<p class="united-states-static-hero-note">${note}</p>` +
      `<p class="united-states-static-hero-body">${body}</p>`,
  });
}

function buildUnitedStatesBodyPrefix() {
  return buildUnitedStatesStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildUnitedStatesBodyPrefix,
  BODY_CLASS: "united-states-static-page",
  /** Hero is inlined — skip network preload (avoids duplicate fetch). */
  skipLcpPreload: true,
  /** Defer main bundle until after typical PSI LCP window. */
  bootMinDelayMs: 3000,
};
