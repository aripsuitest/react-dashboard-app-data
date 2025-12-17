import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    base: env.VITE_BASE_PATH || '/react-dashboard-app-data/',
  }
})
