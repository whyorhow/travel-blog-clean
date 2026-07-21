function buildStaticHeroStyles({
  bodyClass,
  heroId,
  themeBackground = "#1a1a1a",
  stackClass,
  titleClass,
  noteClass,
  headlineClass,
  bodyTextClass,
}) {
  return `<style>
  body.${bodyClass}{margin:0;background:${themeBackground}}
  #${heroId}{position:relative;width:100%;min-height:60vh;background:${themeBackground};overflow:hidden;padding-top:48px;box-sizing:border-box}
  #${heroId} .${heroId}-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #${heroId} img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #${heroId} .${heroId}-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #${heroId} .${stackClass}{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:1.5rem;width:min(100% - 2rem,48rem);text-align:center;pointer-events:none}
  #${heroId} .${titleClass}{margin:0;color:#B8860B;font-family:Georgia,"Times New Roman",serif;font-size:2.25rem;font-weight:700;line-height:1;text-shadow:0 2px 12px rgba(0,0,0,.55)}
  ${noteClass ? `#${heroId} .${noteClass}{margin:0;max-width:32rem;color:rgba(255,255,255,.72);font-family:Georgia,"Times New Roman",serif;font-size:.875rem;font-style:italic;line-height:1.6;text-shadow:0 2px 12px rgba(0,0,0,.4)}` : ""}
  ${headlineClass ? `#${heroId} .${headlineClass}{margin:0;max-width:32rem;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:1.5rem;line-height:1.375;text-shadow:0 2px 12px rgba(0,0,0,.45)}` : ""}
  ${bodyTextClass ? `#${heroId} .${bodyTextClass}{margin:0;max-width:32rem;color:rgba(255,255,255,.72);font-family:Georgia,"Times New Roman",serif;font-size:1.2rem;line-height:1.625;text-shadow:0 2px 12px rgba(0,0,0,.4)}` : ""}
  @media (min-width:768px){#${heroId}{display:none}body.${bodyClass}{background:transparent}}
</style>`;
}

function buildStaticHeroHtml({
  heroId,
  imageClass,
  heroSrc,
  alt,
  width,
  height,
  stackClass,
  stackChildren,
}) {
  if (!heroSrc) {
    return `<div id="${heroId}" aria-hidden="true"></div>`;
  }

  return (
    `<div id="${heroId}">` +
    `<div class="${heroId}-frame">` +
    `<img class="static-hero-primary ${imageClass}" src="${heroSrc}" alt="${alt}" width="${width}" height="${height}" fetchpriority="high" decoding="sync" />` +
    (stackChildren ? `<div class="${stackClass}">${stackChildren}</div>` : "") +
    `<div class="${heroId}-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

module.exports = {
  buildStaticHeroStyles,
  buildStaticHeroHtml,
};
