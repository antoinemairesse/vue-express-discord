/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        font_15: '.9375rem'
      },
      backgroundImage: {
        'login': "url('/src/assets/bg.svg')",
        'profile': "url('/src/assets/profile.svg')"
      },
      colors:{
        'white_500': '#E7F0FE',
        'label': '#B9BBBE',
        'light_gray_300': '#42464E',
        'light_gray_400': '#3B3F44',
        'gray_200': '#72767D',
        'gray_400': '#42464E',
        'gray_500': '#96989D',
        'gray_600': '#36393F',
        'gray_700': '#2E3136',
        'gray_800': '#282B2F',
        'gray_900': '#202225',
        'green': '#3BA55D',
        'purple': '#5865F2',
        'link': '#00AFF4',
        'dark': '#18191C',
      }
    },
  },
  plugins: [],
}
