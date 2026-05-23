import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'MenU',
        short_name: 'MenU',
        description: 'Premium Ordering Experience at MenU',
        theme_color: '#d84315',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'menu_logo.jpeg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'menu_logo.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    }),
    {
      name: 'figma-asset-mock',
      enforce: 'pre',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          return '\0figma-asset:' + id;
        }
      },
      load(id) {
        if (id.startsWith('\0figma-asset:')) {
          return `export default "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop";`;
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/database', 'firebase/functions', 'firebase/analytics'],
          ui: ['framer-motion', 'lucide-react', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});
