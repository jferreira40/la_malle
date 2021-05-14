const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'custom': "0px 0px 16px rgba(222, 222, 222, 1);"
      },
      borderRadius: {
        sm: "5px",
        DEFAULT: "11px"
      },
      colors: {
        black: "#000000",
        darkBlue: "#0D25B9",
        blue: "#4A7AE8",
        lightBlue: "#99A3E2",
        red: "#EA6767",
        pink: "#FD6885",
        darkGray: "#818181",
        gray: "#E9E9E9",
        lightGray: "#F5F5F5",
        white: "#FFFFFF",
        yellow: "#FFD45D",
        spy: "#6879E2",
        wolf: "#9162C1",
        survive: "#E2AE68",
      },
      fontFamily: {
        sans: ['Red Hat Text', ...defaultTheme.fontFamily.sans],
      },
      width: {
         '1/3:m': '29.52%',
       }
      },
      outline: {
        blue: '1px solid #0D25B9',
      }
  },
  variants: {
    extend: {
      margin: ['last']
    },
  },
  plugins: [],
}