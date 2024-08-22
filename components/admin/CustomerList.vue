<template>
    <div v-if="data" class="selectable-list">
        <!-- <pre>table filtered? {{ tableIsFiltered }}</pre> -->
        <!-- <pre>filtered rows {{ (table?.getFilteredRows())?.length }}</pre>
        <pre>selected users {{  selectedUsers }}</pre>
        <pre>rowClickData {{ rowClickData }}</pre> -->
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
            v-on:sortChange="reselectUsers"
            v-on:rowSelect="handleRowClick"
            ref="table"
        >
        </vue3-datatable>
        <!-- v-on:rowSelect="$emit('selectedCustomersChange', $event)"
        v-on:selectedCustomersChange="handleRowClick" -->
    </div>
</template>

<script setup>
    import { ref, onMounted, onUpdated, computed, watch } from 'vue';
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

    watch(rowClickData, (newVal, oldVal) => {
        console.log('watching', newVal, oldVal);
        console.log('compare?', newVal.length, oldVal.length);
        if (newVal.length > oldVal.length ) {
            if (!selectedUsers.value) {
                selectedUsers.value = [];
            }
            console.log('newval is longer, add new user', Array.from(new Set( [...selectedUsers.value, ...newVal]) ));
            // add new user
            selectedUsers.value = Array.from(new Set( [...selectedUsers?.value, ...newVal]) );
        } else {
            console.log('newval is shorter, remove user');
            oldVal.forEach(user => {
                console.log('checking', user);
                console.log('was ')
                if (!newVal.includes(user)) {
                    let indexToRemove = selectedUsers.value.findIndex((element) => element == user);
                    console.log('indexToremove', indexToRemove);
                    selectedUsers.value.splice(indexToRemove, 1);
                    return;
                }
            });
        }


        selectedUsers.value = selectedUsers.value.sort((a, b) => {
            const lastnameA = a.last_name.toUpperCase();
            const lastnameB = b.last_name.toUpperCase();

            if (lastnameA < lastnameB) { return -1; }
            if (lastnameA > lastnameB) { return 1; }
            if (lastnameA == lastnameB) {
                const firstnameA = a.first_name.toUpperCase();
                const firstnameB = b.first_name.toUpperCase();

                if (firstnameA < firstnameB) { return -1; }
                if (firstnameA > firstnameB) { return 1; }
                return 0;
            }
        });
    })

    // const tableIsFiltered = ref(table?.value?.getColumnFilters());


    onMounted(() => {
        // preselect customers

        //     tableIsFiltered.value = computed( () => {
        //     console.log('table filtered?', table?.value.getColumnFilters());
        //     return  table?.value?.getColumnFilters();
        // })
    });



    function handleRowClick(data) {
        rowClickData.value = data;
        // console.log('row click', data, typeof data);
        // console.log('selectedUsers.value', selectedUsers.value, typeof selectedUsers.value);

        // if (!selectedUsers.value) {
        //     selectedUsers.value = [];
        // }

        // data.forEach((row, index) => {
        //     if (selectedUsers.value.find((user, i) => user == row)) {
        //          console.log('already selected', row)
        //     } else {
        //         console.log('new selected', row);
        //     }
        // });

        // if (data) {
        //     selectedUsers.value = Array.from(new Set( [...selectedUsers.value, ...data]) );
        // } else {
        // }




        // if (data) {
        //     selectedUsers.value = [...selectedUsers.value];
        // }

        // selectedUsers.value = table.value.getSelectedRows();
        // console.log('selectedUsers.value', selectedUsers.value, typeof selectedUsers.value);


    }

    function reselectUsers() {
        if (selectedUsers.value) {
            const rows = table.value.getFilteredRows();

            rows.forEach((row, index) => {
                if (selectedUsers.value.find(element => element == row)) {
                    table.value.selectRow(index);
                }
            });
        }
    }
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