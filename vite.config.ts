/// <reference types="vitest" />
/// <reference types="vite/client" />

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
  },
})
