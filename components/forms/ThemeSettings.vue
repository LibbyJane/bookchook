<template>
    <form v-on:submit="handleSubmit" class="form form--settings-theme" :class="{ 'loading': form.state == 'loading' }" ref="themeFormElement">
        <fieldset class="fieldset--colors">
            <div class="fieldset--colors__picker sticky">
                <ColorPicker v-if="selectedKey" :color="fields[selectedKey].value.hex" :callback="handleColorPickerChange" />
            </div>

            <div class="fieldset--colors__fields">
                <template v-for="(field, key) in fields">
                    <Field
                        :id="key"
                        :labelText="key.replaceAll('_', ' ')"
                        :required="field.required"
                        :error="field.error"
                    >
                        <!-- <span class="color-preview" role="img" aria-label="Preview of the selected color" ></span> -->
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
                            pattern="[#]{0,1}[a-fA-F0-9]{6}"
                            :style="`--c-preview: ${fields[key].value.hex}`"
                            :ref="`${key}_ref`"
                        />
                        <button class="btn btn--plain" type="button" v-on:click="resetColor()" :disabled="fields[key].pristine" title="Reset">
                            <RefreshDouble />
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
    import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
    import ColorPicker from '@/components/interface/ColorPicker.vue';
    import { isReadable } from '@ctrl/tinycolor';
    import Field from '@/components/forms/shared/Field.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    import { RefreshDouble } from '@iconoir/vue';

    const selectedKey = ref(null);
    const organisationStore = useOrganisationStore();
    const themeFormElement = ref(null);

    let form = reactive({
        pristine: computed( () => {
            let p = true;
            Object.keys(fields).forEach((k, _i) => {
                if (p && !(fields[k]).pristine ) {
                    p = false;
                    return;
                }
            });
            return p;
        }),
        state: 'init',
        error: null
    })

    const background_ref = ref(null);
    const text_ref = ref(null);
    const accent_ref = ref(null);
    const accent_contrast_ref = ref(null);
    const header_background_ref = ref(null);
    const header_text_ref = ref(null);
    const header_accent_ref = ref(null);


    // keep the field key synchronisied with the store key
    const fields = reactive({
        background: {
            value: organisationStore.account.theme_config.colors.background,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.background.value.hex == organisationStore.account.theme_config.colors.background.hex })
        },
        text: {
            value: organisationStore.account.theme_config.colors.text,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.text.value.hex == organisationStore.account.theme_config.colors.text.hex })
        },
        accent: {
            value: organisationStore.account.theme_config.colors.accent,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.accent.value.hex == organisationStore.account.theme_config.colors.accent.hex })
        },
        accent_contrast: {
            value: organisationStore.account.theme_config.colors.accent_contrast,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.accent_contrast.value.hex == organisationStore.account.theme_config.colors.accent_contrast.hex })
        },
        header_background: {
            value: organisationStore.account.theme_config.colors.header_background,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.header_background.value.hex == organisationStore.account.theme_config.colors.header_background.hex })
        },
        header_text: {
            value: organisationStore.account.theme_config.colors.header_text,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.header_text.value.hex == organisationStore.account.theme_config.colors.header_text.hex })
        },
        header_accent: {
            value: organisationStore.account.theme_config.colors.header_accent,
            valueFromColorPicker: null,
            required: true,
            error: null,
            placeholder: "",
            type: "text",
            pristine: computed( () => { return fields.header_accent.value.hex == organisationStore.account.theme_config.colors.header_accent.hex })
        }
    });
    onMounted(() => {
        watch( () => fields.background.error, (error) => {
            if (error) {
                background_ref.value[0].setCustomValidity(error );
                return;
            }

            background_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.text.error, (error) => {
            if (error) {
                text_ref.value[0].setCustomValidity(error );
                return;
            }

            text_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.accent.error, (error) => {
            if (error) {
                accent_ref.value[0].setCustomValidity(error );
                return;
            }

            accent_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.accent_contrast.error, (error) => {
            if (error) {
                accent_contrast_ref.value[0].setCustomValidity(error );
                return;
            }

            accent_contrast_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.header_background.error, (error) => {
            if (error) {
                header_background_ref.value[0].setCustomValidity(error );
                return;
            }

            header_background_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.header_text.error, (error) => {
            if (error) {
                header_text_ref.value[0].setCustomValidity(error );
                return;
            }

            header_text_ref.value[0].setCustomValidity('' );
        });

        watch( () => fields.header_accent.error, (error) => {
            if (error) {
                header_accent.value[0].setCustomValidity(error );
                return;
            }

            header_accent.value[0].setCustomValidity('' );
        });
    });


    function handleColorPickerChange(eventData) {
        // console.log('handleColorPickerChange', eventData);
        let comparisonColorKey;

        switch (selectedKey.value) {
            case "background":
                comparisonColorKey = "text";
                break;
            case "header_background":
                comparisonColorKey = "header_text";
                break;
            case "header_text":
                comparisonColorKey = "header_background";
                break;
            case "accent":
                comparisonColorKey = "accent_contrast";
                break;
            case "accent_contrast":
                comparisonColorKey = "accent";
                break;
            default:
                comparisonColorKey = "background";
        }

        fields[selectedKey.value].value = {
                hsl: {
                    h: eventData.colors.hsl.h,
                    s: eventData.colors.hsl.s,
                    l: eventData.colors.hsl.h,
                    hsl: `${eventData.colors.hsl.h}, ${eventData.colors.hsl.s}%,  ${eventData.colors.hsl.l}%`
                },
                hex: (eventData.colors.hex).slice(0, -2)
            };

        if (!comparisonColorKey) return;

        if ( isReadable(fields[selectedKey.value].value.hex, fields[comparisonColorKey].value.hex, { level: "AA", size: "large"} )) {
            clearError(selectedKey.value);
            clearError(comparisonColorKey);
            return;
        }

        const errorMessage = `Insufficient constrast with the ${(comparisonColorKey).replace('_', ' ')} color.`;

        setTimeout(() => {
            fields[selectedKey.value].error = errorMessage;
        }, 100);
    }

    function resetColor() {
        fields[selectedKey.value].value = organisationStore.account.theme_config.colors[selectedKey.value];
        fields[selectedKey.value].error = '';
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
                grid-template-areas: "label input reset" "error error error";
                grid-template-columns: 1fr 1fr max-content;
                align-items: center;
                gap: var(--space-sm);
            margin-bottom: var(--space);

            label {
                grid-area: label;
                    align-items: center;
                    justify-content: end;
                margin: 0;
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
                    height: var(--icon-size-xs);
                    width: var(--icon-size-xs);
                }
            }

            .error {
                grid-area: error;
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