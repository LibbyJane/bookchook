<template>
    <form v-on:submit="handleSubmit" class="form" :class="{ 'loading': form.state == 'loading', 'form-error': form.error, cssClass } " ref="formElement">
        <fieldset>
            <h5 v-if="title" class="m-bottom">{{ title }}</h5>
            <Field
                v-for="(field, key) in fields"
                id="key"
                :labelText="getLabelText(key)"
                :required="field.required"
                :error="field.error"
            >
                <input v-if="displayAsInput(field)"
                    v-model="fields[key].value"
                    v-on:keyup="handleChange(key)"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :type="field.type ? field.type : null"
                    :required="field.required"
                    :placeholder="field.placeholder"
                />

                <textarea v-if="field.type == 'textarea'"
                    v-model="fields[key].value"
                    v-on:keyup="handleChange(key)"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :type="field.type ? field.type : null"
                    :required="field.required"
                    :placeholder="field.placeholder"></textarea>
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

    import { ref, reactive, nextTick } from 'vue';
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
        if (!field.type || field.type == 'input') {
            return true;
        }
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
        }

        const outcome = await props.endpoint(payload);
        // console.log('outcome', outcome);

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
