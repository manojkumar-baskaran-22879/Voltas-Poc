// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       // workbox: { navigateFallbackDenylist: [/^\/accounts/,/^\/__catalyst/]}, // Exclude /admin and /api routes onslate },
//       workbox: { navigateFallbackDenylist: [/^\/accounts/, /^\/iam/, /^\/__catalyst/, /^\/zohocdn/, /^\/catalyst/, /^\/onslate/]}, // Exclude /admin and /api routes },
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
//       manifest: {
//         name: 'Voltas Service Dashboard',
//         short_name: 'VoltasService',
//         description: 'Service management dashboard for Voltas',
//         theme_color: '#1e3a8a', // Matches blue-900
//         background_color: '#ffffff',
//         display: 'standalone',
//         scope: '/',
//         start_url: '/',
//         orientation: 'portrait',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      // workbox: { navigateFallbackDenylist: [/^\/accounts/,/^\/__catalyst/]}, // Exclude /admin and /api routes onslate },
      // workbox: { navigateFallbackDenylist: [/^\/accounts/, /^\/iam/, /^\/__catalyst/, /^\/zohocdn/, /^\/catalyst/, /^\/onslate/]}, // Exclude /admin and /api routes },
      workbox: {
    navigateFallback: null,
    runtimeCaching: [
      { urlPattern: /\/__catalyst/, handler: 'NetworkOnly' },
      { urlPattern: /\/accounts/, handler: 'NetworkOnly' },
      { urlPattern: /\/iam/, handler: 'NetworkOnly' },
      { urlPattern: /\/onslate/, handler: 'NetworkOnly' },
    ],
  },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Voltas Service Dashboard',
        short_name: 'VoltasService',
        description: 'Service management dashboard for Voltas',
        theme_color: '#1e3a8a', // Matches blue-900
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})