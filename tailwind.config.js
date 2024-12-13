/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./Views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        beige: "#DAC4A2",
        lightBrown: "#BD9B65",
        darkBrown: "#856828",
      },
    },
  },
  plugins: [],
};
