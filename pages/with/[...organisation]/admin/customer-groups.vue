<template>
    <Header title="Customer Groups">
        <template #actions>
            <button type="button" class="btn btn--secondary" v-on:click="showAddGroup = !showAddGroup">
                <Plus />
                Create Group
            </button>
        </template>
    </Header>

    <Card v-if="showAddGroup" cssClass="create-customer-group">
        <template #body>
            <GenericForm id="createCG" :fields="fields" :endpoint="organisationStore.createCustomerGroup" :callback="handleCreateGroupUpdate" />
        </template>
    </Card>

    <section class="customer-groups">
        <!-- <div v-if="showTable" class="customer-group-listing"> -->

        <div class="customer-group-listing">
            <vue3-datatable
                v-if="organisationStore.customerGroups"
                :rows="organisationStore.customerGroups"
                :columns="cols"
                :sortable="true"
                :key="organisationStore.customerGroups.length"
                :totalRows="organisationStore.customerGroups.length"
                sortColumn="created_dtm"
                sortDirection="desc"
                :columnFilter="false"
                :pageSizeOptions="[20, 50, 100]"
                :showPageSize="organisationStore.customerGroups.length > 20"
                :pagination="organisationStore.customerGroups.length > 20"
                noDataContent="You don’t have any customer groups to display."
                :loader="true"
                skin="bh-table-hover"
                v-on:rowClick="handleRowClick"
            >
                <template #group_name="data">
                    <strong>{{ data.value.group_name }}</strong>
                </template>
    <!--
                <template #created_dtm="data">
                    {{ formatDtmShort(data.value.created_dtm, `en-${organisationStore.account.country_code.toLowerCase()}`) }}
                </template> -->

                <template #actions="data">
                    <ArrowRightCircle />
                </template>
            </vue3-datatable>
        </div>

        <Card v-if="selectedGroup" :cssClass="`customer-group sticky`" :title="getGroupName">
            <template #actions>
                <button type="button" class="btn btn--sm" v-on:click="handleEditGroupClick()" title="Edit Customer Group">
                    <EditPencil />
                    <span class="visually-hidden">edit</span>
                </button>
                <button type="button" class="btn btn--sm btn--tertiary btn--danger" v-on:click="handleShowConfirmDeleteClick()" title="Delete Customer Group">
                    <Trash />
                    <span class="visually-hidden">delete</span>
                </button>
            </template>

            <template #body>
                <Dialog v-if="showConfirmDelete" cssClass="danger" :callback="handleDialogChange">
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

                <GenericForm v-if="inEditMode" :id="selectedGroup.id" :fields="selectedGroupFields" :endpoint="organisationStore.updateCustomerGroup" :callback="handleUpdateCustomerGroup" :showReset="false" />

                <section class="customer-group--customers">
                    <header class="section__header">
                        <h4 class="section__header-title">Customers</h4>
                        <button type="button" class="btn btn--sm btn--secondary" v-on:click="editGroupCustomers = !editGroupCustomers" title="Add customers to customer group">
                            <EditPencil v-if="!editGroupCustomers" />
                            <Xmark v-if="editGroupCustomers" />
                            Add or Remove Customers
                        </button>
                        <!-- <button v-if="selectedGroup.customers" type="button" class="btn btn--secondary btn--sm" v-on:click="editGroupCustomers = 'remove'" title="Remove customers from customer group">
                            <Minus /> Remove customers
                        </button> -->
                    </header>

                    <CustomerList v-if="editGroupCustomers" :data="organisationStore.customers"/>

                </section>

            </template>

            <template #footer>
                <p class="small">
                    <small>
                        Group created {{ formatDtmShort(selectedGroup.created_dtm, `en-${organisationStore.account.country_code.toLowerCase()}`) }}
                    </small>
                </p>
            </template>
        </Card>
    </section>
</template>


