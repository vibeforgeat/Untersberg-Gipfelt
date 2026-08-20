module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: { sand: '#FAF6EE', card: '#F0EAE1', forest: '#1E382B', gold: '#D9A036', ink: '#1C201D', moss: '#718B73', line: '#DED5C8' },
      fontFamily: { display: ['Georgia'], sans: ['System'] }
    }
  },
  plugins: []
};
