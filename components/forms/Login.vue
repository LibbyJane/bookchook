<template>
    <form v-on:submit="handleSubmit" class="form form--login">
        <Label for="email_address" text="Email" :required="true" />
        <input
            id="email_address"
            type="email"
            v-model="fields.email_address.value"
            v-on:keyup="clearError"
            autocomplete="email"
            required
        />

        <Label for="password" text="Password" :required="true" />
        <input
            id="password"
            type="password"
            v-model="fields.password.value"
            v-on:keyup="clearError"
            autocomplete="current-password"
            required
        />
        <Error v-if="formError" :message="formError" />

        <button class="btn" type="submit">log in</button>
            <!--
        <aside class="sidebar">
            <div class="card is-alt align-top width-small" to="/login">
                <img src="@/assets/images/tape.svg" class="card-tape" alt="Push Pin" />
                <h4>Don't have an account yet?</h4>
                <p><RouterLink to="/signup">Sign up here</RouterLink></p>
            </div>
        </aside> -->

        </form>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useUserStore } from '@/stores/user';
    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';
    const route = useRoute();

    const userStore = useUserStore();

    const fields = reactive({
        email_address: {
            value: null,
            error: null,
        },
        password: {
            value: null,
            error: null,
        },
    });

    let formError = ref('');

    const clearError = () => {
        // fields[fieldKey].error = null;
        formError.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const outcome = await userStore.performLogin({
            email_address: fields.email_address.value,
            password: fields.password.value,
        });

        if (outcome && outcome.error) {
            formError.value = outcome.error;
            return;
        }

        if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                formError.value += `${error}`;
            }
            return;
        }

        navigateTo(route.path.split('/login')[0]);
    };
</script>
