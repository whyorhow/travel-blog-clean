import React from 'react';
import EditorialBlock from './EditorialBlock';
import { EDITORIAL_PLACEMENTS } from './editorialConfig';
import {
  FAVOURITE_PLACES_TITLE,
  groupFavouritePlaceRuns,
  isFavouritePlaceBlock,
  shouldShowFavouritePlacesHeading,
} from './editorialUtils';

function renderBlock(block, i, { atmosphere, surface, onImageClick, favouriteCardLayout, presentation }) {
  return (
    <EditorialBlock
      key={block.id || `${block.type}-${i}`}
      block={block}
      atmosphere={atmosphere}
      surface={surface}
      onImageClick={onImageClick}
      favouriteCardLayout={favouriteCardLayout}
      presentation={presentation}
    />
  );
}

function renderFavouritesSection(blocks, { atmosphere, surface, onImageClick, showHeading, sectionId }) {
  const groups = groupFavouritePlaceRuns(blocks);

  return (
    <section
      className="section-favourites"
      aria-label="Favourite places"
      id={sectionId || undefined}
    >
      {showHeading && <h2>{FAVOURITE_PLACES_TITLE}</h2>}
      {groups.map((group, groupIndex) =>
        group.type === 'favourites' ? (
          <div className="favourites-grid" key={`fav-grid-${groupIndex}`}>
            {group.items.map((block, i) =>
              renderBlock(block, i, {
                atmosphere,
                surface,
                onImageClick,
                favouriteCardLayout: true,
                presentation: 'default',
              }),
            )}
          </div>
        ) : (
          <div className="section-favourites__inserts space-y-10 md:space-y-12" key={`other-${groupIndex}`}>
            {group.items.map((block, i) => {
              if (block.type === 'link-banner') {
                return (
                  <div
                    key={block.id || `${block.type}-${i}`}
                    id={block.anchorId}
                    className="relative left-1/2 w-screen max-w-none -translate-x-1/2 scroll-mt-8"
                  >
                    {renderBlock(block, i, { atmosphere, surface, onImageClick })}
                  </div>
                );
              }
              if (block.anchorId) {
                return (
                  <div key={block.id || `${block.type}-${i}`} id={block.anchorId} className="scroll-mt-8">
                    {renderBlock(block, i, { atmosphere, surface, onImageClick })}
                  </div>
                );
              }
              return renderBlock(block, i, { atmosphere, surface, onImageClick });
            })}
          </div>
        ),
      )}
    </section>
  );
}

/**
 * Renders a stack of editorial blocks at a template placement slot.
 */
function EditorialBlocks({
  blocks,
  atmosphere,
  surface,
  onImageClick,
  className = '',
  placement,
}) {
  if (!blocks?.length) return null;

  const showFavouritePlacesHeading = shouldShowFavouritePlacesHeading(blocks, placement);
  const firstFavourite = blocks.find(isFavouritePlaceBlock);
  const favouriteSectionId =
    showFavouritePlacesHeading && firstFavourite?.anchorId ? firstFavourite.anchorId : null;

  if (placement === EDITORIAL_PLACEMENTS.BEFORE_BRIDGE && blocks.some(isFavouritePlaceBlock)) {
    const blocksForRender = favouriteSectionId
      ? blocks.map((block) =>
          block.anchorId === favouriteSectionId ? { ...block, anchorId: undefined } : block,
        )
      : blocks;

    return (
      <div className={className}>
        {renderFavouritesSection(blocksForRender, {
          atmosphere,
          surface,
          onImageClick,
          showHeading: showFavouritePlacesHeading,
          sectionId: favouriteSectionId,
        })}
      </div>
    );
  }

  if (placement === EDITORIAL_PLACEMENTS.AFTER_NARRATIVE) {
    return (
      <div className={className}>
        {blocks.map((block, i) => renderBlock(block, i, { atmosphere, surface, onImageClick }))}
      </div>
    );
  }

  if (placement === EDITORIAL_PLACEMENTS.BEFORE_GALLERY) {
    return (
      <div className={className}>
        {blocks.map((block, i) => {
          const presentation = block.type === 'custom-text' && block.text ? 'narrative' : 'default';
          if (block.type === 'link-banner') {
            return (
              <div
                key={block.id || `${block.type}-${i}`}
                id={block.anchorId}
                className="relative left-1/2 w-screen max-w-none -translate-x-1/2 scroll-mt-8"
              >
                {renderBlock(block, i, { atmosphere, surface, onImageClick, presentation })}
              </div>
            );
          }
          return renderBlock(block, i, { atmosphere, surface, onImageClick, presentation });
        })}
      </div>
    );
  }

  return (
    <section
      className={`editorial-personal-layer ${atmosphere.sectionPy} px-4 md:px-6 ${className}`}
      aria-label="Personal discoveries"
    >
      <div className={`max-w-5xl mx-auto ${atmosphere.blockGap}`}>
        {blocks.map((block, i) => {
          if (block.type === 'link-banner') {
            return (
              <div
                key={block.id || `${block.type}-${i}`}
                id={block.anchorId}
                className="relative left-1/2 w-screen max-w-none -translate-x-1/2 scroll-mt-8"
              >
                {renderBlock(block, i, { atmosphere, surface, onImageClick })}
              </div>
            );
          }
          if (block.anchorId) {
            return (
              <div key={block.id || `${block.type}-${i}`} id={block.anchorId} className="scroll-mt-8">
                {renderBlock(block, i, { atmosphere, surface, onImageClick })}
              </div>
            );
          }
          return renderBlock(block, i, { atmosphere, surface, onImageClick });
        })}
      </div>
    </section>
  );
}

export default EditorialBlocks;
