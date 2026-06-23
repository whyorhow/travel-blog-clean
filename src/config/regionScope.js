/**
 * Honest geography labels (P1-3) — set expectations when a country hub is still thin.
 */
const REGION_SCOPE = {
  "/brazil": { depth: "deep" },
  "/belgium": {
    depth: "starter",
    menuHint: "Antwerp",
    mapHint: "Antwerp so far",
    hubNote: "Belgium is growing city by city — Antwerp is live today.",
  },
  "/greece": {
    depth: "starter",
    menuHint: "Athens",
    mapHint: "Athens so far",
    hubNote: "Greece on the site begins in Athens — more routes will follow.",
  },
  "/hungary": {
    depth: "starter",
    menuHint: "Budapest",
    mapHint: "Budapest so far",
    hubNote: "Hungary starts with Budapest — the rest of the country is still to come.",
  },
  "/austria": {
    depth: "complete",
    menuHint: "3 regions live",
    mapHint: "Vienna · Salzburg · Alps",
  },
  "/united-states": {
    depth: "partial",
    menuHint: "one state live",
    mapHint: "One state · TN complete",
    hubNote:
      "The United States archive is still growing. Tennessee is complete here — Memphis, Nashville, and the Smokies — with more states to come.",
  },
  "/united-states/tennessee": {
    depth: "complete",
    menuHint: "complete",
    hubNote:
      "Tennessee is fully covered on the site — Memphis, Nashville, and the Great Smoky Mountains.",
  },
};

export function getMapHint(path) {
  return REGION_SCOPE[path]?.mapHint ?? null;
}

export function getMenuHint(path) {
  return REGION_SCOPE[path]?.menuHint ?? null;
}

export function getHubNote(path) {
  return REGION_SCOPE[path]?.hubNote ?? null;
}

export default REGION_SCOPE;
