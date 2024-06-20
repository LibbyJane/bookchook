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
        if (path.indexOf(`${siteStore.organisationPagePrefix}`) > -1) return "application";
        return "brochure";
        // if (path.indexOf('/bookings/') > -1) return "brochure";
        // if (path.indexOf('/resources/') > -1) return "brochure";
        // if (path == '/pricing') return "brochure";
        // if (path == '/features') return "brochure";
        // if (path == '/contact') return "brochure";
        // if (path == '/signup') return "brochure";
        // if (path.length > 1) return "application";
        // return "brochure";
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