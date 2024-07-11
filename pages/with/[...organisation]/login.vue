<template>
    <article class="container narrow">
        <div class="main-col">

        </div>
        <div v-if="activeForm == 'login'" >
            <h1>Log in</h1>
            <p class="m-top m-bottom">Don&rsquo;t have an account yet? <button v-on:click="activeForm = 'register'" type="button" class="hover-highlight"><em>Click here to register</em></button>.
            </p>

            <Login />
        </div>

        <div v-if="activeForm == 'reset'" >
            <h1>Reset your password</h1>
            <Reset />
        </div>

        <div v-if="activeForm == 'register'" >
            <h1>Sign up</h1>
            <Register />
        </div>


        <footer class="btn-bar btn-bar--login">
            <button v-if="activeForm != 'login'" v-on:click="activeForm = 'login'" type="button" class="hover-highlight">Login</button>
            <button v-if="activeForm != 'reset'" v-on:click="activeForm = 'reset'" type="button" class="hover-highlight">Forgot your password?</button>
            <button v-if="activeForm == 'reset'" v-on:click="activeForm = 'register'" type="button" class="hover-highlight">Register</button>
        </footer>
    </article>
</template>

<script setup>
    import Login from '@/components/forms/Login.vue';
    import Reset from '@/components/forms/ResetPassword.vue';
    import Register from '@/components/forms/Register.vue';

    import { ref } from 'vue';

    import { useBookerStore } from '@/stores/booker.js';
    import { useOrganisationStore } from '@/stores/organisation';

    const bookerStore = useBookerStore();
    const organisationStore = useOrganisationStore();

    const activeForm = ref('login');

    onMounted(()=>{
        if (bookerStore.authenticated) {
            navigateTo(`${organisationStore.organisationPagePrefix}${organisationStore.account.url_slug}`);
        }
    })
</script>

<style lang="scss">
    .btn-bar--login {
        button {
            font-size: var(--p-sm);
        }
    }
</style>