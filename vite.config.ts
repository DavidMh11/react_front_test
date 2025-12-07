/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [],
        pool: 'threads',
        css: true,
        server: {
            deps: {
                inline: ["@mui/x-data-grid"],
            },
        },
    },
})
