<template>
    <form v-on:submit="handleSubmit" class="form form--settings-theme" :class="{ 'loading': form.state == 'loading' }" ref="themeFormElement">
        <fieldset>
            <template v-for="(field, key) in fields">
                <Vue3ColorPicker v-if="selectedInput == key" v-model="fields[key].valueFromColorPicker" mode="solid" type="RGB" colorListCount="7" :showAlpha="false" :showColorList="false" :showEyeDrop="false" theme="light" />
                <Field
                    :id="key"
                    :labelText="key.replaceAll('_', ' ')"
                    :required="field.required"
                    :error="field.error"
                >
                    <input
                        v-model="fields[key].value"
                        v-on:focus="() => {selectedInput = key}"
                        v-on:keyup="clearError(key)"
                        :id="key"
                        :type="field.type"
                        :required="fields[key].required"
                        :placeholder="fields[key].placeholder"
                    />
                </Field>
            </template>
        </fieldset>
    </form>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import ColorPicker from '@/components/interface/ColorPicker.vue';
    import Field from '@/components/forms/shared/Field.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
     import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
    import '@cyhnkckali/vue3-color-picker/dist/style.css'
    const organisationStore = useOrganisationStore();
    const themeFormElement = ref(null);

    let form = reactive({
        state: 'init',
        error: null
    })

    // keep the field key synchronisied with the store key
    const fields = reactive({
        background: {
            value: organisationStore.account.theme_config.colors.background,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        text: {
            value: organisationStore.account.theme_config.colors.text,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent: {
            value: organisationStore.account.theme_config.colors.accent,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent_contrast: {
            value: organisationStore.account.theme_config.colors.accent_contrast,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_background: {
            value: organisationStore.account.theme_config.colors.header_background,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_text: {
            value: organisationStore.account.theme_config.colors.header_text,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_accent: {
            value: organisationStore.account.theme_config.colors.header_accent,
            valueFromColorPicker: null,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        }
    });

    const selectedInput = ref('background');

    function handleColorChange(key, value) {
        console.log('color change callback', key, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        themeFormElement.value.reportValidity();

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
    .fieldset--colors {
        display: grid;
            grid-template-areas: 'picker fields';
            grid-template-columns: 300px  1fr;
    }

    .fieldset--colors__picker {
        grid-area: picker;
    }

    .fieldset--colors__fields {
        grid-area: fields;
    }
</style>