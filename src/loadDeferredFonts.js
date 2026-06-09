/** Non-critical weights + handwriting font — not needed for homepage first paint */
export function loadDeferredFonts() {
  return Promise.all([
    import("@fontsource/cormorant-garamond/300.css"),
    import("@fontsource/cormorant-garamond/500.css"),
    import("@fontsource/dancing-script/400.css"),
    import("@fontsource/dancing-script/500.css"),
    import("@fontsource/dancing-script/600.css"),
    import("@fontsource/dancing-script/700.css"),
  ]);
}
