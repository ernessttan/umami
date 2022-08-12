/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/pages/**/*.{html,js}', './src/components/**/*.{html,js}', './public/index.html'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'orange-100': '#F7C3AF',
        'orange-300': '#F3A080',
        'orange-500': '#EC6C3A',
        'orange-700': '#DE4E15',
        'orange-900': '#C64513',
        'grey-100': '#E8E8E8',
        'grey-300': '#D2D2D2',
        'grey-500': '#A6A6A6',
        'grey-700': '#636363',
        'grey-900': '#373737',
        'textbox-grey': 'rgba(232, 232, 232, 0.6)',
        'navbar-fill': '#FBFAF9',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'class',
  })],
};
