import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mamiku-jimshoney/', // 👈 TAMBAHKAN BARIS INI (sesuaikan dengan nama repo GitHub Anda)
})