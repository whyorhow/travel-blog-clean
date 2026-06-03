import { FILMSTRIP_3H_CUSTOM_01 } from "./filmstrip3HCustom01";
import { FILMSTRIP_4H_CUSTOM_01 } from "./filmstrip4HCustom01";
import { FILMSTRIP_4H_CUSTOM_02 } from "./filmstrip4HCustom02";
import { FILMSTRIP_5H_CUSTOM_01 } from "./filmstrip5HCustom01";
import { FILMSTRIP_6H_CUSTOM_01 } from "./filmstrip6HCustom01";

const TEMPLATES = {
  [FILMSTRIP_3H_CUSTOM_01.id]: FILMSTRIP_3H_CUSTOM_01,
  [FILMSTRIP_4H_CUSTOM_01.id]: FILMSTRIP_4H_CUSTOM_01,
  [FILMSTRIP_4H_CUSTOM_02.id]: FILMSTRIP_4H_CUSTOM_02,
  [FILMSTRIP_5H_CUSTOM_01.id]: FILMSTRIP_5H_CUSTOM_01,
  [FILMSTRIP_6H_CUSTOM_01.id]: FILMSTRIP_6H_CUSTOM_01,
};

export function getFilmstripTemplate(templateId) {
  return TEMPLATES[templateId] ?? null;
}

export function mergeFilmstripTemplate(baseConfig, templateId) {
  const template = getFilmstripTemplate(templateId);
  if (!template) return baseConfig;
  return { ...baseConfig, ...template };
}
