<template>
    <section class="table-card">
        <vue3-datatable
            :rows="rows"
            :columns="columns"
            :noDataContent="noDataContent"
            :sortable="sortable"
            :sortDirection="sortDirection"
            :columnFilter="columnFilter"
            :pageSize="pageSize"
            :pageSizeOptions="pageSizeOptions"
            :showPageSize="showPageSize != null ?  showPageSize : rows.length > pageSize"
            :pagination="pagination != null ?  pagination : rows.length > pageSize"
            :loader="loader"
            :skin="skin"
            v-on:rowClick="showCard"

        >

        </vue3-datatable>
        <!-- <div ref="selectedItemElem" aria-hidden="true"></div>
        <Card v-if="selectedTableRow" :id="selectedTableRow.id" :cssClass="`payment-option sticky card--header-bk`" :title="selectedTableRow.name"></Card> -->
    </section>
</template>


<script setup>
    import { ref } from 'vue';
    import { Plus, EditPencil, Xmark, Trash, ArrowRightCircle} from '@iconoir/vue';
    import Header from '@/components/admin/PageHeader.vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import Card from '@/components/interface/Card.vue';
    import { useOrganisationStore } from '@/stores/organisation';

    // :rows="organisationStore.purchaseTypes.memberships"
    //         :columns="cols"
    //         :sortable="true"
    //         :key="organisationStore.purchaseTypes.memberships?.length"
    //         :totalRows="organisationStore.purchaseTypes.memberships?.length"
    //         sortDirection="desc"
    //         :columnFilter="false"
    //         pageSize="20"
    //         :pageSizeOptions="[20, 50, 100]"
    //         :showPageSize="organisationStore.purchaseTypes.memberships?.length > 20"
    //         :pagination="organisationStore.purchaseTypes.memberships?.length > 20"
    //         noDataContent="You don’t have any memberships to display."
    //         :loader="true"
    const props = defineProps({
        rows: {
            required: true
        },
        columns: {
            required: true
        },
        key: {},
        totalRows: {},
        sortDirection: {
            default: "desc"
        },
        columnFilter: {
            default: false
        },
        pageSize: {
            default: 20
        },
        pageSizeOptions: {
            default: [20, 50, 100]
        },
        showPageSize: {},
        sortable: {
            default: false
        },
        pagination: {},
        noDataContent: {
            default: "You don’t have any data to display."
        },
        loader: {
            default: true
        },
        skin: {
            default: "bh-table-hover"
        },
        slots: {}
    });


    const organisationStore = useOrganisationStore();
    const inEditMode = ref(null);
    const showAddMembershipOption = ref(null);
    const selectedTableRow = ref(null);
    const selectedItemElem = ref(null);
    const snackbar = useSnackbar();

    const route = useRoute();

    const cols = ref([
        { field: "name", title: "Name", cellClass: "td-name" },
        { field: "description", title: "Description", cellClass: "td-description", headerClass: "th-description" },
        { field: "price", title: "Price"},
        { field: 'actions', title: "", headerClass: "th-group-actions" }
    ]);


    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());

    function toggleAddMembershipOptionVisibility() {
       showAddMembershipOption.value = !showAddMembershipOption.value;
          // fields.name.value = "";
        // fields.description.value = "";
        // if (showAddMembershipOption.value) {
        //     resetSelectedMembership();
        //     return;
        // }
    }

    function handleAddMembershipOption() {
        console.log('do something');
        showAddMembershipOption.value = null;

        snackbar.add({
            type: 'success',
            text: 'Payment option added'
        });
    }

    async function handleRowClick(data) {
        console.log('row click', data);
        if (selectedTableRow.value?.id == data.id) {
            selectedTableRow.value = null;
            // history.pushState({}, null, route.path)
            return;
        }

        selectedTableRow.value = data;
        // resetselectedTableRow();

        // if (!selectedGroup.value?.customers) {
        //     const response = await organisationStore.getCustomerGroupCustomers({id: group.id});

        //     if (response.error) {
        //         snackbar.add({
        //             type: 'danger',
        //             text: 'Customers could not be loaded. Please try again later.'
        //         });
        //     }
        //     selectedTableRow.value.customers = await organisationStore.getCustomerGroupCustomers({id: group.id});
        // }

        // history.pushState({}, "", route.path + '#' + data.id);
        selectedItemElem.value.scrollIntoView();
    }
</script>

<style lang="scss">

</style>