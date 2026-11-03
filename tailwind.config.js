export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { maroon: { DEFAULT: '#5e0d1a', dark: '#3d0710', light: '#8b1c2e' }, gold: { DEFAULT: '#d4a84b', light: '#f0d58c' }, cream: '#fbf1e2' },
      fontFamily: { script: ['"Great Vibes"', 'cursive'], serif2: ['"Cormorant Garamond"', 'serif'], head: ['"Playfair Display"', 'serif'] }
    }
  },
  plugins: []
}
