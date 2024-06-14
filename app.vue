<script setup lang="ts">
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
                href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap',
                crossorigin: ''
            }
        ]
    });

    const router = useRouter();
    const route = useRoute();

    // todo
    // console.log('route', route);

    // if (route.params.group === 'admins' && !route.params.id) {
    //     console.log('Warning! Make sure user is authenticated!')
    // }

    const nav = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Parent (index)', to: '/parent' },
    { label: 'Parent (b)', to: '/parent/b' },
    { label: 'Keyed child', onClick: () => router.push(`/parent/reload-${(Math.random() * 100).toFixed()}`) },
    { label: 'Non-Keyed child', onClick: () => router.push(`/parent/static-${(Math.random() * 100).toFixed()}`) },
    ]
</script>


<template>
    <NuxtLayout name="brochure" dir="pages" :nav="nav" current-route>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>
