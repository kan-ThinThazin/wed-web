import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // The official Tailwind CSS v4 plugin handles PostCSS automatically.
  plugins: [
    react(), 
    tailwindcss(),
  ],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg']
})
