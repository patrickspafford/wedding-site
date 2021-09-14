/*
const colors = {
    honeydew: '#F1FFE7',
    charcoal: '#03120E',
    charcoalRgb: '4,15,12',
    brownGreen: '#6E633D',
    green: '#708D81',
    forest: '#3A4F41',
    moss: '#9D9C62',
    white: '#FFFFFF',
    whiteRgb: '255,255,255',
    yellow: '#FFFF00',
    black: '#000',
}
*/

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        charcoal: '#03120E',
        brownGreen: '#6E633D',
        green: '#708D81',
        forest: '#3A4F41',
        moss: '#9D9C62',
      },
      fontFamily: {
        'paris': ['Paris']
      }
    }, 
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
