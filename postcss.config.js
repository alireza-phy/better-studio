// Import the 'tailwindcss' module
const tailwindcss = require("tailwindcss");

// Export PostCSS configuration
module.exports = {
  // List of PostCSS plugins to use
  plugins: [
    "postcss-preset-env", // Use the 'postcss-preset-env' plugin
    tailwindcss, // Use the 'tailwindcss' plugin
  ],
};
