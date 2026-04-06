/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'tea-red': '#8B2500',
        'tea-jade': '#2E8B57',
        'tea-gold': '#DAA520',
        'tea-cream': '#FFF8DC',
        'tea-wood': '#3E2723',
        'tea-ink': '#1A1A1A',
        'cat-green': '#4CAF50',
        'cat-white': '#E8E0D0',
        'cat-yellow': '#FFD54F',
        'cat-oolong': '#FF8F00',
        'cat-red': '#C62828',
        'cat-dark': '#3E2723',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}
