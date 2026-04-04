/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#090c07',
        surface: '#111510',
        card:    '#161a0e',
        ember:   '#c4793a',
        glacier: '#6bafc8',
        forest:  '#4e7a55',
        gold:    '#c4a255',
        birch:   '#d0b890',
        stone:   '#8a9c82',
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