<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { formatDtmShort } from '@/utils/dates';
    import { useOrganisationStore } from '@/stores/organisation';
    import { Trash, Xmark, EditPencil, ArrowRightCircle, Plus, Minus } from '@iconoir/vue';

    import Header from '@/components/admin/Header.vue';
    import GenericForm from '@/components/forms/GenericForm.vue';
    import Card from '@/components/interface/Card.vue';
    import Dialog from '@/components/interface/Dialog.vue';
    import CustomerList from '@/components/admin/CustomerList.vue';

    const router = useRouter();

    const selectedGroup = ref(null);
    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getCustomerGroupsList());
    organisationStore.getOrganisationCustomers();

    const showAddGroup = ref(false);
    const inEditMode = ref(false);
    const editGroupCustomers = ref(false);
    const showAddCustomers = ref(false);

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
    let selectedGroupFields;

    // hide: true

    const cols = ref([
        { field: "group_name", title: "Name", cellClass: "td-group-name" },
        { field: "description", title: "Description" },
        { field: "created_dtm", title: "Created", hide: true},
        { field: 'actions', title: "", headerClass: "th-group-actions" }
    ]);

    const showConfirmDelete = ref(false);
    const showTable = ref(false);

    function handleDialogChange(change) {
        if (change == 'closed') showConfirmDelete.value = false;
    }

    async function handleRowClick(group) {
        // await router.push({
        //     query: {
        //         id: group.group_name
        //     },
        // });
        selectedGroup.value = group;
        showConfirmDelete.value = false;
        inEditMode.value = false;
    }

    function handleShowConfirmDeleteClick() {
        showConfirmDelete.value = !showConfirmDelete.value;
        inEditMode.value = false;
    }

    function handleEditGroupClick() {
        selectedGroupFields = {...customerGroupDefaults};
        selectedGroupFields.name.value = selectedGroup.value.group_name;
        selectedGroupFields.description.value = selectedGroup.value.description;
        inEditMode.value = !inEditMode.value;
        showConfirmDelete.value = false;
    }

    const snackbar = useSnackbar();

    async function handleCreateGroupUpdate(data) {
        // showTable.value = false;
        console.log('data?', data);
        organisationStore.getCustomerGroupsList();

        if (data) {
            snackbar.add({
                type: 'success',
                text: 'Customer group updated'
            })
        }

        // showTable.value = true;
    }

    async function deleteGroup() {
        showConfirmDelete.value = false;
        const response = await useAsyncData(() => organisationStore.deleteCustomerGroup({id: selectedGroup.value.id}))
        console.log('response', response);
        organisationStore.getCustomerGroupsList();

        selectedGroup.value = null;

        snackbar.add({
            type: 'success',
            text: 'Customer group deleted'
        })
    }

    async function handleUpdateCustomerGroup(data) {
        snackbar.add({
            type: 'success',
            text: 'Customer group updated'
        })
        // selectedGroupFields.name.value = selectedGroup.value.group_name;
        // selectedGroupFields.description.value = selectedGroup.value.description;


        // selectedGroupFields.name.value = fields.value.group_name;
        // selectedGroupFields.description.value = fields.value.description;


        organisationStore.getCustomerGroupsList();
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
        display: flex;
        justify-content: space-between;
        gap: var(--space-med);

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

    .bh-table-responsive.bh-table-responsive {
        th {
            vertical-align: bottom;

            .bh-checkbox {
                margin-bottom: var(--space-xs);
            }
        }
    }

    .td-group-name {
        @include breakpoint(med) {
            min-width: 160px;
        }
    }

    .th-group-actions {
        background-color: orange;
        cursor: default;
        opacity: 0;
        pointer-events: none;
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


    .clickable-list {
        list-style: none;
        margin: 0;
        padding: 0 0 var(--space);

        small {
            display: block;
            font-size: var(--sm);
            font-weight: normal;
            opacity: 0.8;
            text-transform: lowercase;

            &::first-letter {
                text-transform: capitalize;
            }
        }

        a {
            border: 0 none;
            display: block;
            font-size: inherit;
            text-decoration: none;
        }
    }

    .clickable-list__item {
        border-style: solid;
        border-color: var(--c-border-light);
        border-width: var(--border-width) 0;
        cursor: pointer;
        display: grid;
            gap: var(--space);
            grid-template-columns: 1fr auto max-content;
            align-items: center;
        font-size: var(--p-sm);
        height: 100%;
        line-height: var(--line-height-sm);
        margin: 0;
        padding: var(--space-sm) 0;

        #{$hover} {
        color:  hsla(var(--c-accent-hsl), 0.8);
    }

    &.active {
        color: var(--c-accent);
    }

        h6 {
            line-height: inherit;
            margin: 0;
            padding: 0;
        }

        p {
            line-height: inherit;
            margin: 0;
            padding: 0;
        }

        a {
            line-height: inherit;
        }
    }

//     /*   Open state of the dialog  */
// dialog[open] {
//   opacity: 1;
//   transform: scaleY(1);
//   outline:20px solid red
// }

// /*   Closed state of the dialog   */
// dialog {
//   opacity: 0.5;
//   transform: scaleY(0.5);
//   transition:
//     opacity 0.7s ease-out,
//     transform 0.7s ease-out,
//     overlay 0.7s ease-out allow-discrete,
//     display 0.7s ease-out allow-discrete;
//     outline:20px solid lime;

//   /* Equivalent to
//   transition: all 0.7s allow-discrete; */
// }

// /*   Before-open state  */
// /* Needs to be after the previous dialog[open] rule to take effect,
//     as the specificity is the same */
// @starting-style {
//   dialog[open] {
//     opacity: 0;
//     transform: scaleY(0);
//   }
// }

// /* Transition the :backdrop when the dialog modal is promoted to the top layer */
// dialog::backdrop {
//   background-color: rgb(0 0 0 / 0%);
//   transition:
//     display 0.7s allow-discrete,
//     overlay 0.7s allow-discrete,
//     background-color 0.7s;
//   /* Equivalent to
//   transition: all 0.7s allow-discrete; */
// }

// dialog[open]::backdrop {
//   background-color: rgb(0 0 0 / 25%);
// }

// /* This starting-style rule cannot be nested inside the above selector
// because the nesting selector cannot represent pseudo-elements. */

// @starting-style {
//   dialog[open]::backdrop {
//     background-color: rgb(0 0 0 / 0%);
//   }
// }

</style>