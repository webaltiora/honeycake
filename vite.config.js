import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/honeycake/',
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"  // Use the modern Sass API
      }
    }
  }
})
