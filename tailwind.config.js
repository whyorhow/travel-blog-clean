/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all React components
    "./public/index.html"          // main HTML entry
  ],
  theme: {
    extend: {
      colors: {
        darkText: '#E5CF6B',   // text on dark backgrounds
        lightText: '#101E0E',  // text on light backgrounds
        primaryText: '#0e1406', // existing soft dark green
      },
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],      // existing font
        handwriting: ['Dancing Script', 'cursive'], // new handwriting font
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom, #575E38, #292D18)', // new global gradient
        'paper-texture': "url('./assets/Backgrounds/PaperTexture.jpg')",
        'art-gallery': "url('/images/ArtGalleryBackground.jpg')",
        'carnival': "url('/images/CarnivalBackground.jpg')",
        'murals': "url('/images/muralbackground.jpg')",
        'parks': "url('/images/ParkBackdrop.jpg')",
        'beach': "url('/images/beach.jpg')",
        'brazil-tiles': "url('/images/BrazilFlag2.jpg')",
        'brazil-main': "url('/images/Brazil/BrazilBack.png')",
      },
      keyframes: {
        slideBounce: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '80%': { transform: 'translateY(-10px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        drawPath: {
          '0%': {
            strokeDashoffset: '200',
            opacity: '0',
          },
          '20%': {
            opacity: '0.4',
          },
          '100%': {
            strokeDashoffset: '0',
            opacity: '0.5',
          },
        },
      },
      animation: {
        slideBounce: 'slideBounce 0.6s ease-out',
        drawPath: 'drawPath 2.8s ease-out 0.4s forwards',
      },
    },
  },
  safelist: [
    '-mt-[380px]',
    '-mt-[240px]',
    'sm:-mt-[240px]',
  ],
  plugins: [],
};
