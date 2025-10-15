export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors matching the elegant theme
      colors: {
        'pink-accent': '#ff69b4', // Bright Pink
        'soft-pink': '#ffc0cb', // Light Pink
        'dark-brown': '#614a4a', // Dark Text Color
        'light-bg': '#f7f3f1', // Light Background
      },
      // Custom font imports (used via custom CSS, but good to include here)
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}