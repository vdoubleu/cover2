import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true
        },
        includeAssets: [
            'assets/pwa-64x64.png', 
            'assets/pwa-192x192.png', 
            'assets/pwa-512x512.png', 
            'assets/maskable-icon-512x512.png'
        ],
        manifest: {
            name: 'Cover',
            short_name: 'Cover',
            description: 'Your personal coverage helper',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'assets/pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png'
                },
                {
                    src: 'assets/pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'assets/pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any'  
                },
                {
                    src: 'assets/maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        }
    })
  ],
})
