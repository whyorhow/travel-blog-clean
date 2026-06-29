import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

/** Source asset is 1024×767; tile at half width for sharp display on retina. */
export const PAPER_TEXTURE_TILE_WIDTH = 512;

/** Repeat tiling — avoids upscaling a single tile with background-size: cover on tall sections. */
export const paperTextureTiledStyle = {
  backgroundImage: `url(${paperTexture})`,
  backgroundSize: `${PAPER_TEXTURE_TILE_WIDTH}px auto`,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center top',
};

/** Immersive / country spread paper layer with torn-edge displacement. */
export function tornPaperLayerStyle(overrides = {}) {
  return {
    ...paperTextureTiledStyle,
    filter: 'url(#torn-paper-filter)',
    opacity: 0.95,
    ...overrides,
  };
}
