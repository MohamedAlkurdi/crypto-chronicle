/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainBG:"#F5F6FA",
        main:"#34495E",
        lightMain:"#496683",
        secondary:"#93FCEC",
        lightSecondary:"#D6FEF8",
        darkSecondary:"#6fc8bb",
      },
    },
  },
  plugins: [],
}