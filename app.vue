<template>
    <main id="app">
        <NuxtLayout :name="getLayout($route.path)" dir="pages" current-route>
            <NuxtLoadingIndicator />
            <NuxtPage :page-key="route => route.fullPath" />
        </NuxtLayout>
    </main>
</template>

<script setup>
    import { useSiteStore } from '@/stores/site';
    const siteStore = useSiteStore();

    function getLayout(path) {
        const splitPath = path.split('/');
        if (splitPath.find((element) => element === 'admin')) return "admin";
        if (splitPath.find((element) => element === siteStore.organisationPagePrefix)) return "application";
        return "brochure";
    }

    useHead({
        link: [
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: ''
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Passion+One:wght@400;700;900&display=swap',
                crossorigin: ''
            }
        ]
    });
</script>