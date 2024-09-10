<template>
    <!-- Update the CSS color variables with values set in the admin section (falling back to brochure site colours if no color set) -->
    <div class="main-outer" :class="`theme-${organisationStore.account.theme_config.theme_type}`" :style="`
        --c-header-bg-hsl: ${ organisationStore.account.theme_config.colors.header_background.hsl.hsl};
        --c-header-bg: hsl(var(--c-header-bg-hsl));
        --c-header-text-hsl: ${ organisationStore.account.theme_config.colors.header_text.hsl.hsl};
        --c-header-text: hsl(var(--c-header-text-hsl));
        --c-header-accent-hsl: ${ organisationStore.account.theme_config.colors.header_accent.hsl.hsl};
        --c-header-accent: hsl(var(--c-header-accent-hsl));

        --c-text-hsl: ${ organisationStore.account.theme_config.colors.text.hsl.hsl};
        --c-text: hsl(var(--c-text-hsl));
        --c-text-inc-contrast: hsl(${ organisationStore.account.theme_config.colors.text.hsl.h}, ${ organisationStore.account.theme_config.colors.text.hsl.s}, calc(${ organisationStore.account.theme_config.colors.text.hsl.l} - 5%));
        --c-text-light: hsl(${ organisationStore.account.theme_config.colors.text.hsl.h}, ${ organisationStore.account.theme_config.colors.text.hsl.s}, calc(${ organisationStore.account.theme_config.colors.text.hsl.l} + 5%));

        --c-accent-hsl: ${organisationStore.account.theme_config.colors.accent.hsl.hsl};
        --c-accent: hsl(var(--c-accent-hsl));
        --c-accent-dark: hsl(${ organisationStore.account.theme_config.colors.accent.hsl.h}, ${ organisationStore.account.theme_config.colors.accent.hsl.s}%, 25%);
        --c-accent-light: hsl(${ organisationStore.account.theme_config.colors.accent.hsl.h}, ${ organisationStore.account.theme_config.colors.accent.hsl.s}%, 75%);


        --c-accent-contrast-hsl: ${organisationStore.account.theme_config.colors.accent_contrast.hsl.hsl};
        --c-accent-contrast: hsl(var(--c-accent-contrast-hsl));

        --c-background-hsl: ${ organisationStore.account.theme_config.colors.background.hsl.hsl};
        --c-background: hsl(var(--c-background-hsl));
        --c-background-alt-hsl: ${ organisationStore.account.theme_config.colors.background_alt.hsl.hsl};
        --c-background-alt: hsl(var(--c-background-alt-hsl));

        --c-input-bg-hsl: ${ organisationStore.account.theme_config.colors.background_alt2.hsl.hsl};
        --c-input-bg: hsl(var(--c-input-bg-hsl));
        --c-border: hsla(var(--c-text-hsl), 0.1);
        --c-border-light: hsla(var(--c-text-hsl), 0.1);

    --header-height: ${headerHeight};
    `"> <AppHeader />
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