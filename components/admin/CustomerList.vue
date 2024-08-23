<template>
    <div v-if="data" class="selectable-list">
        <!-- <pre>table filtered? {{ tableIsFiltered }}</pre> -->
        <!-- <pre>filtered rows {{ (table?.getFilteredRows())?.length }}</pre>
        <pre>selected users {{  selectedUsers }}</pre>
        <pre>rowClickData {{ rowClickData }}</pre>-->
        <!-- <pre>Backup: {{ selectedUsersBackup }}</pre> -->
        <pre>lastActiontype: {{ lastActiontype }}</pre>


        <ul v-if="selectedUsers?.length" class="selected-customers">
            <li>{{ selectedUsers.length }} {{ selectedUsers.length == 1 ? 'customer' : 'customers' }}: </li>
            <li v-for="user in selectedUsers">{{ user.first_name }} {{ user.last_name }}</li>
        </ul>
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
            v-on:rowClick="handleRowClick"
            v-on:filterChange="handleFilterChange"
            v-on:sortChange="reselectUsers"

            ref="table"
        >
        </vue3-datatable>
        <!--    v-on:rowSelect="handleRowClick" -->
        <!-- v-on:rowSelect="$emit('selectedCustomersChange', $event)"
        v-on:selectedCustomersChange="handleRowClick" -->
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
        // console.log('watch, last action type', lastActiontype.value);
        if (lastActiontype.value == 'filter' || lastActiontype.value == 'watch') {
            // console.log(`last action type is ${lastActiontype.value}, don't update selected users`);
            selectedUsersBackup = selectedUsers.value;
            lastActiontype.value = 'watch';
            return;
        }
        // console.groupEnd();
        // console.group();
        // console.log('watched row click', newVal, oldVal, lastActiontype.value);

        if (!selectedUsers.value) {
            // console.log('initialise selected users');
            selectedUsers.value = [];
        }

        // console.log('is this user already selected?', newVal);
        let changeType;

        if (newVal?.length) {
            // console.log('updated selected users');
            newVal.forEach(user => {
                if (!changeType && !selectedUsers.value.includes(user)) {
                    console.log ('add user');
                    changeType = 'addition'
                    selectedUsers.value = Array.from(new Set( [...selectedUsers?.value, ...newVal]) );
                    return;
                }
            });

            if (changeType != 'addition') {
                // console.log('remove user');
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
    });




    async function handleFilterChange(filters) {
        lastActiontype.value = 'filter';
        // console.log('filter change', filters);

        selectedUsersBackup = selectedUsers.value;
        rowClickData.value = selectedUsersBackup;
        await nextTick();
        reselectUsers();
    }

    async function handleRowSelect(data) {
        // console.log(`handle row select, ${lastActiontype.value}`, data);

        if (lastActiontype.value == 'watch') {
            rowClickData.value = selectedUsersBackup;
        } else {
            rowClickData.value = data;
        }

        lastActiontype.value = 'select';
    }


    async function handleRowClick(data) {
        // console.log('handle row click', data);
        rowClickData.value = data;
        lastActiontype.value = 'click';
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
        // todo: preselect customers

        cols.value.forEach(col => {
            col.condition = "start_with";
        })
    });
</script>

<style lang="scss">
    @import url("~/assets/scss/components/_data-tables.scss");
    @import url("~/assets/scss/components/_user-listing.scss");

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