<template>
    <div class="container">
        <h1>Reset</h1>
        <Login />
        <small><a href="reset">Forgot your password?</a></small>
    </div>
</template>

<script setup>
    import Login from '@/components/forms/Login.vue';

    import { useBookerStore } from '@/stores/booker.js';
    import { useOrganisationStore } from '@/stores/organisation';

    const bookerStore = useBookerStore();
    const organisationStore = useOrganisationStore();

    onMounted(()=>{
        if (bookerStore.authenticated) {
            navigateTo(organisationStore.baseURL);
        }
    })
</script>