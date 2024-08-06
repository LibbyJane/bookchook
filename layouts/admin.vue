<template>
    <div class="main-outer" :style="`
    --c-header-bg-hsl: ${ organisationStore.account.theme_config.colors.header_background ? organisationStore.account.theme_config.colors.header_background : '--c-background-hsl' };
    --c-header-bg: hsl(var(--c-header-bg-hsl));

    --c-header-text-hsl: ${ organisationStore.account.theme_config.colors.header_text ? organisationStore.account.theme_config.colors.header_text : '--c-accent-contrast-hsl'};
    --c-header-text: hsl(var(--c-header-text-hsl));

    --c-header-accent-hsl: ${ organisationStore.account.theme_config.colors.header_accent ? organisationStore.account.theme_config.colors.header_accent : '--c-accent-contrast-hsl'};
    --c-header-accent: hsl(var(--c-header-accent-hsl));

    --c-text-hsl: ${ organisationStore.account.theme_config.colors.text ? organisationStore.account.theme_config.colors.text : '--c-text-hsl' };
    --c-text: hsl(var(--c-text-hsl));

    --c-accent-hsl: ${organisationStore.account.theme_config.colors.accent ? organisationStore.account.theme_config.colors.accent : '--c-accent-hsl' };
    --c-accent: hsl(var(--c-accent-hsl));

    --c-accent-contrast-hsl: ${organisationStore.account.theme_config.colors.accent_contrast ? organisationStore.account.theme_config.colors.accent_contrast : '--c-accent-contrast-hsl' };
    --c-accent-contrast: hsl(var(--c-accent-contrast-hsl));

    --c-background-hsl: ${ organisationStore.account.theme_config.colors.background ? organisationStore.account.theme_config.colors.background : '--c-background-hsl' };
    --c-background: hsl(var(--c-background-hsl));
    `">
        <AdminHeader />

        <article class="main-content layout-admin">
            <AdminNav />
            <div class="container">
                <slot />
            </div>
        </article>
        <AdminFooter />
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { useOrganisationStore } from '@/stores/organisation';
    import AdminHeader from '@/components/AdminHeader.vue';
    import AdminFooter from '@/components/AdminFooter.vue';
    import AdminNav from '@/components/admin/Nav.vue';

    const organisationStore = useOrganisationStore();
    const route = useRoute();
    const splitPath = route.path.split('/');

    await useAsyncData('organisation', () => organisationStore.getOrganisationData(splitPath[2], ''));
</script>