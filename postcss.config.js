// Import the 'tailwindcss' module
import tailwindcss from "tailwindcss";

// Export PostCSS configuration
export const plugins = [
  "postcss-preset-env",
  tailwindcss, // Use the 'tailwindcss' plugin
];
