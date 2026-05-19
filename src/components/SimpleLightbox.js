import UnifiedLightbox from "./UnifiedLightbox";
import { isLightboxOpen } from "../utils/resolveLightboxImage";

/**
 * Template / narrative lightbox (minimal chrome).
 * @deprecated Prefer UnifiedLightbox directly.
 */
export default function SimpleLightbox({
  images = [],
  currentIndex,
  setCurrentIndex,
  layout = "default",
}) {
  if (!isLightboxOpen(currentIndex)) return null;

  return (
    <UnifiedLightbox
      images={images}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      variant="minimal"
      layout={layout}
    />
  );
}
