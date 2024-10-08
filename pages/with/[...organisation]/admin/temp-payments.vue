<template>
    <Header title="Payment Options"></Header>

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
                <GenericForm v-if="key == 'memberships'" id="addMembershipForm" :fields="membershipFields" :endpoint="organisationStore.addMembership" :callback="handleAddPaymentOption" :showReset="false" />


            </template>
        </Card>
        <section class="customer-groups" :class="selectedGroup ? 'customer-groups--group-selected' : null" >
        <div class="customer-group-listing" >
            <vue3-datatable
                v-if="organisationStore.purchaseTypes.memberships"
                :rows="organisationStore.purchaseTypes.memberships"
                :columns="cols"
                :sortable="true"
                :key="organisationStore.purchaseTypes.memberships?.length"
                :totalRows="organisationStore.purchaseTypes.memberships?.length"
                sortDirection="desc"
                :columnFilter="false"
                pageSize="20"
                :pageSizeOptions="[20, 50, 100]"
                :showPageSize="organisationStore.purchaseTypes.memberships?.length > 20"
                :pagination="organisationStore.purchaseTypes.memberships?.length > 20"
                noDataContent="You don’t have any memberships to display."
                :loader="true"
                skin="bh-table-hover"
                v-on:rowClick="handleRowClick"
            >
                <template #name="data">
                    <strong>{{ data.value.name }}</strong>
                </template>

                <template #actions="data">
                    <ArrowRightCircle />
                </template>
            </vue3-datatable>
        </div>
        <!-- <div ref="selectedCustomerGroupElem" aria-hidden="true"></div>
        <Card v-if="selectedGroup" :id="selectedGroup.id" :cssClass="`customer-group sticky card--header-bk`" :title="selectedGroup.name">
            <template #header>
                <p class="p-small m-top">{{ selectedGroup.description }}</p>
            </template>
            <template #actions>
                <button type="button" class="btn btn--sm" v-on:click="handleEditGroupClick()" title="Edit Customer Group">
                    <Xmark v-if="inEditMode" />
                    <span v-if="inEditMode" class="mobile-hide">Cancel Edit</span>

                    <EditPencil v-if="!inEditMode" />
                    <span v-if="!inEditMode" class="mobile-hide">Edit</span>
                </button>
                <button type="button" class="btn btn--sm btn--tertiary btn--danger" v-on:click="handleShowConfirmDeleteClick()" title="Delete Customer Group">
                    <Trash />
                    <span class="mobile-hide">Delete</span>
                </button>
            </template>

            <template #body>
                <Dialog v-if="showConfirmDelete" cssClass="danger m-bottom" :callback="handleDialogChange">
                    <template #header>
                        <p>Delete the <strong>{{ selectedGroup.group_name }}</strong> group?</p>
                    </template>
                    <template #body>
                        <footer class="btn-bar">
                            <button type="button" class="btn btn--sm btn--danger" v-on:click="deleteGroup()">
                                <Trash />
                                Delete
                            </button>
                            <button type="button" class="btn btn--outline btn--sm" v-on:click="showConfirmDelete = false">
                                <Xmark />
                                Cancel
                            </button>
                        </footer>
                    </template>
                </Dialog>

                <GenericForm v-if="inEditMode" title="Edit Customer Group" :id="selectedGroup.id" :fields="selectedGroupFields" :endpoint="organisationStore.updateCustomerGroup" :callback="handleEditCustomerGroup" :showReset="false" />

                <section class="section">
                    <header class="section__header">
                        <h4 class="section__header-title">Customers</h4>

                        <button type="button" class="btn btn--sm btn--secondary" v-on:click="toggleEditGroupCustomersVisibility" title="Add customers to customer group">
                            <EditPencil v-if="!editGroupCustomers" />
                            <span v-if="!editGroupCustomers">Edit <span class="mobile-hide">Customers</span>
                        </span>

                            <Xmark v-if="editGroupCustomers" />
                            <span v-if="editGroupCustomers" class="mobile-hide">Cancel</span>
                        </button>

                        <button v-if="editGroupCustomers" type="button" class="btn btn--sm btn--success" v-on:click="handleEditCustomerGroupCustomers" title="Save Customer Group Customers">
                            <FloppyDisk />
                            <span class="mobile-hide">Save Customers</span>
                        </button>
                    </header>

                    <ul v-if="!editGroupCustomers" class="selected-customers">
                        <li v-if="!selectedGroup.customers?.length">
                            No customers in this group.
                        </li>
                        <li v-if="selectedGroup.customers?.length">{{ selectedGroup.customers.length }} {{ selectedGroup.customers.length == 1 ? 'customer' : 'customers' }}: </li>
                        <li v-for="customer in selectedGroup.customers">{{ customer.first_name }} {{ customer.last_name }}</li>
                    </ul>

                    <ul v-if="editGroupCustomers" class="selected-customers">
                        <li v-if="selectedCustomers?.length">{{ selectedCustomers?.length }} {{ selectedCustomers.length == 1 ? 'customer' : 'customers' }}: </li>
                        <li v-for="customer in selectedCustomers">{{ customer.first_name }} {{ customer.last_name }}</li>
                    </ul>

                    <CustomerList v-if="editGroupCustomers" :data="organisationStore.customers" :initialSelection="selectedGroup.customers" :callback="handleSelectedCustomersUpdate" />
                </section>
            </template>

            <template #footer>
                <p class="small">
                    <small>
                        Group created {{ formatDtmShort(selectedGroup.created_dtm, `en-${organisationStore.account.country_code.toLowerCase()}`) }}
                    </small>
                </p>
            </template>
        </Card> -->
    </section>
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
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import Card from '@/components/interface/Card.vue';
    import GenericForm from '@/components/forms/GenericForm.vue';

    import { useOrganisationStore } from '@/stores/organisation';

    const organisationStore = useOrganisationStore();
    const inEditMode = ref(null);
    const showAddPaymentOption = ref(null);
    const snackbar = useSnackbar();

    const route = useRoute();

    const cols = ref([
        { field: "name", title: "Name", cellClass: "td-name" },
        { field: "description", title: "Description", cellClass: "td-description", headerClass: "th-description" },
        { field: "price", title: "Price"},
        { field: 'actions', title: "", headerClass: "th-group-actions" }
    ]);

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
            label: "Duration in months",
            type: "number",
            value: 3,
            required: true,
            error: null,
            placeholder: ""
        },
        is_public: {
            type: "toggle",
            label: "Publically available?",
            offLabel: "No, invitation only",
            onLabel: "Yes, available to all",
            value: true,
            required: false,
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
        showAddPaymentOption.value = null;

        snackbar.add({
            type: 'success',
            text: 'Payment option added'
        });
    }
</script>

<style lang="scss">

</style>