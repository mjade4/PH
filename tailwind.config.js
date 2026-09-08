/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ocean/island palette — deliberately not the generic cream+terracotta combo.
        deep: {
          950: '#0A2A2E', // near-black teal, used for text/backgrounds
          900: '#0F3A3F',
          800: '#12484F',
        },
        lagoon: {
          600: '#0E7C7B',
          500: '#12938F',
          400: '#3BB0A8',
        },
        sand: {
          100: '#FBF6EC',
          200: '#F3E9D2',
          300: '#E9DAB4',
        },
        coral: {
          500: '#E8623F',
          600: '#D14F30',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
