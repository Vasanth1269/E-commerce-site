import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendURL = 'https://e-commerce-site-egre.onrender.com';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target : backendURL,
        changeOrigin: true,
        secure: false,

      },
      '/image':{
        target : backendURL ,
         changeOrigin: true,
        secure: false,
      }
    }
  }
})
