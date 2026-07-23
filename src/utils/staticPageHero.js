/** True when build injected a static hero above #root (mobile LCP). */
export function hasUnitedStatesStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('united-states-static-hero');
}

export function hasTennesseeStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('tennessee-static-hero');
}

export function hasMemphisStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('memphis-static-hero');
}

export function hasNashvilleStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('nashville-static-hero');
}

export function hasMountainsStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('mountains-static-hero');
}

export function hasIlhaGrandeStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('ilha-grande-static-hero');
}

export function hasNaturalSpacesStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('natural-spaces-static-hero');
}

export function hasGreenSpacesStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('green-spaces-static-hero');
}

export function hasStreetArtStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('street-art-static-hero');
}

export function hasCarnivalSaoPauloStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('carnival-static-hero');
}

export function hasArtGalleriesStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('galleries-static-hero');
}

export function hasAthensStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('athens-static-hero');
}

export function hasAntwerpStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('antwerp-static-hero');
}

export function hasBudapestStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('budapest-static-hero');
}

export function hasBelgiumStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('belgium-static-hero');
}

export function hasGreeceStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('greece-static-hero');
}

export function hasHungaryStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('hungary-static-hero');
}

export function hasAustriaStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('austria-static-hero');
}

export function hasViennaStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('vienna-static-hero');
}

export function hasSalzburgStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('salzburg-static-hero');
}

export function hasWiderCountryStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('wider-country-static-hero');
}

export function hasBrazilStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('brazil-static-hero');
}

export function hasSaoPauloStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('saopaulo-static-hero');
}

export function hasFlorianopolisStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('florianopolis-static-hero');
}

export function hasRioStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('rio-static-hero');
}

export function hasSantosStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('santos-static-hero');
}

export function hasPantanalStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('pantanal-static-hero');
}

export function hasBonitoStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('bonito-static-hero');
}

export function hasManausStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('manaus-static-hero');
}

export function hasSalvadorStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('salvador-static-hero');
}

export function hasFozStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('foz-static-hero');
}

export function hasFoodDrinkStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('food-drink-static-hero');
}

export function hasGermanyStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('germany-static-hero');
}

export function hasBerlinStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('berlin-static-hero');
}

export function hasPortugalStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('portugal-static-hero');
}

export function isMobileViewport() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
  );
}
