/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Madimi One', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/img/bg.png')"
      }
    },
  },
  plugins: [],
}

