/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './apps/system-health-frontend/src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#0090D4',
      },
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
