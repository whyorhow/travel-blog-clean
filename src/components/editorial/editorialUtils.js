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
