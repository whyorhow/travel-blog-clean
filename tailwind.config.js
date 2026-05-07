/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all React components
    "./public/index.html"          // main HTML entry
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand
        gold: '#B8860B',
        
        // Text on dark backgrounds
        darkText: '#E5CF6B',
        
        // Text on light/paper backgrounds  
        lightText: '#101E0E',
        primaryText: '#0e1406',
        
        // Neutral text scale (body copy progression)
        'text-primary': '#222',
        'text-secondary': '#333',
        'text-tertiary': '#444',
        'text-muted': '#555',
        'text-subtle': '#666',
        
        // Backgrounds
        'paper': '#f5f0e8',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        handwriting: ['Dancing Script', 'cursive'],
      },
      fontSize: {
        // Editorial typography scale
        'hero': ['4rem', { lineHeight: '1.1', fontWeight: '600' }],
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'subsection': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'lead': ['1.5rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
      },
      spacing: {
        // Editorial spacing scale
        'bridge': '3rem',
        'section': '1.5rem',
      },
      borderRadius: {
        'image': '0.5rem',
      },
      boxShadow: {
        'image': '0 4px 6px rgba(0,0,0,0.1)',
        'card': '0 4px 6px rgba(0,0,0,0.1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
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
