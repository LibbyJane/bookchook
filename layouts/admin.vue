<template>
    <div class="main-outer">
        <AdminHeader />

        <article class="main-content">
            <AdminNav />

            <slot />
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