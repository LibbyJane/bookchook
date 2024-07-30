<template>
    <form v-on:submit="handleSubmit" class="form form--register">
        <Label for="email" text="Email" :required="true" />
        <input
            id="email"
            type="email"
            v-model="fields.email.value"
            v-on:keyup="clearError"
            autocomplete="email"
            required
        />

        <Error v-if="formError" :message="formError" />

        <button class="btn" type="submit">submit</button>

        </form>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useUserStore } from '@/stores/user';
    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';

    const userStore = useUserStore();

    const fields = reactive({
        email: {
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

        // const outcome = await userStore.performLogin({
        //     email: fields.email.value,
        //     password: fields.password.value,
        // });
        const outcome = {
            error: "Test error"
        };

        console.log('outcome', outcome);

        if (outcome && outcome.error) {
            formError.value = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                console.log('error', error);
                formError.value += `${error}`;
            }
        }
    };
</script>
