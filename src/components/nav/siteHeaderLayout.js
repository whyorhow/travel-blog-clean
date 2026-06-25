/** Shared fixed header dimensions (non-home pages). */
export const SITE_HEADER_HEIGHT_CLASS = "h-14";
export const SITE_HEADER_OFFSET_CLASS = "pt-14";
export const SITE_HEADER_PX = 56;
export const SITE_HEADER_ICON_BTN_CLASS =
  "flex h-14 w-14 shrink-0 items-center justify-center";
/** Tighter clustered tap targets — icon artwork is smaller than full button width. */
export const CLUSTER_BTN_CLASS =
  "flex h-14 w-10 sm:w-11 shrink-0 items-center justify-center";
export const CLUSTER_TIGHT_SPACING_CLASS = "-space-x-3";
export const BURGER_LOWER_NUDGE_CLASS = "translate-y-[1px]";
export const BURGER_ICON_CLASS =
  "w-8 h-8 sm:w-9 sm:h-9 overflow-visible translate-y-1 -translate-x-0.5";
export const SEARCH_ICON_CLASS =
  "w-[1.4rem] h-[1.4rem] sm:w-[1.575rem] sm:h-[1.575rem] overflow-visible -translate-y-0.5 translate-x-0.5";
export const NAV_CLUSTER_CLASS = `fixed z-[10000] flex items-center ${CLUSTER_TIGHT_SPACING_CLASS} top-0 right-0 ${SITE_HEADER_HEIGHT_CLASS}`;
