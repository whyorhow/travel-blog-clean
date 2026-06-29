import { EDITORIAL_PLACEMENTS } from './editorialConfig';

/**
 * Normalise editorialBlocks — supports flat blocks or grouped { placement, blocks[] }.
 */
export function normalizeEditorialBlocks(editorialBlocks) {
  if (!editorialBlocks?.length) return [];

  if (editorialBlocks[0]?.blocks && Array.isArray(editorialBlocks[0].blocks)) {
    return editorialBlocks.flatMap((group) =>
      (group.blocks || []).map((block) => ({
        ...block,
        placement: block.placement ?? group.placement ?? EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
        afterNarrativeIndex:
          block.afterNarrativeIndex ?? group.afterNarrativeIndex,
      }))
    );
  }

  return editorialBlocks.map((block) => ({
    ...block,
    placement: block.placement ?? EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
  }));
}

export const DO_THIS_AGAIN_TITLE = "We'd Do This Again";

/** Target word count for do-this-again copy (single paragraph, experience-led). */
export const DO_THIS_AGAIN_WORD_MIN = 40;
export const DO_THIS_AGAIN_WORD_MAX = 80;

/**
 * Recurring editorial block — "We'd Do This Again"
 *
 * Purpose: one small, authentic habit or pacing decision from the trip.
 * Tone: quiet, reflective, notebook-like — not guide advice or tips.
 *
 * Placement: AFTER_NARRATIVE, before BEFORE_BRIDGE (Favourite Places).
 *
 * Visual: low-emphasis margin annotation — never a feature card (see EditorialBlock).
 *
 * Content hierarchy on destination pages:
 *   Narrative → how it unfolded
 *   We'd Do This Again → how it was lived
 *   Favourite Places → what remains
 *   Looking Back → how it is remembered
 *
 * @param {string | string[]} text — one paragraph (40–80 words). Arrays are joined in dev with a warning.
 */
export function doThisAgainBlock(text) {
  const paragraph = Array.isArray(text) ? text.filter(Boolean).join(' ') : String(text ?? '').trim();

  if (process.env.NODE_ENV === 'development' && paragraph) {
    const words = paragraph.split(/\s+/).length;
    if (words < DO_THIS_AGAIN_WORD_MIN || words > DO_THIS_AGAIN_WORD_MAX) {
      console.warn(
        `[doThisAgainBlock] Expected ${DO_THIS_AGAIN_WORD_MIN}–${DO_THIS_AGAIN_WORD_MAX} words, got ${words}.`,
      );
    }
    if (Array.isArray(text) && text.length > 1) {
      console.warn('[doThisAgainBlock] Use a single paragraph — arrays are merged automatically.');
    }
    if (/\b(you should|you must|must visit|best time to|don't miss)\b/i.test(paragraph)) {
      console.warn('[doThisAgainBlock] Avoid instructive guide-style phrasing.');
    }
  }

  return {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'do-this-again',
    text: paragraph,
  };
}

export function getBlocksForPlacement(allBlocks, placement, afterNarrativeIndex) {
  return allBlocks.filter((block) => {
    const p = block.placement ?? EDITORIAL_PLACEMENTS.AFTER_NARRATIVE;

    if (
      p === EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES ||
      p === 'between-narratives'
    ) {
      if (placement !== EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES && placement !== 'between-narratives') {
        return false;
      }
      const idx = block.afterNarrativeIndex ?? 0;
      return idx === afterNarrativeIndex;
    }

    return p === placement;
  });
}

export const FAVOURITE_PLACES_TITLE = 'Favourite Places';

const FAVOURITE_PLACE_TYPES = new Set(['favourite-place', 'favourite-cafe', 'favourite-bar']);

/** Structured memory card blocks grouped under the Favourite Places section heading. */
export function isFavouritePlaceBlock(block) {
  return FAVOURITE_PLACE_TYPES.has(block?.type);
}

/** Auto-inject the required section heading before the first favourite card at before-bridge. */
export function shouldShowFavouritePlacesHeading(blocks, placement) {
  if (placement !== EDITORIAL_PLACEMENTS.BEFORE_BRIDGE) return false;
  if (!blocks.some(isFavouritePlaceBlock)) return false;
  return !blocks.some(
    (block) =>
      (block.type === 'section-heading' || block.type === 'custom-text') &&
      block.title === FAVOURITE_PLACES_TITLE,
  );
}

/** Group before-bridge blocks into favourite runs vs other editorial inserts. */
export function groupFavouritePlaceRuns(blocks) {
  const groups = [];
  let current = null;

  const flush = () => {
    if (current?.items.length) groups.push(current);
    current = null;
  };

  for (const block of blocks) {
    if (block.type === 'breathing-space') continue;

    if (isFavouritePlaceBlock(block)) {
      if (current?.type !== 'favourites') {
        flush();
        current = { type: 'favourites', items: [] };
      }
      current.items.push(block);
      continue;
    }

    if (current?.type !== 'other') {
      flush();
      current = { type: 'other', items: [] };
    }
    current.items.push(block);
  }

  flush();
  return groups;
}
