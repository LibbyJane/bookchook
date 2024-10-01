<template>
    <Header title="Payment Options"></Header>
    <pre>{{ showAddPaymentOption }}</pre>

    <template v-for="purchaseType, key in organisationStore.purchaseTypes">
            <Header elemType="h3" :title="key" titleCssClass="capitalise">
                <template #actions>
                <button type="button" class="btn btn--secondary" v-on:click="toggleAddPaymentOptionVisibility(key)">
                    <template v-if="!showAddPaymentOption">
                        <Plus />
                        Add New
                    </template>
                    <template v-if="showAddPaymentOption">
                        <Xmark />
                        Cancel
                    </template>
                </button>
            </template>
        </Header>

        <p v-if="!purchaseType.length" class="m-bottom-med">There are no {{ key }} to show.</p>

        <Card v-if="showAddPaymentOption && showAddPaymentOption == key" cssClass="create-customer-group" title="Add new membership type" titleCssClass="h4">
            <template #body>
                <GenericForm v-if="key == 'memberships'" id="addMembershipForm" :fields="membershipFields" :endpoint="organisationStore.addMembership" :callback="handleAddPaymentOption" />
            </template>
        </Card>

        <Card
            v-for="pt in purchaseType"
            class="card card--header-bk card--condensed"
            :class="{ 'editing': inEditMode == key }"
        >
            <template #header>
                <h4 class="card__header--heading">{{ pt.name }}</h4>
            </template>
            <template #actions>
                <button type="button" class="btn btn--sm btn--tertiary" v-on:click="inEditMode == key ? inEditMode = null : inEditMode = key">
                    <template v-if="inEditMode == key">
                        <Xmark />
                        Cancel
                    </template>
                    <template v-if="inEditMode != key">
                        <EditPencil />
                        Edit
                    </template>
                </button>

                <button v-if="inEditMode != key" type="button" class="btn btn--sm btn--tertiary btn--danger" v-on:click="inEditMode = key" title="Delete this option">
                    <Trash />
                </button>
            </template>
            <template #body>
                <p>{{ pt.description }}</p>
                <p>{{ organisationStore.settings.billing.currency_symbol }}{{ pt.price }} for {{ pt.duration }} {{ (pt.duration_unit).toLowerCase() }}</p>
            </template>
        </Card>
    </template>
</template>

<script setup>
    import { ref } from 'vue';
    import { Plus, EditPencil, Xmark, Trash} from '@iconoir/vue';
    import Header from '@/components/admin/PageHeader.vue';
    import Card from '@/components/interface/Card.vue';
    import GenericForm from '@/components/forms/GenericForm.vue';

    import { useOrganisationStore } from '@/stores/organisation';

    const organisationStore = useOrganisationStore();
    const inEditMode = ref(null);
    const showAddPaymentOption = ref(false);
    const snackbar = useSnackbar();

    const membershipFields = reactive({
        name: {
            label: "Membership Name",
            value: "Three Month Membership",
            required: true,
            error: null,
            placeholder: ""
        },
        description: {
            value: "A 3 month membership with Community TTC",
            type: "textarea",
            required: true,
            error: null,
            placeholder: ""
        },
        price: {
            label: `Price (${organisationStore.settings.billing.currency_symbol})`,
            value: 90,
            required: true,
            error: null,
            placeholder: ""
        },
        duration_unit: {
            type: "hidden",
            value: "MONTHS",
            required: true,
            error: null,
            placeholder: ""
        },
        duration: {
            label: `Duration in months`,
            type: "number",
            value: 3,
            required: true,
            error: null,
            placeholder: ""
        },
        is_public: {
            label: `Is available to all customers?`,
            type: 'radio',
            value: true,
            required: true,
            error: null,
            placeholder: ""
        }
    });

    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());

    function toggleAddPaymentOptionVisibility(key) {
        console.log('key', key);
          // fields.name.value = "";
        // fields.description.value = "";
        if (showAddPaymentOption.value) {
            showAddPaymentOption.value = null;
            // resetSelectedGroup();
            return;
        }

        showAddPaymentOption.value = key;
    }

    function handleAddPaymentOption() {
        console.log('do something');

        snackbar.add({
            type: 'success',
            text: 'Payment option added'
        });
    }
</script>

<style lang="scss">

</style>