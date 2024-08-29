<template>
    <div v-if="data" class="selectable-list">
        <vue3-datatable
            :rows="data"
            :columns="cols"
            :sortable="true"
            :columnFilter="true"
            :pageSizeOptions="[50, 100]"
            :showPageSize="data.length > 49"
            :pagination="data.length > 49"
            :stickyHeader="true"
            height="50vh"
            noDataContent="No matches found."
            :loader="true"
            skin="bh-table-hover"
            :hasCheckbox="true"
            :selectRowOnClick="true"
            v-on:rowSelect="handleRowSelect"
            v-on:filterChange="handleFilterChange"
            v-on:sortChange="reselectUsers"
            ref="table"
        >
        </vue3-datatable>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUpdated, computed, watch, nextTick } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        initialSelection: {
            type: Array,
            required: false
        },
        callback: {
            type: Function
        }
    });

    const cols = ref([
        { field: "first_name", title: "First Name" },
        { field: "last_name", title: "Last Name" },
        { field: "email_address", title: "Email" }
    ]);

    const table = ref(null);
    const selectedUsers = ref(null);

    let lastActiontype = ref(null);
    let filtersApplied = false;


    async function handleFilterChange(filters) {
        lastActiontype.value = 'filter';
        filtersApplied = filters.some((element) => element.value?.length);
    }

    async function handleRowSelect(data) {
        if (lastActiontype.value == 'filter') {

            const visibleRows = table.value.getFilteredRows();
                visibleRows.forEach((row, index) => {
                    selectedUsers.value.forEach(user => {
                        if (user.id == row.id) {
                            table.value.selectRow(index);
                        }
                    });
                });

        } else if (filtersApplied) {
            const visibleRows = table.value.getFilteredRows();

            visibleRows.forEach((row, index) => {
                const rowIsSelected = table.value.isRowSelected(index);
                const alreadyInSelectedUsersArray =  selectedUsers.value.findIndex(element => element.id == row.id) < 0 ? false : true;

                if (rowIsSelected && !alreadyInSelectedUsersArray) {
                    // console.log('selected a new user, add to selected users' );
                    selectedUsers.value.push(row);
                }

                if (!rowIsSelected && alreadyInSelectedUsersArray) {
                    // console.log('deselected a user, remove');

                    let indexToRemove = selectedUsers.value.findIndex((user) => user.id == row.id);
                    selectedUsers.value.splice(indexToRemove, 1);
                }
            });
        }

        else {
            selectedUsers.value = data;
        }

        lastActiontype.value = 'select';
        props.callback(selectedUsers.value);
    }

    async function reselectUsers() {
        if (selectedUsers.value) {
            const rows = table.value.getFilteredRows();

            rows.forEach((row, index) => {
                if (selectedUsers.value.find(element => element.id == row.id)) {
                    table.value.selectRow(index);
                }
            });
        }
    }

    onMounted(() => {
        cols.value.forEach(col => {
            col.condition = "start_with";
        })

        if (props.initialSelection) {
            const rows = table.value.getFilteredRows();

            props.initialSelection.forEach(user => {
                table.value.selectRow(rows.findIndex(element => element.id == user.id));
            });
        }
        props.callback(props.initialSelection ? props.initialSelection : []); // initialises the  selected customers display in the parent component
    });
</script>

<style lang="scss">
    @import url("~/assets/scss/components/_data-tables.scss");
    @import url("~/assets/scss/components/_user-listing.scss");

    .selectable-list {
        --sb-track-color: var(--c-background);
        --sb-thumb-color: var(--c-input-bg);

        .bh-table-responsive {
            tr {
                cursor: pointer;
            }

            td, th {
                display: none;

                @container (min-width: 700px) {
                    display: table-cell;
                }

                &:nth-child(1),
                &:nth-child(2) {
                    display: table-cell;
                }

                &:nth-child(3) {
                    @container (min-width: 600px) {
                        display: table-cell;
                    }
                }
            }
        }
    }
</style>