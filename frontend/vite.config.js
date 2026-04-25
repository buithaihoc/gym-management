import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
VITE CONFIG - Cấu hình Vite Build Tool

Tác dụng: 
- Cấu hình development server
- Cấu hình build production
- Plugin configuration

Cách dùng:
- npm run dev: Chạy development server với HMR
- npm run build: Build optimized production
- npm run preview: Preview production build
*/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
