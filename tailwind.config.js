/** @type {import('tailwindcss').Config} */
// Specify the type of the configuration as 'Config' from 'tailwindcss' module
// This comment helps TypeScript understand the structure of the configuration

import plugin from "tailwindcss/plugin"; // Import the 'plugin' function from 'tailwindcss/plugin'

// Define configuration settings
export const content = ["./src/**/*.{js,jsx,html}"]; // Specify content paths for PurgeCSS
export const theme = {
  // Define theme customization
  fontSize: {
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
    // Color palette for different task statuses
    todo: {
      bg: "#FEF4F3",
      title: "#6E1E29",
      taskNumber: "#D4AFB4",
      taskBoxBorder: "#F3E1DF",
      taskSquareBorder: "#EDD6D3",
      taskNew: "#D37A87",
    },
    doing: {
      bg: "#FFFBF2",
      title: "#795B19",
      taskNumber: "#DECCA4",
      taskBoxBorder: "#EAE2CF",
      taskSquareBorder: "#DBD2BC",
      taskNew: "#C2A25B",
    },
    done: {
      bg: "#F4F9F3",
      title: "#286C1A",
      taskNumber: "#BCD7B6",
      taskBoxBorder: "#DDEED9",
      taskSquareBorder: "#D0E7CB",
      taskNew: "#9BCD90",
    },
  },
  extend: {
    borderRadius: {
      xs: "4px",
      md: "10px",
    },
  },
};
export const plugins = [
  // Use the 'plugin' function to add custom base styles
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
];
