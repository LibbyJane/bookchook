<template>
    <div class="main-outer" :style="`
    --c-header-bg: ${ organisationStore.data.theme.colors.headerBackground ? organisationStore.data.theme.colors.headerBackground : '--c-accent' };
    --c-header-text: ${ organisationStore.data.theme.colors.headerText ? organisationStore.data.theme.colors.headerText : '--c-accent-contrast'};
    --c-header-accent: ${ organisationStore.data.theme.colors.headerAccent ? organisationStore.data.theme.colors.headerAccent : '--c-accent-contrast'};
    --c-text: ${ organisationStore.data.theme.colors.text ? organisationStore.data.theme.colors.text : '--c-text' };
    --c-accent: ${organisationStore.data.theme.colors.accent ? organisationStore.data.theme.colors.accent : '--c-accent' }; --c-accent-contrast: ${organisationStore.data.theme.colors.accentContrast ? organisationStore.data.theme.colors.accentContrast : '--c-accent-contrast' };
    --c-background: ${ organisationStore.data.theme.colors.background ? organisationStore.data.theme.colors.background : '--c-background' };`">
        <AppHeader />
        <AppSchedule />
        <AppFooter />
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router'
    import { ref, onMounted } from 'vue';

    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const route = useRoute();

    await useAsyncData('organisation', () => organisationStore.getOrganisationData(route.path.replace(`${siteStore.organisationPagePrefix}`, '')));
</script>


<style lang="scss">
    :root {
        --sb-track-color: hsl(var(--c-neutral-hue), var(--c-neutral-sat), calc(var(--c-neutral-lum) + 10%));
        --sb-thumb-color: hsl(var(--c-neutral-hue), calc(var(--c-neutral-sat) - 20%), calc(var(--c-neutral-lum) - 0%));
    }
</style>