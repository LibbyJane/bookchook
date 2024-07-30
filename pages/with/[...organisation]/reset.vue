<template>
    <div class="container">
        <h1>Reset</h1>
        <Login />
        <small><a href="reset">Forgot your password?</a></small>
    </div>
</template>

<script setup>
    import Login from '@/components/forms/Login.vue';

    import { useUserStore } from '@/stores/user';
    import { useOrganisationStore } from '@/stores/organisation';

    const userStore = useUserStore();
    const organisationStore = useOrganisationStore();

    onMounted(()=>{
        if (userStore.authenticated) {
            navigateTo(organisationStore.baseURL);
        }
    })
</script>