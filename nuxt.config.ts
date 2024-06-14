import path from 'path'
import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true }
    , pages: true
    , css: ['~/assets/scss/main.scss']
    , server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
    }
    , vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/helpers.scss" as *;'
                }
            }
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
