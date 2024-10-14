<template>
    <form v-on:submit="handleSubmit" class="form" :class="{ 'loading': form.state == 'loading', 'form-error': form.error, cssClass } " ref="formElement">
        <fieldset class="fieldset--flex">
            <h5 v-if="title" class="m-bottom">{{ title }}</h5>
            <Field
                v-for="(field, key) in fields"
                id="key"
                :cssClass="field.cssClass"
                :labelText="field.label ? field.label : getLabelText(key)"
                :required="field.required"
                :showValidationStatus="field.type != 'toggle'"
                :error="field.error"
                :hidden="field.type && field.type == 'hidden'"
                :help="field.help"
            >

                <input v-if="displayAsInput(field)"
                    v-model="fields[key].value"
                    v-on:keyup="handleChange(key)"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :required="field.required"
                    :placeholder="field.placeholder"
                    :type="field.type ? field.type : null"
                />

                <textarea v-else-if="field.type == 'textarea'"
                    v-model="fields[key].value"
                    v-on:keyup="handleChange(key)"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :required="field.required"
                    :placeholder="field.placeholder"></textarea>

                <select v-else-if="field.type == 'select'"
                    v-model="fields[key].value"
                    v-on:keyup="handleChange(key)"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :type="field.type ? field.type : null"
                    :required="field.required"
                    :placeholder="field.placeholder"
                >
                    <slot />
                    <option v-for="option in field.options" :value="option.value" :disabled="option.disabled">{{ option.text }}</option>
                </select>

                <div v-else-if="field.type == 'comboBox'" class="combobox">
                    <input
                        type="search"
                        v-on:input="$event => filterComboBox(key, $event.target.value)"
                        v-on:focus="$event => filterComboBox(key, $event.target.value)"
                        :required="field.required"
                        :id="key"
                        :placeholder="field.placeholder"
                        :autofocus="field.autofocus"
                        v-model="fields[key].searchValue"
                    />
                    <ul class="combobox__options">
                        <li v-for="option in field.options">
                            <label v-if="!option.hidden" v-on:click="handleCbChange(key, option.text)">
                                <input type="radio" name="`cb-${key}`" :value="option.value" v-model="fields[key].value" :disabled="option.disabled" />{{ option.text }}
                            </label>
                        </li>
                    </ul>
                </div>

                <div class="toggle-switch" v-else-if="field.type == 'toggle'">
                    <span v-if="field.offLabel" class="toggle-switch__off-label">{{ field.offLabel }}</span>
                    <span class="toggle-switch__input">
                        <input
                            v-model="fields[key].value"
                            v-on:keyup="handleChange(key)"
                            v-on:change="handleChange(key)"
                            :id="key"
                            type="checkbox"
                        >
                    </span>
                    <span v-if="field.onLabel" class="toggle-switch__on-label">{{ field.onLabel }}</span>
                </div>

                <!-- <VDatePicker v-else-if="field.type == 'date'" v-model="fields[key].value" :attributes="field.datePickerAttrs"
                 /> -->
            </Field>
        </fieldset>

        <Error v-if="form.error" :message="form.error"></Error>

        <footer class="btn-bar">
            <button type="submit" class="btn btn--success" :disabled="form.pristine">Save</button>
            <button v-if="showReset" type="reset" class="btn btn--plain btn--sm" :disabled="form.pristine" ref="resetButton">
                <RefreshDouble />
                Reset
            </button>
        </footer>
    </form>
</template>

<script setup>

    import { ref, reactive, nextTick} from 'vue';
    import { RefreshDouble } from '@iconoir/vue';

    import Error from '@/components/forms/shared/Error.vue';
    import Field from '@/components/forms/shared/Field.vue';

    const props = defineProps({
        id: {
            type: String,
            default: ""
        },
        cssClass: {
            type: String
        },
        title: {

        },
        fields: {
            required: true
        },
        endpoint: {
            required: true
        },
        callback: {
            type: Function
        },
        showReset: {
            default: true
        }
    });

    const formElement = ref(null);
    const resetButton = ref(null);

    let form = reactive({
        pristine: true,
        state: 'init',
        error: null
    })

    function getLabelText(key) {
        let transformedText = key.replace('_', ' ');
        return transformedText;
    };

    function displayAsInput(field) {
        if (!field.type) return true;

        const fieldType = field.type.toLowerCase();


        if (fieldType == 'text' || fieldType == 'number' || fieldType == 'password' || fieldType == 'date' || fieldType == 'input' || fieldType == 'hidden') {
            return true;
        }
    }

    const filterComboBox = (key, val) => {
        val = val.toLowerCase();
        props.fields[key].options.forEach(option => {
            const searchMatched = val && option.text?.toLowerCase().indexOf(val) > -1;

            if (!val) {
                option.hidden = false;
                props.fields[key].value = null;
            } else if (!searchMatched) {
                option.hidden = true;
            } else {
                option.hidden = false;
            }
        });

        this.handleChange(key);
    }

    function handleCbChange(key, display) {
        props.fields[key].searchValue = display;
    }

    const handleChange = (id) => {
        form.pristine = false;
        clearError(id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        formElement.value.reportValidity();
        form.pristine = true;

        if (!formElement.value.checkValidity()) {
            const list = formElement.value.querySelectorAll('fieldset :invalid');
            list.forEach(elem => {
                props.fields[elem.id].error = elem.validationMessage;
            })

            list[0].focus();
            form.state = '';
            return;
        }

        let payload = {
            id: props.id,
            data: {}
        };

        for (let [key, value] of Object.entries(props.fields)) {
            payload.data[key] = value.value;

            if (value.type == 'date') {
                console.log('k, v', key, value);
                const dateParts = value.value.split('-');
                const year = parseInt(dateParts[0]);
                const monthIndex = parseInt(dateParts[1]) - 1;
                const day = parseInt(dateParts[2]);

                console.log('dateParts', dateParts, (new Date(year, monthIndex, day)).toISOString());

                payload.data[key] = (new Date(year, monthIndex, day)).toISOString();
            }
        }
        // console.log('gf endpoint', props.endpoint);
        // console.log('gf payload', payload);
        const outcome = await props.endpoint(payload);
        // console.log('gf outcome', outcome);

        form.state = '';
        let errorMessage;

        if (outcome && outcome.error) {
            errorMessage = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                errorMessage += `${error}`;
            }
        }
        if (errorMessage) {
            errorMessage = errorMessage.replaceAll('_', ' ');
            form.error = errorMessage;
            return;
        }

        props.callback(outcome.data);

        if (resetButton?.value?.click()) {
            await nextTick();
            resetButton.value.click();
        }
    };

    const clearError = (id) => {
        if (!id || !props.fields[id])  return;
        props.fields[id].error = null;
        form.error = '';
    };
</script>
