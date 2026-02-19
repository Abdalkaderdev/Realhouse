import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4000,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/_tokens.scss' as *;`
      }
    }
  }
});
