import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CloudinaryImage from './CloudinaryImage';
import { staggerContainer, fadeScale } from '../utils/animations';

/** Deterministic tilts — mostly anti-clockwise, a few clockwise for contrast. */
const ROTATIONS = [-6, 20, 2.5, -7.5, -3.5, -9, -5.5, -2, -8, 15, 5, -20];

/** Per-card jitter + stacking order — wider horizontal spread. */
const SCATTER = [
  { tx: 0, ty: 0, z: 6 },
  { tx: -24, ty: -44, z: 11 },
  { tx: 28, ty: -8, z: 3 },
  { tx: -32, ty: -2, z: 9 },
  { tx: 22, ty: 10, z: 1 },
  { tx: -56, ty: 38, z: 12 },   // outlier — lower left
  { tx: 34, ty: -6, z: 5 },
  { tx: -28, ty: -10, z: 8 },
  { tx: 16, ty: 4, z: 2 },
  { tx: 34, ty: 75, z: 10 },   // #10
  { tx: -16, ty: 72, z: 4 },    // outlier — lower right (#11)
  { tx: -8, ty: -4, z: 20 },   // #12 — top layer
];

function PolaroidCard({ item, rotation, scatter, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isInteractive = Boolean(onSelect && item.focusTarget);

  const baseTransform = `translate(${scatter.tx}px, ${scatter.ty}px) rotate(${rotation}deg)`;
  const hoverTransform = `translate(${scatter.tx}px, ${scatter.ty}px) rotate(0deg) scale(1.05)`;

  const frameProps = {
    className: `relative bg-white shadow-[0_4px_14px_rgba(0,0,0,0.16),0_1px_4px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_14px_32px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.1)] ${
      isInteractive ? 'cursor-pointer' : ''
    }`,
    style: {
      padding: '6px 6px 26px',
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

  return (
    <motion.div
      variants={fadeScale}
      className="relative shrink-0 w-[176px] -mr-[32px] -mb-[52px] sm:-mr-[36px] sm:-mb-[56px]"
      style={{ zIndex: hovered ? 100 : scatter.z }}
    >
      <div {...frameProps}>
        <CloudinaryImage
          legacyPath={item.src}
          alt={item.alt}
          sizes="(max-width: 768px) 36vw, (max-width: 1024px) 24vw, 176px"
          widths={[176, 352, 528]}
          className="block w-full aspect-square object-cover"
        />
      </div>
    </motion.div>
  );
}

/**
 * Overlapping polaroid cluster — white frame, thick bottom chin, soft shadow, scattered tilt.
 */
function PolaroidGallery({ images, className = '', onSelect }) {
  if (!images?.length) return null;

  return (
    <motion.div
      className={`flex flex-wrap justify-center max-w-[520px] sm:max-w-[720px] md:max-w-[860px] lg:max-w-[960px] mx-auto overflow-visible px-2 sm:px-4 pb-12 sm:pb-14 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {images.map((item, index) => (
        <PolaroidCard
          key={item.id}
          item={item}
          rotation={ROTATIONS[index % ROTATIONS.length]}
          scatter={SCATTER[index % SCATTER.length]}
          onSelect={onSelect}
        />
      ))}
    </motion.div>
  );
}

export default PolaroidGallery;
