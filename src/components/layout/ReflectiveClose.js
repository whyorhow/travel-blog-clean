import React from "react";
import { tw, tokens } from "../../styles";

/**
 * SURFACE VARIANT MAPPING
 */
const SURFACE_MAP = {
  light: {
    text: tw.textTertiary,
    gold: tokens.colors.gold,
  },
  dark: {
    text: tw.textSecondaryDark,
    gold: tokens.colors.rio?.gold || tokens.colors.gold,
  },
  paper: {
    text: tw.surface.paper.body,
    gold: "#8C6A2A", // Muted paper gold (matches tw.surface.paper.accent)
  },
};

/**
 * ReflectiveClose — Emotional landing at page end
 *
 * Highlighted block with gold left border.
 * Memorable concluding moment.
 *
 * @param {string} text — Closing reflection
 * @param {boolean} [useHandwriting=false] — Use handwriting font (only if not used elsewhere on page)
 * @param {string} [variant='light'] — 'light', 'dark', or 'paper' background
 * @param {string} [accentColor] — Override accent color (defaults to surface gold)
 */
function ReflectiveClose({
  text,
  useHandwriting = false,
  variant = "light",
  accentColor,
}) {
  const paragraphs = Array.isArray(text)
    ? text.filter(Boolean)
    : text?.trim()
      ? [text.trim()]
      : [];
  if (!paragraphs.length) return null;

  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const gold = accentColor || surface.gold;
  const textColor = surface.text;
  const bgStyle = { backgroundColor: `${gold}1A` }; // 10% opacity hex
  const borderStyle = { borderLeft: `4px solid ${gold}` };
  const bodyClass = `${textColor} ${
    variant === "dark" || variant === "paper"
      ? "text-base sm:text-lg md:text-xl leading-[1.7]"
      : "text-lg md:text-xl leading-relaxed"
  } ${useHandwriting ? "font-handwriting" : ""}`;

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-center">
      <div
        className="p-6 md:p-7 rounded-lg"
        style={{ ...bgStyle, ...borderStyle }}
      >
        {paragraphs.map((paragraph, i) => (
          <p key={i} className={`${bodyClass}${i > 0 ? " mt-4" : ""}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default ReflectiveClose;
