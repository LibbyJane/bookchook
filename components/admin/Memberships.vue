<template>
    <Header elemType="h3" title="Memberships">
        <template #actions>
            <button type="button" class="btn btn--secondary" v-on:click="toggleAddMembershipOptionVisibility">
                <template v-if="!showAddNewForm">
                    <Plus />
                    Add New
                </template>
                <template v-if="showAddNewForm">
                    <Xmark />
                    Cancel
                </template>
            </button>
        </template>
    </Header>

    <Card v-if="showAddNewForm" title="Add new membership type" titleCssClass="h4">
        <template #body>
            <GenericForm id="addMembershipForm" :fields="fields" :endpoint="organisationStore.addMembership" :callback="handleAddMembershipOption" />
        </template>
    </Card>

    <section class="table-with-card" :class="selectedItem ? 'table-with-card--row-selected' : null">
        <vue3-datatable
            v-if="organisationStore.purchaseTypes.memberships"
            :rows="organisationStore.purchaseTypes.memberships"
            :columns="cols"
            :sortable="organisationStore.purchaseTypes.memberships?.length > 2"
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
            v-on:rowClick="handleMembershipRowClick"
        >
            <template #name="data">
                <strong>{{ data.value.name }}</strong>
            </template>
            <template #price="data">
                {{ organisationStore.settings.billing.currency_symbol }}{{ data.value.price }} for {{ data.value.duration }} {{ (data.value.duration_unit).toLowerCase() }}
            </template>
            <template #actions="data">
                <ArrowRightCircle />
            </template>
        </vue3-datatable>
        <div class="table-with-card__card">
            <div ref="selectedItemElem" aria-hidden="true"></div>
            <!-- <Card v-if="selectedItem" :id="selectedItem.id" :cssClass="`membership sticky ${selectedItem.is_public ? 'card--header-bk' : 'card--header-bk-alt' }`"> -->
            <Card v-if="selectedItem" :id="selectedItem.id" class="membership sticky card--header-bk">
                <template #header>
                    <h3 class="card__header-heading">
                        {{ selectedItem.name }}
                    </h3>
                    <p class="card__header-subheading pill">
                        <template v-if="selectedItem.is_public">
                            Publically Available
                        </template>
                        <template v-if="!selectedItem.is_public">
                            <Lock />Invitation Only
                        </template>
                    </p>
                </template>

                <template #actions>
                <button type="button" class="btn btn--sm" v-on:click="handleEditButtonClick()" title="Edit">
                    <Xmark v-if="inEditMode" />
                    <span v-if="inEditMode" class="mobile-hide">Cancel Edit</span>

                    <EditPencil v-if="!inEditMode" />
                    <span v-if="!inEditMode" class="mobile-hide">Edit</span>
                </button>
                <button type="button" class="btn btn--sm btn--tertiary btn--danger" v-on:click="handleShowConfirmDeleteClick()" title="Delete">
                    <Trash />
                    <span class="mobile-hide">Delete</span>
                </button>
            </template>
                <template #body>
                    <Dialog v-if="showConfirmDelete" cssClass="danger m-bottom" :callback="handleDialogChange">
                        <template #header>
                            <p>Delete <strong>{{ selectedItem.name }}</strong>?</p>
                        </template>
                        <template #body>
                            <footer class="btn-bar">
                                <button type="button" class="btn btn--sm btn--danger" v-on:click="deleteItem()">
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

                    <GenericForm v-if="inEditMode" title="Edit Membership" :id="selectedItem.id" :fields="editFields" :endpoint="organisationStore.updateMembership" :callback="handleEdit" :showReset="false" />

                    <p>{{ selectedItem.description }}</p>
                    <p><strong>{{ organisationStore.settings.billing.currency_symbol }}{{ selectedItem.price }} for {{ selectedItem.duration }} {{ (selectedItem.duration_unit).toLowerCase() }}</strong></p>

                    <Header elemType="h6" :title="`${selectedItem.membership_users?.length ? selectedItem.membership_users.length : 'No' } active member${ selectedItem.membership_users?.length == 1 ? '' : 's' }`">
                        <template #actions>
                            <button type="button" class="btn btn--secondary" v-on:click="toggleAddUserFormVisibility">
                                <template v-if="!showAddUserForm">
                                    <Plus />
                                    Add User
                                </template>
                                <template v-if="showAddUserForm">
                                    <Xmark />
                                    Cancel
                                </template>
                            </button>
                        </template>
                    </Header>
                    <!-- <AddUser v-if="showAddUserForm" :endpoint="organisationStore.addMembership" :callback="handleAddMembershipOption" /> -->


                    <CustomerList v-if="showAddUserForm" :initialSelection="selectedItem.membership_users" :callback="handleUsersAdded" />


                    <vue3-datatable
                        v-if="selectedItem && selectedItem.membership_users?.length"
                        :rows="selectedItem.membership_users"
                        :columns="membershipUsersCols"
                        :sortable="selectedItem.membership_users?.length > 1"
                        :sortColumn="expires_dtm"
                        :sortDirection="desc"
                        :columnFilter="false"
                        pageSize="100"
                        :pageSizeOptions="[100, 200, 1000]"
                        :showPageSize="selectedItem.membership_users?.length > 100"
                        :pagination="selectedItem.membership_users?.length > 100"
                        :loader="true"
                        skin="bh-table-hover"
                        v-on:rowClick="handleMembershipUserRowClick"
                    >
                        <template #first_name="data">
                            {{ data.value.user.first_name }}
                        </template>
                        <template #last_name="data">
                            {{ data.value.user.last_name }}
                        </template>
                        <template #created_dtm="data">
                            {{ formatDtmShort(data.value.created_dtm) }}
                        </template>
                        <template #expires_dtm="data">
                            {{ formatDtmShort(data.value.expires_dtm) }}
                        </template>
                        <template #remaining="data">
                            {{ daysUntilDtm(data.value.expires_dtm) }}
                        </template>
                    </vue3-datatable>
                </template>

            </Card>
        </div>

    </section>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { Plus, EditPencil, Xmark, Trash, ArrowRightCircle, Lock} from '@iconoir/vue';
    import { useOrganisationStore } from '@/stores/organisation';
    import { formatDtmShort, daysUntilDtm } from '@/utils/dates';
    import Header from '@/components/admin/PageHeader.vue';
    import CustomerList from '@/components/admin/CustomerList.vue';

    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import Card from '@/components/interface/Card.vue';
    import GenericForm from '@/components/forms/GenericForm.vue';
    import Dialog from '@/components/interface/Dialog.vue';


    const organisationStore = useOrganisationStore();
    const showAddNewForm = ref(null);
    const selectedItem = ref(null);
    const selectedItemElem = ref(null);
    const snackbar = useSnackbar();

    const route = useRoute();


    const cols = ref([
        { field: "name", title: "Name", cellClass: "td-name" },
        { field: "description", title: "Description", cellClass: "hide-if-row-selected", headerClass: "hide-if-row-selected" },
        { field: "price", title: "Price", cellClass: "hide-if-row-selected", headerClass: "hide-if-row-selected"},
        { field: 'actions', title: "", headerClass: "th-group-actions" }
    ]);

    const membershipUsersCols = ref([
        { field: "first_name", title: "First Name" },
        { field: "last_name", title: "Last Name" },
        { field: "created_dtm", title: "Created"},
        { field: "expires_dtm", title: "Expires"},
        { field: "remaining", title: "Days Remaining"},
        { field: "added_by", title: "Added By"},
        { field: 'actions', title: "", headerClass: "th-group-actions"}
    ]);

    let fieldDefaults = {
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
            type: "number",
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
    }

    const fields = reactive({...fieldDefaults});

    let editFields;

    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());

    function toggleAddMembershipOptionVisibility() {
        showAddNewForm.value = !showAddNewForm.value;
          // fields.name.value = "";
        // fields.description.value = "";
        // if (showAddNewForm.value) {
        //     resetselectedItem();
        //     return;
        // }
    }

    function handleAddMembershipOption() {
        showAddNewForm.value = null;

        snackbar.add({
            type: 'success',
            text: 'Payment option added'
        });
    }


    async function handleMembershipRowClick(data) {
        if (selectedItem.value?.id == data.id) {
            selectedItem.value = null;
            // history.pushState({}, null, route.path)
            return;
        }

        selectedItem.value = data;
        // resetselectedItem();

        if (!selectedItem.value?.membership_users) {
            const response = await organisationStore.getAllUsersForMembership({id: data.id});
            console.log('response', response);

            if (response.error) {
                snackbar.add({
                    type: 'danger',
                    text: 'User data could not be loaded. Please try again later.'
                });
            }
            selectedItem.value.membership_users = response.membership_users;
        }

        // history.pushState({}, "", route.path + '#' + data.id);
        selectedItemElem.value.scrollIntoView();
    }

    // Edit a Membership
    const inEditMode = ref(false);

    function handleEditButtonClick() {
        editFields = {...fieldDefaults};
        editFields.name.value = selectedItem.value.name;
        editFields.description.value = selectedItem.value.description;
        editFields.price.value = selectedItem.value.price;
        editFields.duration_unit.value = selectedItem.value.duration_unit;
        editFields.duration.value = selectedItem.value.duration;
        editFields.is_public.value = selectedItem.value.is_public;
        inEditMode.value = !inEditMode.value;
        showConfirmDelete.value = false;
    }

    function resetselectedItem() {
        editFields = {...fieldDefaults};
        selectedCustomers.value = null;
        // selectedItemFields.name.value = selectedItem.value.group_name;
        // selectedItemFields.description.value = selectedItem.value.description;
        inEditMode.value = false;
        showConfirmDelete.value = false;
        editGroupCustomers.value = false;
    }

    async function handleEdit(id) {
        snackbar.add({
            type: 'success',
            text: 'Membership updated'
        });
        inEditMode.value = false;
        await organisationStore.getOrganisationMemberships();
        selectedItem.value = organisationStore.customerGroups.find((element => element.id == id));
    }


    // Delete a customer group
    const showConfirmDelete = ref(false);

    function handleShowConfirmDeleteClick() {
        showConfirmDelete.value = !showConfirmDelete.value;
        inEditMode.value = false;
    }

    function handleDialogChange(change) {
        if (change == 'closed') showConfirmDelete.value = false;
    }

    async function deleteItem() {
        showConfirmDelete.value = false;
        const response = await useAsyncData(() => organisationStore.deleteMembership({id: selectedItem.value.id}));

        if (response.error?.value) {
            snackbar.add({
                type: 'error',
                text: 'There was a problem deleting the membership. Please try again later.'
            })

            return;
        }

        selectedItem.value = null;

        snackbar.add({
            type: 'success',
            text: 'Membership deleted'
        })
    }


    async function handleMembershipUserRowClick() {
        console.log('do something?');
    }

    // Add user to membership

    const showAddUserForm = ref(null);

    let userFieldDefaults = {
        user: {
            label: "Select",
            value: {},
            options: [],
            required: true,
            error: null,
            placeholder: ""
        }
    }

    const addUserFields = reactive({...userFieldDefaults});


    async function toggleAddUserFormVisibility() {
        showAddUserForm.value = !showAddUserForm.value;

        if (!organisationStore.customers?.length) {
            await organisationStore.getOrganisationCustomers();
        }

        addUserFields.user.options = organisationStore.customers;


          // fields.name.value = "";
        // fields.description.value = "";
        // if (showAddNewForm.value) {
        //     resetselectedItem();
        //     return;
        // }
    }

    function handleUsersAdded() {
        console.log('do something');
    }



</script>

<style lang="scss">

</style>