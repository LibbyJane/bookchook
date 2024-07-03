<template>
    <section class="container">
        <form v-on:submit="handleSubmit" class="form form--signup">
            <fieldset>
                <legend>About your organisation</legend>

                <Label for="account_name" text="Organisation Name" :required="true" />
                <input
                    id="account_name"
                    type="text"
                    v-model="fields.account_name.value"
                    v-on:keyup="clearError"
                    v-on:blur="updateURLSlug"
                    autocomplete="organization"
                    required
                />
                <Label for="url_slug" text="Preferred Handle" :required="true" />
                <Help :message="`The way your organision will show in URLs, e.g. ${url.host}${siteStore.organisationPagePrefix}${fields.url_slug.value ? fields.url_slug.value : 'your-name-here'}`" />
                <input
                    id="account_name"
                    type="text"
                    v-model="fields.url_slug.value"
                    v-on:keyup="clearError"
                    autocomplete="organization"
                    required
                />
            </fieldset>

            <fieldset>
                <legend>Your Account</legend>
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
                autocomplete="password"
                required
            />

            <Label for="password_confirm" text="Confirm Password" :required="true" />
            <input
                id="password_confirm"
                type="password"
                v-model="fields.password_confirm.value"
                v-on:keyup="clearError"
                autocomplete="password"
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
        </fieldset>
        </form>

    </section>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useBookerStore } from '@/stores/booker.js';
    import { useSiteStore } from '@/stores/site.js';

    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Help from '@/components/forms/shared/Help.vue';

    const bookerStore = useBookerStore();
    const siteStore = useSiteStore();

    const url = useRequestURL();

    const fields = reactive({
        account_name: {
            value: null,
            error: null,
        },
        url_slug: {
            value: null,
            error: null,
        },
        email_address: {
            value: null,
            error: null,
        },
        password: {
            value: null,
            error: null,
        },
        password_confirm: {
            value: null,
            error: null,
        },
    });

    let formError = ref('');

    const clearError = () => {
        // fields[fieldKey].error = null;
        formError.value = '';
    };

    const updateURLSlug = () => {
        if (!fields.url_slug.value) {
            fields.url_slug.value = fields.account_name.value.replace(' ', '-');
        }

    };

    // const computedSlug = computed({
    // // getter
    // get() {
    //     return firstName.value + ' ' + lastName.value
    // },
    // // setter
    // set(newValue) {
    //     // Note: we are using destructuring assignment syntax here.
    //     [firstName.value, lastName.value] = newValue.split(' ')
    // }
    // })


    const handleSubmit = async (e) => {
        e.preventDefault();

        const outcome = await bookerStore.performLogin({
            email_address: fields.email_address.value,
            password: fields.password.value,
        });

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
