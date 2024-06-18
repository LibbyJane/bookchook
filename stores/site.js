import { defineStore } from 'pinia';

export const useSiteStore = defineStore('siteStore', {
    state: () => ({
        siteName: 'Bookity',
        description: ''
    }),
    actions: {
        // async fetch() {
        //     const infos = await $fetch('https://api.nuxt.com/modules/pinia')

        //     this.name = infos.name
        //     this.description = infos.description
        // }
    }
})