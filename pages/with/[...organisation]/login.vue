<template>
    <article class="container">
        <h1>Log in</h1>
        <Login />
    </article>
</template>

<script setup>
    import Login from '@/components/forms/Login.vue';

    import { useBookerStore } from '@/stores/booker';
    import { useOrganisationStore } from '@/stores/organisation';
    import { useSiteStore } from '@/stores/site';

    const bookerStore = useBookerStore();
    const organisationStore = useOrganisationStore();
    const siteStore = useSiteStore();

    onMounted(()=>{
        if (bookerStore.authenticated) {
            navigateTo(`${siteStore.organisationPagePrefix}${organisationStore.account.url_slug}`);
        }
    })
</script>