<template>
    <div class="main-outer" :style="`--c-brand: ${ organisationStore.data.theme.colors.brand }; --c-brand-contrast: ${ organisationStore.data.theme.colors.brandContrast }; --c-text: ${ organisationStore.data.theme.colors.text };--c-accent: ${organisationStore.data.theme.colors.accent }; --c-neutral: ${ organisationStore.data.theme.colors.background };`">
        <AppHeader />

        <AppCalendar />

        <AppFooter />
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router'

    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const route = useRoute();

    await useAsyncData('organisation', () => organisationStore.getOrganisationData(route.path.replace(`${siteStore.organisationPagePrefix}`, '')));
</script>


<style lang="scss">
    :root {
        --sb-track-color: hsl(var(--c-neutral-hue), var(--c-neutral-sat), calc(var(--c-neutral-bri) + 10%));
        --sb-thumb-color: hsl(var(--c-neutral-hue), calc(var(--c-neutral-sat) - 20%), calc(var(--c-neutral-bri) - 0%));
    }

    .main-outer {
        background-color: var(--c-neutral);
        color: var(--c-text);
    }
</style>