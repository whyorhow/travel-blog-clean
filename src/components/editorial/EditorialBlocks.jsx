import React from 'react';
import EditorialBlock from './EditorialBlock';

/**
 * Renders a stack of editorial blocks at a template placement slot.
 */
function EditorialBlocks({
  blocks,
  atmosphere,
  surface,
  onImageClick,
  className = '',
}) {
  if (!blocks?.length) return null;

  return (
    <section
      className={`editorial-personal-layer ${atmosphere.sectionPy} px-4 md:px-6 ${className}`}
      aria-label="Personal discoveries"
    >
      <div className={`max-w-5xl mx-auto ${atmosphere.blockGap}`}>
        {blocks.map((block, i) => {
          const blockEl = (
            <EditorialBlock
              key={block.id || `${block.type}-${i}`}
              block={block}
              atmosphere={atmosphere}
              surface={surface}
              onImageClick={onImageClick}
            />
          );

          if (block.type === 'link-banner') {
            return (
              <div
                key={block.id || `${block.type}-${i}`}
                className="relative left-1/2 w-screen max-w-none -translate-x-1/2"
              >
                {blockEl}
              </div>
            );
          }

          return blockEl;
        })}
      </div>
    </section>
  );
}

export default EditorialBlocks;
