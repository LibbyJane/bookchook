<template>
    <Header title="Payment Options" />

    <Card v-if="showCreateGroup" cssClass="create-customer-group">
        <template #body>
            <GenericForm id="createCG" :fields="fields" :endpoint="organisationStore.createCustomerGroup" :callback="handleCreateGroupUpdate" />
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
</template>

<script setup>
    import { ref, onMounted, computed, nextTick } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { formatDtmShort } from '@/utils/dates';
    import { useOrganisationStore } from '@/stores/organisation';
    import { Trash, Xmark, EditPencil, ArrowRightCircle, Plus, Minus, FloppyDisk, Community } from '@iconoir/vue';

    import Header from '@/components/admin/PageHeader.vue';
    import GenericForm from '@/components/forms/GenericForm.vue';
    import Card from '@/components/interface/Card.vue';
    import Dialog from '@/components/interface/Dialog.vue';
    import CustomerList from '@/components/admin/CustomerList.vue';

    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());

    const snackbar = useSnackbar();
    const route = useRoute();

    const cols = ref([
        { field: "name", title: "Name", cellClass: "td-name" },
        { field: "description", title: "Description", cellClass: "td-description", headerClass: "th-description" },
        { field: "price", title: "Price"},
        { field: 'actions', title: "", headerClass: "th-group-actions" }
    ]);

    function initCols() {
        cols.value?.forEach(col => {
            col.condition = "start_with";
        });
    }

    onMounted( ()=>{
        initCols();

        if (route.hash) {
            const selectedGroupID = route.hash.replace('#', '');
            selectedGroup.value = organisationStore.customerGroups.find( cg => cg.id == selectedGroupID );
        }
    });

    const addNewOffer = ref(false);

    let customerGroupDefaults = {
        name: {
            value: "",
            required: true,
            error: null,
            placeholder: ""
        },
        description: {
            value: "",
            required: true,
            error: null,
            placeholder: "",
            type: "textarea"
        },
    }

    const fields = reactive({...customerGroupDefaults});

    // Create a customer group
    const showCreateGroup = ref(false);
    const selectedGroup = ref(null);


    function toggleCreateGroupVisibility() {
        fields.name.value = "";
        fields.description.value = "";
        showCreateGroup.value = !showCreateGroup.value;

        if (showCreateGroup.value) {
            selectedGroup.value = null;
            resetSelectedGroup();
        }
    }

    function handleCreateGroupUpdate(data) {
        if (data?.status) {
            fields.name.value = "";
            fields.description.value = "";
            showCreateGroup.value = false;
            selectedGroup.value = data.customerGroup;

            snackbar.add({
                type: 'success',
                text: 'Customer group created'
            });
        }
    }

    // Select a customer group

    let selectedGroupFields;
    const selectedCustomerGroupElem = ref(null);

    async function handleRowClick(group) {
        if (selectedGroup.value?.id == group.id) {
            selectedGroup.value = null;
            history.pushState({}, null, route.path)
            return;
        }

        selectedGroup.value = group;
        resetSelectedGroup();

        // if (!selectedGroup.value?.customers) {
        //     const response = await organisationStore.getCustomerGroupCustomers({id: group.id});

        //     if (response.error) {
        //         snackbar.add({
        //             type: 'danger',
        //             text: 'Customers could not be loaded. Please try again later.'
        //         });
        //     }
        //     selectedGroup.value.customers = await organisationStore.getCustomerGroupCustomers({id: group.id});
        // }

        history.pushState({}, "", route.path + '#' + group.id);
        selectedCustomerGroupElem.value.scrollIntoView();
    }

    const getGroupName = computed( () => {
        let name = '';
        for (let key in organisationStore.customerGroups) {
            if (organisationStore.customerGroups[key].id == selectedGroup.value?.id) {
                name = organisationStore.customerGroups[key].group_name;
                break;
            }
        }

        return name
    })

    function resetSelectedGroup() {
        selectedGroupFields = {...customerGroupDefaults};
        selectedCustomers.value = null;
        // selectedGroupFields.name.value = selectedGroup.value.group_name;
        // selectedGroupFields.description.value = selectedGroup.value.description;
        inEditMode.value = false;
        showConfirmDelete.value = false;
        editGroupCustomers.value = false;
    }


    // Edit a customer group
    const inEditMode = ref(false);

    function handleEditGroupClick() {
        selectedGroupFields = {...customerGroupDefaults};
        selectedGroupFields.name.value = selectedGroup.value.group_name;
        selectedGroupFields.description.value = selectedGroup.value.description;
        inEditMode.value = !inEditMode.value;
        showConfirmDelete.value = false;
    }

    async function handleEditCustomerGroup(groupID) {
        snackbar.add({
            type: 'success',
            text: 'Customer group updated'
        });
        await organisationStore.getCustomerGroupsList();

        const newData = organisationStore.customerGroups.find((element => element.id == groupID));

        selectedGroup.value.group_name = newData.group_name;
        selectedGroup.value.description = newData.description;
        inEditMode.value = false;
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

    async function deleteGroup() {
        showConfirmDelete.value = false;
        const response = await useAsyncData(() => organisationStore.deleteCustomerGroup({id: selectedGroup.value.id}));
        console.log('delte response', response);


        if (response.error?.value) {
            snackbar.add({
                type: 'error',
                text: 'There was a problem deleting the customer group. Please try again later.'
            })

            return;
        }

        selectedGroup.value = null;

        snackbar.add({
            type: 'success',
            text: 'Customer group deleted'
        })
    }

    const editGroupCustomers = ref(false);

    // Modify a customer groups customers
    const selectedCustomers = ref('initial');

    async function toggleEditGroupCustomersVisibility() {
        editGroupCustomers.value = !editGroupCustomers.value;
    }

    async function handleSelectedCustomersUpdate(data) {
        selectedCustomers.value = data;
    };

    async function handleEditCustomerGroupCustomers() {
        let data = {
            user_ids: []
        };

        selectedCustomers.value?.forEach(customer => {
            data.user_ids.push(customer.id);
        })

        let response = await organisationStore.updateCustomerGroupCustomers({id: selectedGroup.value.id, data});

        if (response) {
            snackbar.add({
                type: 'success',
                text: 'Customer group customers updated'
            });

            selectedGroup.value.customers = selectedCustomers.value;
            editGroupCustomers.value = false;
        }
    }
</script>

<style lang="scss">
    @import url("~/assets/scss/components/_data-tables.scss");
    @import url("~/assets/scss/components/_user-listing.scss");

    .create-customer-group {
        textarea {
            min-height: 4rem;
        }
    }

    .customer-groups {
        @include breakpoint(med) {
            display: flex;
            justify-content: space-between;
            gap: var(--space-med);
        }

        textarea {
            min-height: 5rem;
        }
    }

    .customer-group-listing {
        max-width: 500px;

        tr {
            cursor: pointer;
        }
    }

    .customer-group {
        flex: 1;

        .card__footer {
            small {
                letter-spacing: var(--letter-spacing-sm);
                opacity: 0.7;
            };
        }
    }

    .section__header {
        margin-bottom: var(--space);
    }

    .bh-table-responsive.bh-table-responsive {
        th {
            vertical-align: bottom;
        }
    }

    .td-group-name {
        @include breakpoint(med) {
            min-width: 160px;
        }
    }

    .th-group-actions {
        cursor: default;
        opacity: 0;
        pointer-events: none;
    }

    .customer-groups--group-selected {
        .th-description,
        .td-description {
            @include breakpoint(med) {
                display: none;
            }
        }
    }

    .section__header {
        display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space-sm);
    }

    .section__header-title {
        margin-right: auto;
    }

    .selected-customers {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0 0 var(--space-med);
        padding: 0;

        li {
            display: inline;
            font-size: var(--p-sm);
            line-height: var(--line-height-sm);
            margin: 0;
            padding: 0;

            &:last-child,
            &:first-child {
                &::after {
                    content: none;
                }
            }

            &::after {
                content: ', ';
                display: inline-flex;
            }
        }
    }


    // .clickable-list {
    //     list-style: none;
    //     margin: 0;
    //     padding: 0 0 var(--space);

    //     small {
    //         display: block;
    //         font-size: var(--sm);
    //         font-weight: normal;
    //         opacity: 0.8;
    //         text-transform: lowercase;

    //         &::first-letter {
    //             text-transform: capitalize;
    //         }
    //     }

    //     a {
    //         border: 0 none;
    //         display: block;
    //         font-size: inherit;
    //         text-decoration: none;
    //     }
    // }

    // .clickable-list__item {
    //     border-style: solid;
    //     border-color: var(--c-border-light);
    //     border-width: var(--border-width) 0;
    //     cursor: pointer;
    //     display: grid;
    //         gap: var(--space);
    //         grid-template-columns: 1fr auto max-content;
    //         align-items: center;
    //     font-size: var(--p-sm);
    //     height: 100%;
    //     line-height: var(--line-height-sm);
    //     margin: 0;
    //     padding: var(--space-sm) 0;

    //     #{$hover} {
    //     color:  hsla(var(--c-accent-hsl), 0.8);
    // }

    // &.active {
    //     color: var(--c-accent);
    // }

    //     h6 {
    //         line-height: inherit;
    //         margin: 0;
    //         padding: 0;
    //     }

    //     p {
    //         line-height: inherit;
    //         margin: 0;
    //         padding: 0;
    //     }

    //     a {
    //         line-height: inherit;
    //     }
    // }
</style>