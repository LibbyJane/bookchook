import path from 'path'
import fs from 'fs'
import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true }
    , pages: true
    , css: ['~/assets/scss/main.scss']
    // , hooks: {
    //     'pages:extend' (pages) {
    //         function setMiddleware (pages: NuxtPage[]) {
    //             for (const page of pages) {
    //             if (/* some condition */ true) {
    //                 page.meta ||= {}
    //                 // Note that this will override any middleware set in `definePageMeta` in the page
    //                 page.meta.middleware = ['auth']
    //             }
    //             if (page.children) {
    //                 setMiddleware(page.children)
    //             }
    //             }
    //         }
    //         setMiddleware(pages)
    //     }
    // }
    , vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/helpers.scss" as *;'
                }
            }
        }
    }
    , modules: ['@pinia/nuxt', "@nuxt/image"]
    , server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
    }
    // , runtimeConfig: {
    //     // The private keys which are only available server-side
    //     apiSecret: '123',
    //     // Keys within public are also exposed client-side
    //     public: {
    //         apiBase: '/api'
    //     }
    // }
})