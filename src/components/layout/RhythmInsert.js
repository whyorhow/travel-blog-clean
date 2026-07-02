import React from 'react';

/**
 * RhythmInsert — Brief atmospheric moment between narrative beats.
 */
function RhythmInsert({ text, align = 'left', variant = 'light' }) {
  if (!text?.trim()) return null;

  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <section className="px-6 py-2" aria-label="Journal rhythm note">
      <p className={`editorial-diary-note ${alignClass}`}>{text}</p>
    </section>
  );
}

export default RhythmInsert;
