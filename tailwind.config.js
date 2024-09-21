/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        customGreen: '#1F352C', // Define el color personalizado
      },
    },
  },
  darkMode: "class",

  plugins: [ nextui()],
}

