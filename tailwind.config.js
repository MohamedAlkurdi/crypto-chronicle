/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      mainBG:"#F5F6FA",
      main:"34495E",
      secondary:"93FCEC",
    },
  },
  plugins: [],
}