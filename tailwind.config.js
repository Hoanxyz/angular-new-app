/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['"Lobster", sans-serif'],
        calistoga: ['"Calistoga", serif'],
        mali: ['"Mali", cursive'],
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
      })
      addComponents({
      })
      addUtilities({
        '.custom-item-center': {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }
      })
    })
  ],
}

