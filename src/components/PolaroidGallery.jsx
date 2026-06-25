import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CloudinaryImage from './CloudinaryImage';
import { staggerContainer, fadeScale } from '../utils/animations';

/** Deterministic tilts — mostly anti-clockwise; capped so corners don't reach intro copy above. */
const ROTATIONS = [-6, 8, 2.5, -7.5, -3.5, -9, -5.5, -2, -8, 10, 5, -12];

/** Per-card jitter + stacking order — horizontal overlap only; ty stays ≥ 0 so cards never climb into text. */
const SCATTER = [
  { tx: 0, ty: 0, z: 6 },
  { tx: -24, ty: 10, z: 11 },
  { tx: 28, ty: 6, z: 3 },
  { tx: -32, ty: 14, z: 9 },
  { tx: 22, ty: 10, z: 1 },
  { tx: -56, ty: 38, z: 12 },
  { tx: 34, ty: 8, z: 5 },
  { tx: -28, ty: 16, z: 8 },
  { tx: 16, ty: 4, z: 2 },
  { tx: 34, ty: 75, z: 10 },
  { tx: -16, ty: 72, z: 4 },
  { tx: -8, ty: 12, z: 20 },
];

/** Tighter scatter for mobile signature cluster (4 cards) — no upward offset (avoids overlapping intro text). */
const SCATTER_MOBILE = [
  { tx: 0, ty: 4, z: 8 },
  { tx: -16, ty: 10, z: 12 },
  { tx: 18, ty: 6, z: 6 },
  { tx: -12, ty: 20, z: 10 },
];

/** Gentler tilts on mobile so rotated corners don't clip into copy above. */
const ROTATIONS_MOBILE = [-4, 5, -2, 6];

function PolaroidCard({ item, rotation, scatter, onSelect, compact }) {
  const [hovered, setHovered] = useState(false);
  const isInteractive = Boolean(onSelect && item.focusTarget);

  const baseTransform = `translate(${scatter.tx}px, ${scatter.ty}px) rotate(${rotation}deg)`;
  const hoverTransform = `translate(${scatter.tx}px, ${scatter.ty}px) rotate(0deg) scale(1.05)`;

  const frameProps = {
    className: `relative bg-white shadow-[0_4px_14px_rgba(0,0,0,0.16),0_1px_4px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_14px_32px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.1)] ${
      isInteractive ? 'cursor-pointer' : ''
    }`,
    style: {
      padding: compact ? '5px 5px 20px' : '6px 6px 26px',
      transform: hovered ? hoverTransform : baseTransform,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    ...(isInteractive
      ? {
          role: 'button',
          tabIndex: 0,
          onClick: () => onSelect(item),
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onSelect(item);
            }
          },
          'aria-label': `Go to ${item.alt}`,
        }
      : {}),
  };

  const cardWidth = compact ? 148 : 176;

  return (
    <motion.div
      variants={fadeScale}
      className={`relative shrink-0 ${
        compact
          ? 'w-[148px] -mr-[24px] -mb-[36px]'
          : 'w-[176px] -mr-[32px] -mb-[52px] sm:-mr-[36px] sm:-mb-[56px]'
      }`}
      style={{ zIndex: hovered ? 100 : scatter.z }}
    >
      <div {...frameProps}>
        <CloudinaryImage
          legacyPath={item.src}
          alt={item.alt}
          sizes={compact ? '(max-width: 768px) 38vw, 148px' : '(max-width: 768px) 36vw, (max-width: 1024px) 24vw, 176px'}
          widths={compact ? [148, 296] : [176, 352, 528]}
          width={cardWidth}
          height={cardWidth}
          className="block w-full aspect-square object-cover"
        />
      </div>
    </motion.div>
  );
}

/**
 * Overlapping polaroid cluster — white frame, thick bottom chin, soft shadow, scattered tilt.
 * On mobile, shows a tight signature cluster (default 4) to reduce scroll before interactions.
 */
function PolaroidGallery({ images, className = '', onSelect, mobileLimit = 4 }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (event) => setIsMobile(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!images?.length) return null;

  const compact = isMobile && mobileLimit > 0;
  const displayImages = compact ? images.slice(0, mobileLimit) : images;

  return (
    <motion.div
      className={`flex flex-wrap justify-center mx-auto overflow-visible px-2 sm:px-4 ${
        compact
          ? 'max-w-[340px] pt-2 pb-8'
          : 'max-w-[520px] sm:max-w-[720px] md:max-w-[860px] lg:max-w-[960px] pt-6 sm:pt-8 pb-12 sm:pb-14'
      } ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {displayImages.map((item, index) => (
        <PolaroidCard
          key={item.id}
          item={item}
          rotation={(compact ? ROTATIONS_MOBILE : ROTATIONS)[index % (compact ? ROTATIONS_MOBILE.length : ROTATIONS.length)]}
          scatter={(compact ? SCATTER_MOBILE : SCATTER)[index % (compact ? SCATTER_MOBILE.length : SCATTER.length)]}
          onSelect={onSelect}
          compact={compact}
        />
      ))}
    </motion.div>
  );
}

export default PolaroidGallery;
