<template>
    <!-- Update the CSS color variables with values set in the admin section (falling back to brochure site colours if no color set) -->
    <div class="main-outer" :style="`
    --c-header-bg-hsl: ${ organisationStore.account.theme_config.colors.headerBackground ? organisationStore.account.theme_config.colors.headerBackground : '--c-background-hsl' };
    --c-header-bg: hsl(var(--c-header-bg-hsl));

    --c-header-text-hsl: ${ organisationStore.account.theme_config.colors.headerText ? organisationStore.account.theme_config.colors.headerText : '--c-accent-contrast-hsl'};
    --c-header-text: hsl(var(--c-header-text-hsl));

    --c-header-accent-hsl: ${ organisationStore.account.theme_config.colors.headerAccent ? organisationStore.account.theme_config.colors.headerAccent : '--c-accent-contrast-hsl'};
    --c-header-accent: hsl(var(--c-header-accent-hsl));

    --c-text-hsl: ${ organisationStore.account.theme_config.colors.text ? organisationStore.account.theme_config.colors.text : '--c-text-hsl' };
    --c-text: hsl(var(--c-text-hsl));

    --c-accent-hsl: ${organisationStore.account.theme_config.colors.accent ? organisationStore.account.theme_config.colors.accent : '--c-accent-hsl' };
    --c-accent: hsl(var(--c-accent-hsl));

    --c-accent-contrast-hsl: ${organisationStore.account.theme_config.colors.accentContrast ? organisationStore.account.theme_config.colors.accentContrast : '--c-accent-contrast-hsl' };
    --c-accent-contrast: hsl(var(--c-accent-contrast-hsl));

    --c-background-hsl: ${ organisationStore.account.theme_config.colors.background ? organisationStore.account.theme_config.colors.background : '--c-background-hsl' };
    --c-background: hsl(var(--c-background-hsl));

    --header-height: ${headerHeight};
    `">
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

    const organisationStore = useOrganisationStore();
    const route = useRoute();
    const splitPath = route.path.split('/');
    const headerHeight = ref('3rem');

    onMounted(()=>{
        headerHeight.value = `${document.getElementById('header').offsetHeight}px`;
    })

    await useAsyncData('organisation', () => organisationStore.getOrganisationData(splitPath[2], ''));
</script>


<style lang="scss">
    :root {
        --sb-track-color: var(--c-neutral-95);
        --sb-thumb-color: var(--c-neutral-80);
    }
</style>