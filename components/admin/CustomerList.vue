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
    const rowClickData = ref([]);
    let selectedUsersBackup = null;

    let lastActiontype = ref(null);

    watch(rowClickData, async (newVal, oldVal) => {
        if (lastActiontype.value == 'filter' || lastActiontype.value == 'watch') {
            selectedUsersBackup = selectedUsers.value;
            lastActiontype.value = 'watch';
            return;
        }

        if (!selectedUsers.value) {
            selectedUsers.value = [];
        }

        let changeType;

        if (newVal?.length) {
            newVal.forEach(user => {
                if (!changeType && !selectedUsers.value.includes(user)) {
                    changeType = 'addition'
                    selectedUsers.value = Array.from(new Set( [...selectedUsers?.value, ...newVal]) );
                    return;
                }
            });

            if (changeType != 'addition') {
                if (oldVal?.length) {
                    oldVal.forEach(user => {
                        if (!newVal.includes(user)) {
                            let indexToRemove = selectedUsers.value.findIndex((element) => element == user);
                            selectedUsers.value.splice(indexToRemove, 1);
                            return;
                        }
                    });
                }
            }
        } else {
            selectedUsers.value = null;
        }

        await nextTick();
        props.callback(selectedUsers.value);
    });

    async function handleFilterChange(_filters) {
        lastActiontype.value = 'filter';

        selectedUsersBackup = selectedUsers.value;
        rowClickData.value = selectedUsersBackup;
        await nextTick();
        reselectUsers();
    }

    async function handleRowSelect(data) {
        if (lastActiontype.value == 'watch') {
            rowClickData.value = selectedUsersBackup;
        } else {
            rowClickData.value = data;
        }

        lastActiontype.value = 'select';
    }

    async function reselectUsers() {
        if (selectedUsers.value) {
            const rows = table.value.getFilteredRows();

            rows.forEach((row, index) => {
                if (selectedUsers.value.find(element => element == row)) {
                    table.value.selectRow(index);
                }
            });
        }

        rowClickData.value = selectedUsers.value;
    }

    onMounted(() => {
        cols.value.forEach(col => {
            col.condition = "start_with";
        })

        if (props.initialSelection) {
            const rows = table.value.getFilteredRows();

            props.initialSelection.forEach(user => {
                table.value.selectRow(rows.findIndex(element => element.id == user.id));
            })

            props.callback(props.initialSelection); // initialises the  selected customers display
        }
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