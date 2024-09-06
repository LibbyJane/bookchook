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
                        <button class="btn btn--plain" type="button" v-on:click="resetColor(key)" :disabled="fields[key].pristine" title="Reset">
                            <RefreshDouble />
                            <span class="visually-hidden">reset</span>
                        </button>
                    </Field>
                </template>
            </div>
        </fieldset>

        <Error v-if="form.error" :message="form.error"></Error>
        <div class="btn-bar">
            <button type="submit" class="btn btn--success" :disabled="form.pristine">Save</button>
            <button type="button" class="btn btn--plain btn--sm" v-on:click="resetAllToDefault()">Use default colours</button>
            <button type="button" class="btn btn--plain btn--sm" v-on:click="resetAllToDefault('dark')">Use default dark colours</button>

        </div>
    </form>
</template>

<script setup>
    import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
    import { isReadable, TinyColor } from '@ctrl/tinycolor';
    import ColorPicker from '@/components/interface/ColorPicker.vue';
    import Field from '@/components/forms/shared/Field.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import { useOrganisationStore, defaultColors, defaultDarkColors } from '@/stores/organisation.js';
    import { RefreshDouble } from '@iconoir/vue';

    const props = defineProps({
        callback: {
            type: Function
        }
    });

    const selectedKey = ref(null);
    const organisationStore = useOrganisationStore();
    const themeFormElement = ref(null);

    const snackbar = useSnackbar();

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
    });

    // keep the field key synchronised with the store key
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

    const background_ref = ref(null);
    const text_ref = ref(null);
    const accent_ref = ref(null);
    const accent_contrast_ref = ref(null);
    const header_background_ref = ref(null);
    const header_text_ref = ref(null);
    const header_accent_ref = ref(null);

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
                header_accent_ref.value[0].setCustomValidity(error );
                return;
            }

            header_accent_ref.value[0].setCustomValidity('' );
        });
    });

    function handleColorPickerChange(eventData) {
        let comparisonColorKey;

        switch (selectedKey.value) {
            case "background":
                comparisonColorKey = "text";
                break;
            case "accent":
                comparisonColorKey = "background";
                break;
            case "accent_contrast":
                comparisonColorKey = "accent";
                break;
            case "header_background":
                comparisonColorKey = "header_text";
                break;
            case "header_text":
                comparisonColorKey = "header_background";
                break;
            case "header_accent":
                // leave blank for now
                break;
            default:
                comparisonColorKey = "background";
        }

        fields[selectedKey.value].value = {
            hsl: {
                h: eventData.colors.hsl.h,
                s: eventData.colors.hsl.s,
                l: eventData.colors.hsl.l,
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

    function resetColor(key) {
        fields[key].value = organisationStore.account.theme_config.colors[key];
        fields[key].error = '';
    }

    function clearError(id) {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };

    function handleChange(id, event) {
        if (event?.type == "blur" && !fields[id].value.hex.startsWith('#')) {
            fields[id].value.hex = '#' +  fields[id].value.hex;
        }

        clearError(id);
    };

    function resetAllToDefault(themeStyle = 'light') {
        updateConfig(themeStyle == 'dark' ? defaultDarkColors : defaultColors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        form.state = 'loading';
        themeFormElement.value.reportValidity();

        if (!themeFormElement.value.checkValidity()) {
            // console.log('invalid', themeFormElement.value.checkValidity());
            const list = themeFormElement.value.querySelectorAll('fieldset :invalid');
            list.forEach(elem => {
                fields[elem.id].error = elem.validationMessage;
            })

            list[0].focus();
            form.state = '';
            return;
        }

        const background_tc = new TinyColor(fields.background.value.hex);

        let data = {
            theme_type:  background_tc.isLight() ? 'light' : 'dark',
            colors: {}
        };

        for (let [key, value] of Object.entries(fields)) {
            data.colors[key] = value.value;
        }

            // let background_alt_tc = new TinyColor(fields.background.value.hex).lighten(12);

            // let background_alt_tc = data.colors.theme_type == 'light' ? background_tc.clone().lighten(15) : background_tc.clone().lighten(7);
        let background_lum = background_tc.getLuminance();

        let background_alt_tc =
            background_lum > 0.95 ? background_tc.clone().darken(4) :
            background_lum < 0.1 ? background_tc.clone().lighten(3) :
            background_tc.clone().lighten(background_lum * 14);

        data.colors.background_alt = {
            hex: background_alt_tc.toHexString(),
            hsl: background_alt_tc.toHsl()
        };

        data.colors.background_alt.hsl.hsl = background_alt_tc.toHslString().replace('hsl(', '').replace(')', '');
        data.colors.background_alt.hsl.s = data.colors.background_alt.hsl.s * 100;
        data.colors.background_alt.hsl.l = data.colors.background_alt.hsl.l * 100;

        console.log('getLuminance', background_tc.getLuminance());


        let background_alt2_tc =
            background_lum > 0.93 ? background_tc.clone().darken(1.5) :
            background_lum < 0.1 ? background_tc.clone().lighten(5) :
            background_tc.clone().lighten(background_lum * 8);

        data.colors.background_alt2 = {
            hex: background_alt2_tc.toHexString(),
            hsl: background_alt2_tc.toHsl()
        };

        data.colors.background_alt2.hsl.hsl = background_alt2_tc.toHslString().replace('hsl(', '').replace(')', '');
        data.colors.background_alt2.hsl.s = data.colors.background_alt2.hsl.s * 100;
        data.colors.background_alt2.hsl.l = data.colors.background_alt2.hsl.l * 100;

        updateConfig(data);
    }

    async function updateConfig(data) {
        form.state = 'loading';

        const outcome = await organisationStore.updateThemeConfig(data);

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
        props.callback('colors');
    }
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