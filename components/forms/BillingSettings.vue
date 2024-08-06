<template>
    <form v-on:submit="handleSubmit" class="form form--settings-billing" :class="{ 'loading': form.state == 'loading', 'form-error': form.error }" ref="billingFormElement">

        <fieldset>
            <Field
                v-for="(field, key) in fields"
                id="key"
                :labelText="getLabelText(key)"
                :required="field.required"
                :error="field.error"
                :cssClass="{ 'disabled': key == 'tax_rate' && fields.tax_name.value == 'NONE' }"
            >
                <select
                    v-if="field.type == 'select'"
                    v-model="fields[key].value"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :required="fields[key].required"
                >
                    <option v-for="option in field.options" :value="option">{{ `${option === 'NONE' ? 'None' : option}` }}</option>
                </select>

                <input
                    v-else
                    v-model="fields[key].value"
                    v-on:change="handleChange(key)"
                    :id="key"
                    :type="field.type"
                    :required="fields[key].required"
                    :placeholder="fields[key].placeholder"
                    :disabled="key == 'tax_rate' && fields.tax_name.value == 'NONE'"
                />
            </Field>
        </fieldset>

        <Error v-if="form.error" :message="form.error"></Error>
        <button type="submit" class="btn btn--success" :disabled="form.pristine">Save</button>
    </form>
</template>

<script setup>

    import { ref, reactive } from 'vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Field from '@/components/forms/shared/Field.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    const organisationStore = useOrganisationStore();

    const props = defineProps({
        callback: {
            type: Function
        }
    });

    const billingFormElement = ref(null);

    let form = reactive({
        pristine: true,
        state: 'init',
        error: null
    })


    function getLabelText(key) {
        let transformedText = key.replace('_', ' ');

        if (key == "tax_rate") {
            transformedText += ' (%)';
        }

        return transformedText;
    };

    const fields = reactive({
        currency_symbol: {
            value: organisationStore.settings.billing.currency_symbol,
            required: true,
            error: null,
            placeholder: "£",
            type: "select",
            options: ["$", "£", "R"],
        },
        invoice_title: {
            value: organisationStore.settings.billing.invoice_title,
            required: true,
            error: null,
            placeholder: "Invoice",
            type: "select",
            options: ["Invoice", "Tax Invoice"],
        },
        tax_name: {
            value: organisationStore.settings.billing.tax_name,
            required: true,
            error: null,
            placeholder: "VAT",
            type: "select",
            options: ["NONE", "GST", "VAT", "Sales Tax"],
        },
        tax_rate: {
            value: organisationStore.settings.billing.tax_rate,
            required: false,
            error: null,
            placeholder: "20",
            type: "number"
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        billingFormElement.value.reportValidity();

        if (!billingFormElement.value.checkValidity()) {
            const list = billingFormElement.value.querySelectorAll('fieldset :invalid');
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
        const outcome = await organisationStore.updateOrganisationBillingSettings(data);
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

            fields.currency_symbol.error = null;
            return;
        }

        props.callback();
    };

    const clearError = (id) => {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };

    const handleChange = (id) => {
        form.pristine = false;
        clearError(id);
    }
</script>

<style lang="scss">

</style>