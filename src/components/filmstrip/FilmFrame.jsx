import React from "react";
import FilmStripImage, {
  FILMSTRIP_COMPACT_SIZES,
  FILMSTRIP_COMPACT_WIDTHS,
  FILMSTRIP_EXPANDED_SIZES,
  FILMSTRIP_EXPANDED_WIDTHS,
  FILMSTRIP_LIGHTBOX_SIZES,
  FILMSTRIP_LIGHTBOX_WIDTHS,
} from "./FilmStripImage";
import { getFilmWaveStyle } from "../../utils/filmStripWave";

const MAGNIFY_ICON = "/assets/Magnifyv2.svg";

export function FilmFrame({
  image,
  onOpen,
  waveIndex,
  waveTotal,
  stripIndex,
  variant = "expanded",
  waveScale = 1,
  preferThumbnails = false,
  forceBlogSource = false,
  widths: widthsOverride,
  sizes: sizesOverride,
  quality: qualityOverride,
}) {
  const wave = waveScale
    ? getFilmWaveStyle(waveIndex, waveTotal, stripIndex, waveScale)
    : undefined;
  const isCompact = variant === "compact";
  const isLightbox = variant === "lightbox";

  const windowEl = (
    <div
      className={`film-strip-window${isCompact ? " film-strip-window--compact" : ""}${
        isLightbox ? " film-strip-window--lightbox" : ""
      }`}
    >
      <FilmStripImage
        cloudinary={image.cloudinary}
        alt={image.title || "Archive photograph"}
        isCompact={isCompact}
        preferThumbnails={preferThumbnails}
        forceBlogSource={forceBlogSource}
        className="film-strip-window__img"
        sizes={
          sizesOverride ??
          (isCompact
            ? FILMSTRIP_COMPACT_SIZES
            : isLightbox
              ? FILMSTRIP_LIGHTBOX_SIZES
              : FILMSTRIP_EXPANDED_SIZES)
        }
        widths={
          widthsOverride ??
          (isCompact
            ? FILMSTRIP_COMPACT_WIDTHS
            : isLightbox
              ? FILMSTRIP_LIGHTBOX_WIDTHS
              : FILMSTRIP_EXPANDED_WIDTHS)
        }
        quality={qualityOverride}
      />
      <div className="film-strip-emulsion" aria-hidden />
      <div className="film-grain-overlay absolute inset-0 z-[1]" aria-hidden />
    </div>
  );

  if (isCompact) {
    return (
      <div className="film-strip-cell film-strip-cell--compact" style={wave} aria-hidden>
        {windowEl}
      </div>
    );
  }

  if (isLightbox) {
    const label = image.title ? `View ${image.title}` : "View photograph";
    return (
      <div className="film-strip-cell film-strip-cell--lightbox group" style={wave}>
        {windowEl}
        <button
          type="button"
          className="film-strip-enlarge-hit"
          onClick={() => onOpen?.(image)}
          aria-label={label}
        >
          <img src={MAGNIFY_ICON} alt="" className="film-strip-enlarge-hit__icon" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="film-strip-cell group"
      style={wave}
      onClick={() => onOpen?.(image)}
      aria-label={image.title ? `View ${image.title}` : "View photograph"}
    >
      {windowEl}
    </button>
  );
}

export function FilmNoteFrame({
  text,
  subtext,
  waveIndex,
  waveTotal,
  stripIndex,
  variant = "expanded",
  waveScale = 1,
}) {
  const wave = waveScale
    ? getFilmWaveStyle(waveIndex, waveTotal, stripIndex, waveScale)
    : undefined;
  const isCompact = variant === "compact";
  const isLightbox = variant === "lightbox";

  return (
    <div
      className={`film-strip-cell film-strip-cell--note${isCompact ? " film-strip-cell--compact" : ""}${
        isLightbox ? " film-strip-cell--lightbox" : ""
      }`}
      style={wave}
      aria-hidden
    >
      <div className="film-strip-window">
        <p
          className={`font-handwriting text-stone-700 text-center leading-snug ${
            isCompact ? "text-[10px]" : isLightbox ? "text-xs" : "text-sm"
          }`}
        >
          {text}
        </p>
        {subtext && !isCompact && !isLightbox && (
          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-warmMuted font-cormorant text-center">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
