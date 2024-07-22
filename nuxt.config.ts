import path from 'path'
import fs from 'fs'
import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    pages: true,
    css: ['~/assets/scss/main.scss', '~/assets/scss/rte.scss'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/helpers.scss" as *;'
                }
            }
        }
    },

    modules: ["@pinia/nuxt", "@nuxt/image", "@nuxtjs/leaflet", "nuxt-tiptap-editor"],
    tiptap: {
        prefix: "Tiptap", //prefix for Tiptap components
    },
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
    },

    // hooks: {
    //     'pages:routerOptions' ({ files }) {
    //         const resolver = createResolver(import.meta.url)
    //         // add a route
    //         files.push({
    //         path: resolver.resolve('./runtime/app/router-options'),
    //         optional: true
    //         })
    //     }
    // },
    // , runtimeConfig: {
    //     // The private keys which are only available server-side
    //     apiSecret: '123',
    //     // Keys within public are also exposed client-side
    //     public: {
    //         apiBase: '/api'
    //     }
    // }
    router: {
        options: {
            linkActiveClass: 'active',
            linkExactActiveClass: 'active-page',
        }
    },

    compatibilityDate: '2024-07-09'
})