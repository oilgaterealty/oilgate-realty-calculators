/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ogr: {
          navy: '#1E2D40',
          'navy-dark': '#14202E',
          'navy-light': '#2B3D52',
          gold: '#C8973A',
          'gold-light': '#DDB55A',
          bg: '#F4F6F9',
          'bg-alt': '#EEF1F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
