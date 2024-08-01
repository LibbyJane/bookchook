<template>
    <form v-on:submit="handleSubmit" class="form form--settings-billing" :class="{ 'loading': form.state == 'loading' }" ref="themeFormElement">
        <fieldset>
            <Field
                v-for="(field, key) in fields"
                id="key"
                :labelText="getLabelText(key)"
                :required="field.required"
                :error="field.error"
            >
                <input
                    v-model="fields[key].value"
                    v-on:keyup="clearError(key)"
                    :id="key"
                    :type="field.type"
                    :required="fields[key].required"
                    :placeholder="fields[key].placeholder"
                />
            </Field>
        </fieldset>

        <ColorPicker />


        <button type="submit" class="btn btn--success">Save</button>
    </form>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import ColorPicker from '@/components/interface/ColorPicker.vue';
    import Field from '@/components/forms/shared/Field.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    const organisationStore = useOrganisationStore();

    const themeFormElement = ref(null);

    let form = reactive({
        state: 'init',
        error: null
    })

    function getLabelText(key) {
        let transformedText = key.replaceAll('_', ' ');

        return transformedText;
    };

    const fields = reactive({
        background_color: {
            value: organisationStore.account.theme_config.colors.background,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        text_color: {
            value: organisationStore.account.theme_config.colors.text,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent_color: {
            value: organisationStore.account.theme_config.colors.accent,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent_contrast_color: {
            value: organisationStore.account.theme_config.colors.accent_contrast,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_background_color: {
            value: organisationStore.account.theme_config.colors.header_background,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_text_color: {
            value: organisationStore.account.theme_config.colors.header_text,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_accent_color: {
            value: organisationStore.account.theme_config.colors.header_accent,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        tne.value.reportValidity();

        if (!themeFormElement.value.checkValidity()) {
            const list = themeFormElement.value.querySelectorAll('fieldset :invalid');
            list.forEach(elem => {
                fields[elem.id].error = elem.validationMessage;
            })

            list[0].focus();
            form.state = '';
            return;
        }

        let data = {};

        for (let [key, value] of Object.entries(fields)) {
            data[key] = value.value;
        }

        // const outcome = await useSiteAPI({ endpoint: '', data });
        let outcome;
        // console.log('data', data);
        let errorMessage;

        if (outcome && outcome.error) {
            errorMessage = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                errorMessage += `${error}`;
            }
        }

        if (errorMessage) {
            form.error = errorMessage;
            return;
        }

        form.state = '';

        // navigateTo(`/with/${fields.url_slug.value}/admin`);
    };

    const clearError = (id) => {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };


</script>

<style lang="scss">

</style>