import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 1. Importar el plugin PWA
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 2. Configuración Recomendada del VitePWA
    VitePWA({
      // Estrategia: 'generateSW' crea automáticamente el Service Worker (recomendado)
      strategy: 'generateSW',

      // Ajustes de caché (opcionales)
      registerType: 'autoUpdate', // El SW se actualiza cuando detecta cambios
      devOptions: {
        enabled: true, // Habilita el SW en desarrollo para pruebas
      },

      // Configuración del Service Worker (Cache/Precache)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,woff2}'], // Patrones de archivos a cachear
        // Opcional: limpiar caches viejos
        cleanupOutdatedCaches: true,

        // 🟢 NUEVA SECCIÓN: Reglas de Cache en Tiempo de Ejecución
        runtimeCaching: [
          {
            // Cachear las hojas de estilo de Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
          {
            // Cachear los archivos de fuente reales
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
        ],
      },

      // Configuración del Manifiesto (El plugin lo genera basado en esta info)
      manifest: {
        name: 'Corazón de Bits',
        short_name: 'Bits',
        description: 'Un generador de mensajes emocionales y halagadores.',
        theme_color: '#E83E8C',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
