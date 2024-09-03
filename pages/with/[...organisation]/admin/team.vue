<template>
    <Header title="Team"></Header>

    <div class="user-listing" :style="`opacity: ${tableOpacity};`">
        <vue3-datatable
            v-if="organisationStore.users"
            :rows="organisationStore.users"
            :columns="cols"
            :sortable="true"
            :columnFilter="true"
            :pageSizeOptions="[20, 50, 100]"
            :showPageSize="organisationStore.users.length > 20"
            :pagination="organisationStore.users.length > 20"
            noDataContent="No matches found."
            :loader="true"
            skin="bh-table-hover"
            v-on:rowClick="handleRowClick"
        >
            <!-- <template #email_address="data">
                <a :href="`mailto:${data.value.email_address}`" class="text-primary hover:underline">{{ data.value.email_address }}</a>
            </template> -->
        </vue3-datatable>

        <p v-if="!organisationStore.users" class="user-listing_empty-message">
            You don&rsquo;t have any users to display yet.
        </p>

        <div class="user-listing__profile sticky">
            <UserProfile v-if="selectedUser" :data="selectedUser" />
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/PageHeader.vue';
    import UserProfile from '@/components/admin/UserProfile.vue';

    const selectedUser = ref(null);
    const tableOpacity = ref(0);
    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationUsers());

    const cols = ref([
        { field: "first_name", title: "First Name" },
        { field: "last_name", title: "Last Name" },
        { field: "email_address", title: "Email" },
        { field: "phone", title: "Phone" },
        // { field: "timezone", title: "Timezone" },
        ]);

    function handleRowClick(user) {
        selectedUser.value = user;
    }

    onMounted(()=>{
        tableOpacity.value = 1;

        cols.value.forEach(col => {
            col.condition = "start_with";
        });
    })
</script>

<style lang="scss">
    @import url("~/assets/scss/components/_data-tables.scss");
    @import url("~/assets/scss/components/_user-listing.scss");
    .user-listing  {
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