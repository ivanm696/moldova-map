import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/moldova-map/', // Добавляем базовый путь, чтобы GitHub Pages понимал, откуда брать JS и CSS
})
