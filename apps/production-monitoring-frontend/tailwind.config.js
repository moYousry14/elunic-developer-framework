/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: [
    './apps/frontend/src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0090D4',
        'sio-blue': '#0090D4',
        'sio-dark': '#333333',
        'sio-gray': '#ececec',
      },
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
