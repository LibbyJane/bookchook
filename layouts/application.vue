<template>
    <div class="main-outer" :style="`
    --c-header-bg: ${ organisationStore.account.theme_config.colors.headerBackground ? organisationStore.account.theme_config.colors.headerBackground : '--c-accent' };
    --c-header-text: ${ organisationStore.account.theme_config.colors.headerText ? organisationStore.account.theme_config.colors.headerText : '--c-accent-contrast'};
    --c-header-accent: ${ organisationStore.account.theme_config.colors.headerAccent ? organisationStore.account.theme_config.colors.headerAccent : '--c-accent-contrast'};
    --c-text: ${ organisationStore.account.theme_config.colors.text ? organisationStore.account.theme_config.colors.text : '--c-text' };
    --c-accent: ${organisationStore.account.theme_config.colors.accent ? organisationStore.account.theme_config.colors.accent : '--c-accent' };
    --c-accent-contrast: ${organisationStore.account.theme_config.colors.accentContrast ? organisationStore.account.theme_config.colors.accentContrast : '--c-accent-contrast' };
    --c-background: ${ organisationStore.account.theme_config.colors.background ? organisationStore.account.theme_config.colors.background : '--c-background' };`">
        <AppHeader />
        <AppSchedule />
        <AppFooter />
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router'

    const organisationStore = useOrganisationStore();
    const route = useRoute();
    const splitPath = route.path.split('/');

    await useAsyncData('organisation', () => organisationStore.getOrganisationData(splitPath[2], ''));
</script>


<style lang="scss">
    :root {
        --sb-track-color: hsl(var(--c-neutral-hue), var(--c-neutral-sat), calc(var(--c-neutral-lum) + 10%));
        --sb-thumb-color: hsl(var(--c-neutral-hue), calc(var(--c-neutral-sat) - 20%), calc(var(--c-neutral-lum) - 0%));
    }
</style>