<template>
    <Header title="Team"></Header>

    <vue3-datatable
        v-if="organisationStore.users"
        :rows="organisationStore.users"
        :columns="cols"
        :sortable="true"
        :columnFilter="true"
    > </vue3-datatable>
    <!-- :pageSizeOptions="[20, 50, 100]"
        :showPageSize="organisationStore.users.length > 20"
        :pagination="organisationStore.users.length > 20"
        :sortable="true"
        :columnFilter="true" -->
    <div class="users">
        <div class="user-list">
            <ul v-if="organisationStore.users" class="clickable-list">
                <li v-for="user in organisationStore.users" role="button" class="clickable-list__item" :class="`${ user.id == selectedUser?.id ? 'active' : '' }`" v-on:click="selectedUser = user">
                    <h6>
                        {{ user.first_name }} {{ user.last_name }}
                        <small>{{ user.role_type }}</small>
                    </h6>
                    {{ user.email_address }}
                    <ArrowIcon />
                </li>
            </ul>

        <p v-if="!organisationStore.users">
            You don&rsquo;t have any users to display yet.
        </p>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/Header.vue';
    import ClientProfile from '@/components/admin/ClientProfile.vue';
    import ArrowIcon from '@/components/icons/arrow.vue';

    const selectedUser = ref(null);
    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationUsers());

    const cols = ref([
        { field: "first_name", title: "Name" },
        { field: "last_name", title: "Username" },
        { field: "email_address", title: "Email" },
        { field: "phone", title: "Phone" },
        { field: "timezone", title: "Timezone" },

            // { field: "date", title: "Date", type: "date" },
            // { field: "active", title: "Active", type: "bool" },
            // { field: "age", title: "Age", type: "number" },
            // { field: "address.city", title: "Address" },
            // { field: "company.name", title: "Company" },
        ]);


    onMounted(()=>{
        if (organisationStore.users.length === 1) {
            selectedUser.value = organisationStore.users[0];
        }
    })
</script>

<style lang="scss">

</style>
