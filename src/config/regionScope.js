/**

 * Honest geography labels (P1-3) — set expectations when a country hub is still thin.

 */

const REGION_SCOPE = {

  "/brazil": {

    depth: "deep",

    liveRegionCount: 10,

    regionLinks: [

      { path: "/brazil/saopaulo", label: "São Paulo" },

      { path: "/brazil/santos", label: "Santos" },

      { path: "/brazil/florianopolis", label: "Florianópolis" },

      { path: "/brazil/pantanal", label: "The Pantanal" },

      { path: "/brazil/bonito", label: "Bonito" },

      { path: "/brazil/manaus", label: "Manaus" },

      { path: "/brazil/rio", label: "Rio de Janeiro" },

      { path: "/brazil/salvador", label: "Salvador" },

      { path: "/brazil/foz", label: "Foz do Iguaçu" },

      { path: "/brazil/food-drink", label: "Food & Drink" },

    ],

  },

  "/belgium": {

    depth: "starter",

    liveRegionCount: 1,

    regionLinks: [{ path: "/belgium/antwerp", label: "Antwerp" }],

    mapHint: "Antwerp so far",

    hubNote: "Belgium is growing city by city — Antwerp is live today.",

  },

  "/greece": {

    depth: "starter",

    liveRegionCount: 1,

    regionLinks: [{ path: "/greece/athens", label: "Athens" }],

    mapHint: "Athens so far",

    hubNote: "Greece on the site begins in Athens. More routes will follow.",

  },

  "/hungary": {

    depth: "starter",

    liveRegionCount: 1,

    regionLinks: [{ path: "/hungary/budapest", label: "Budapest" }],

    mapHint: "Budapest so far",

    hubNote: "Hungary starts with Budapest — the rest of the country is still to come.",

  },

  "/austria": {

    depth: "complete",

    liveRegionCount: 3,

    regionLinks: [

      { path: "/austria/vienna", label: "Vienna" },

      { path: "/austria/salzburg", label: "Salzburg" },

      { path: "/austria/wider-country", label: "Beyond the Cities" },

    ],

    mapHint: "Vienna · Salzburg · Alps",

  },

  "/czech-republic": {

    depth: "starter",

    liveRegionCount: 2,

    regionLinks: [

      { path: "/czech-republic/bohemian-wilderness", label: "Bohemian Wilderness" },

      { path: "/czech-republic/prague", label: "Prague" },

    ],

    mapHint: "Prague · Bohemian Wilderness",

    hubNote:

      "Two regions are live on the site — Bohemian Wilderness and Prague — in the order we travelled them.",

  },

  "/united-states": {

    depth: "partial",

    liveRegionCount: 1,

    regionLinks: [{ path: "/united-states/tennessee", label: "Tennessee" }],

    mapHint: "One state · TN complete",

    hubNote:

      "One state is live on the site — Tennessee. More regions will follow.",

  },

  // Internal reference (not published on hub): Tennessee is fully covered on the site —
  // Memphis, Nashville, and the Great Smoky Mountains.
  "/united-states/tennessee": {

    depth: "complete",

    liveRegionCount: 3,

    regionLinks: [

      { path: "/united-states/tennessee/mountains", label: "Mountains" },

      { path: "/united-states/tennessee/memphis", label: "Memphis" },

      { path: "/united-states/tennessee/nashville", label: "Nashville" },

    ],

  },

};



function getLiveRegionCount(scope) {

  if (!scope?.regionLinks?.length) return 0;

  return scope.liveRegionCount ?? scope.regionLinks.length;

}



function formatRegionsMenuHint(count) {

  if (count > 3) return "multi-regions";

  return `${count} regions live`;

}



export function getSidebarRegionMenu(path) {
  const links = REGION_SCOPE[path]?.regionLinks;
  return links?.length ? { links } : null;
}



export function hasExpandableRegionMenu(path) {

  return getSidebarRegionMenu(path) !== null;

}



export function getMapHint(path) {

  return REGION_SCOPE[path]?.mapHint ?? null;

}



export function getMenuHint(path) {

  const scope = REGION_SCOPE[path];

  if (!scope) return null;

  if (scope.menuHint != null) return scope.menuHint;



  const count = getLiveRegionCount(scope);

  if (!count) return null;

  if (count === 1) return scope.regionLinks[0].label;

  return formatRegionsMenuHint(count);

}



export function getHubNote(path) {

  return REGION_SCOPE[path]?.hubNote ?? null;

}



export default REGION_SCOPE;


