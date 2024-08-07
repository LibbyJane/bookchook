<template>
    <form v-on:submit="handleSubmit" class="form form--settings-theme" :class="{ 'loading': form.state == 'loading' }" ref="themeFormElement">
        <fieldset class="fieldset--colors">
            <div class="fieldset--colors__picker sticky">
                <ColorPicker v-if="selectedKey" :color="fields[selectedKey].value.hex" :callback="handleColorChange" />
            </div>

            <div class="fieldset--colors__fields">
                <template v-for="(field, key) in fields">
                    <Field
                        :id="key"
                        :labelText="key.replaceAll('_', ' ')"
                        :required="field.required"
                        :error="field.error"
                    >
                        <input
                            v-model="fields[key].value.hex"
                            v-on:focus="() => {selectedKey = key}"
                            v-on:keyup="handleChange(key, $event)"
                            v-on:blur="handleChange(key, $event)"
                            :id="key"
                            :type="field.type"
                            :required="fields[key].required"
                            :placeholder="fields[key].placeholder"
                            minlength="4"
                            pattern="[#]{0,1}[a-fA-F0-9]{3,8}"
                            :style="`--c-preview: ${fields[key].value.hex}`"
                        />
                        <button class="btn btn--plain" type="button" v-on:click="resetColor()">
                            <Undo />
                            <span class="visually-hidden">reset</span>
                        </button>
                    </Field>
                </template>
            </div>
        </fieldset>

        <Error v-if="form.error" :message="form.error"></Error>
        <button type="submit" class="btn btn--success" :disabled="form.pristine">Save</button>
    </form>
</template>

<script setup>
    import { ref, reactive, computed } from 'vue';
    import ColorPicker from '@/components/interface/ColorPicker.vue';
    import Field from '@/components/forms/shared/Field.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    import { Undo } from '@iconoir/vue';

    const selectedKey = ref(null);

    const organisationStore = useOrganisationStore();
    const themeFormElement = ref(null);

    let form = reactive({
        pristine: true,
        state: 'init',
        error: null
    })

    // keep the field key synchronisied with the store key
    const fields = reactive({
        background: {
            value: organisationStore.account.theme_config.colors.background,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        text: {
            value: organisationStore.account.theme_config.colors.text,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent: {
            value: organisationStore.account.theme_config.colors.accent,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        accent_contrast: {
            value: organisationStore.account.theme_config.colors.accent_contrast,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_background: {
            value: organisationStore.account.theme_config.colors.header_background,
            required: false,
            error: null,
            placeholder: "",
            type: "text"
        },
        header_text: {
            value: organisationStore.account.theme_config.colors.header_text,
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


    function handleColorChange(eventData) {
        fields[selectedKey.value].value = {
            hsl: {
                h: eventData.colors.hsl.h,
                s: eventData.colors.hsl.s,
                l: eventData.colors.hsl.h,
                hsl: `${eventData.colors.hsl.h}, ${eventData.colors.hsl.s}%,  ${eventData.colors.hsl.l}%`
            },
            hex: (eventData.colors.hex).slice(0, -2)
        };

        clearError(selectedKey.value);
    }

    function resetColor() {
        fields[selectedKey.value].value = organisationStore.account.theme_config.colors[selectedKey.value];
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

        let data = {
            colors: {

            }
        };

        for (let [key, value] of Object.entries(fields)) {
            data.colors[key] = value.value;
        }

        // const outcome = await useSiteAPI({ endpoint: '', data });
        const outcome = await organisationStore.updateThemeConfig(data);

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
    };

    const clearError = (id) => {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };

    const handleChange = (id, event) => {
        if (event?.type == "blur" && !fields[id].value.hex.startsWith('#')) {
            fields[id].value.hex = '#' +  fields[id].value.hex;
        }
        form.pristine = false;
        clearError(id);
    };
</script>

<style lang="scss">
    .fieldset--colors {
        display: grid;
            grid-template-areas: 'fields picker';
            grid-template-columns: 1fr 300px;
            gap: var(--space);

        .field-wrapper {
            display: grid;
                grid-template-areas: "label input reset";
                grid-template-columns: 1fr 1fr max-content;
                align-items: center;
                gap: var(--space-sm);
            margin-bottom: var(--space);

            label {
                grid-area: label;
            }

            input {
                grid-area: input;
                margin: 0;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                border-left: 8px solid var(--c-preview);
                box-shadow: -2px 0px 0px 0px hsla(var(--c-text-hsl), 0.025);
            }

            button {
                grid-area: reset;

                svg {
                    height: var(--icon-size-sm);
                    width: var(--icon-size-sm);
                }
            }
        }
    }

    .fieldset--colors__picker {
        grid-area: picker;
    }

    .fieldset--colors__fields {
        grid-area: fields;
    }
</style>