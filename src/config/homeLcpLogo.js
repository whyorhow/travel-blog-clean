/** Homepage LCP logo — keep in sync with public/index.html static shell */
export const HOME_LCP_LOGO = {
  src: '/assets/LogoV6-800.webp',
  srcSet: '/assets/LogoV6-800.webp 800w, /assets/LogoV6-1200.webp 1200w',
  sizes: '(max-width: 768px) 95vw, 56rem',
  width: 1200,
  height: 171,
  preload: '/assets/LogoV6-800.webp',
};

/** Hero min-height reserves space on desktop so deferred content does not shift layout */
export const HOME_HERO_CLASS =
  'relative z-50 flex flex-col items-center justify-start min-h-[65vh] md:min-h-[1100px] text-center px-4 pt-8 md:pt-16 pb-8 md:pb-0';
