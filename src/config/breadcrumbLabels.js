/** Human-readable breadcrumb labels for URL path segments */
export const BREADCRUMB_LABELS = {
  brazil: "Brazil",
  rio: "Rio de Janeiro",
  saopaulo: "São Paulo",
  "street-art": "Street Art",
  "green-spaces": "Green Spaces",
  galleries: "Galleries",
  carnival: "Carnival",
  salvador: "Salvador",
  pantanal: "Pantanal",
  florianopolis: "Florianópolis",
  bonito: "Bonito",
  foz: "Iguazu Falls",
  manaus: "Manaus",
  "ilha-grande": "Ilha Grande",
  "food-drink": "Food & Drink",
  "natural-spaces": "Natural Spaces",
  santos: "Santos",
  belgium: "Belgium",
  antwerp: "Antwerp",
  greece: "Greece",
  athens: "Athens",
  hungary: "Hungary",
  budapest: "Budapest",
  "united-states": "United States",
  tennessee: "Tennessee",
  nashville: "Nashville",
  memphis: "Memphis",
  mountains: "Great Smoky Mountains",
  "nomads-gallery": "Nomads Gallery",
  "nomads-shop": "Nomads Shop",
  "contact-us": "Contact",
};

export function labelForSegment(segment) {
  if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment];
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
