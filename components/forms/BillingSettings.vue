<template>
    <form v-on:submit="handleSubmit" class="form form--settings-billing" :class="{ 'loading': form.state == 'loading' }" ref="billingFormElement">

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

        <button type="submit" class="btn btn--success">Save</button>
    </form>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import Field from '@/components/forms/shared/Field.vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    const organisationStore = useOrganisationStore();

    const props = defineProps({
        id: {}
    });

    const billingFormElement = ref(null);

    let form = reactive({
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
            type: "text"
        },
        invoice_title: {
            value: organisationStore.settings.billing.invoice_title,
            required: true,
            error: null,
            placeholder: "Invoice Title",
            type: "text"
        },
        tax_name: {
            value: organisationStore.settings.billing.tax_name,
            required: true,
            error: null,
            placeholder: "VAT",
            type: "text"
        },
        tax_rate: {
            value: organisationStore.settings.billing.tax_rate,
            required: true,
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