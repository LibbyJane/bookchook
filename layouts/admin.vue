<template>
    <div class="main-outer" :style="`

    `">
        <pre>{{ organisationStore.account }}</pre>
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
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/Header.vue';
    import AdminFooter from '@/components/AdminFooter.vue';
    import AdminNav from '@/components/admin/Nav.vue';

    const organisationStore = useOrganisationStore();
    const route = useRoute();
    const splitPath = route.path.split('/');
    const organisation = route.path.split('/')[2];

    console.log('admin page');
    // console.log('path', splitPath);
    console.log('store', organisationStore.getOrganisationData);
    console.log('organisation',organisation);
    const result = await useAsyncData('organisation', () => organisationStore.getOrganisationData(organisation));

    console.dir(`end admin layout, result: ${result}, store: ${organisationStore.account}`);
</script>