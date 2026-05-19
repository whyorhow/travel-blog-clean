/** Gentle 2D arc along the strip — centre lifts, ends sit lower */
export function getFilmWaveStyle(index, total, stripIndex = 0, scale = 1) {
  const t = total <= 1 ? 0.5 : index / (total - 1);
  const bow = Math.sin((t - 0.5) * Math.PI);
  const ripple = Math.sin(t * Math.PI * 2 + stripIndex * 0.9) * 0.35;
  const y = (bow * -10 + ripple * 4) * scale;
  const rotate = bow * 1.8 * scale;
  return {
    transform: `translateY(${y.toFixed(2)}px) rotate(${rotate.toFixed(2)}deg)`,
  };
}
