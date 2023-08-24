/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    fontSize: {
      "4xl": "34px",
      xl: "16px",
      lg: "15px",
      md: "13px",
      sm: "12px",
    },
    fontFamily: {
      inter: ["Inter"],
    },
    colors: {
      fontPrimary: "#3A3A3A",
      white: "white",
      blue: "blue",
      todo: {
        bg: "#FEF4F3",
        title: "#6E1E29",
        taskNumber: "#D4AFB4",
        taskBoxBorder: "#F3E1DF",
        taskSquareBorder: "#EDD6D3",
        taskDelete: "#F4C5CB",
        taskNew: "#D37A87",
      },
      doing: {
        bg: "#FFFBF2",
        title: "#795B19",
        taskNumber: "#DECCA4",
        taskBoxBorder: "#EAE2CF",
        taskSquareBorder: "#DBD2BC",
        taskDelete: "#F4C5CB", // temp
        taskNew: "#C2A25B",
      },
      done: {
        bg: "#F4F9F3",
        title: "#286C1A",
        taskNumber: "#BCD7B6",
        taskBoxBorder: "#DDEED9",
        taskSquareBorder: "#D0E7CB",
        taskSquareTick: "#9BCD90",
        taskDelete: "#F4C5CB", // temp
        taskNew: "#9BCD90",
      },
    },
    extend: {
      borderRadius: {
        xs: "4px",
        md: "10px",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        h1: {
          color: "#3A3A3A",
          fontSize: "34px",
          lineHeight: "41.15px",
          fontWeight: 700,
        },
        h3: {
          fontSize: "15px",
          lineHeight: "18.15px",
          fontWeight: 600,
        },
        h5: {
          color: "#3A3A3A",
          fontSize: "15px",
          lineHeight: "30px",
          fontWeight: 500,
        },
      });
    }),
  ],
};
