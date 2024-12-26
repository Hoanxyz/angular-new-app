/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['"Lobster", sans-serif'],
        calistoga: ['"Calistoga", serif'],
        mali: ['"Mali", cursive'],
        dancing: ['"Dancing Script", cursive'],
        sansita: ['"Sansita Swashed", system-ui']
      },
      spacing: {
        '80%': '80%',
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
        },
        '.beautiful-bg': {
          backgroundColor: '#A9C9FF',
          backgroundImage: 'linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)'
        },
        '.beautiful-bg-1': {
          backgroundColor: '#A9C9FF',
          backgroundImage: 'linear-gradient(360deg, #A9C9FF 0%, #FFBBEC 100%)'
        }
      })
    })
  ],
}

