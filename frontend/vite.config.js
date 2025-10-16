import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind v3 uses PostCSS; no Tailwind Vite plugin needed


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
