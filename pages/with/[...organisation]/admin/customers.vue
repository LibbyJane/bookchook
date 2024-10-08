<template>
    <Header title="Customers"></Header>

    <div class="user-listing" :style="`opacity: ${tableOpacity};`">
        <vue3-datatable
            v-if="organisationStore.customers"
            :rows="organisationStore.customers"
            :columns="cols"
            :sortable="true"
            :columnFilter="true"
            :pageSizeOptions="[20, 50, 100]"
            :showPageSize="organisationStore.customers.length > 20"
            :pagination="organisationStore.customers.length > 20"
            noDataContent="No matches found."
            :loader="true"
            skin="bh-table-hover"
            v-on:rowClick="handleRowClick"
        >
            <!-- <template #email_address="data">
                <a :href="`mailto:${data.value.email_address}`" class="text-primary hover:underline">{{ data.value.email_address }}</a>
            </template> -->
        </vue3-datatable>
        <!-- <ul v-if="organisationStore.customers" class="clickable-list">
            <li v-for="client in organisationStore.customers" role="button" class="clickable-list__item" :class="`${ client.id == selectedClient?.id ? 'active' : '' }`" v-on:click="selectedClient = client">
                <h6>
                    {{ client.first_name }} {{ client.last_name }}
                    <small v-if="client.role_type.toLowerCase() == 'administrator'">{{ client.role_type }}</small>
                </h6>
                {{ client.email_address }}
                <ArrowIcon />
            </li>
        </ul> -->
        <p v-if="!organisationStore.customers" class="user-listing_empty-message">
            You don&rsquo;t have any customers to display yet.
        </p>

        <div class="user-listing__profile sticky">
            <UserProfile v-if="selectedUser" :data="selectedUser">
                <template #body>
                    <div class="user-profile__section user-profile__section--groups">
                        <h5>Groups</h5>
                        <p v-if="!selectedUser.groups">{{ selectedUser.first_name }} does not belong to any groups.</p>
                        <ul class="user-profile__group-list">
                            <li v-for="group in selectedUser.groups">
                                <a class="btn btn--sm btn--modify-duo" href="#" :title="`Go to ${group.name} settings`">{{ group.name }}</a>
                                <button class="btn btn--sm btn--modify-duo" :title="`Remove ${selectedUser.first_name} from ${group.name}?`">
                                    <span class="btn-action">
                                        <CrossIcon css-class="icon--xs" />
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="btn btn--sm btn--tertiary" :title="`Add ${selectedUser.first_name} to a group.`">
                                    <span class="btn-action">
                                        <PlusIcon css-class="icon--xs" />
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </template>

            </UserProfile>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/PageHeader.vue';
    import UserProfile from '@/components/admin/UserProfile.vue';
    import TicketIcon from '@/components/icons/ticket.vue';
    import PlusIcon from '@/components/icons/plus.vue';
    import CrossIcon from '@/components/icons/cross.vue';
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
    await useAsyncData(() => organisationStore.getOrganisationCustomers());

    onMounted(()=>{
        tableOpacity.value = 1;
        if (organisationStore.customers.length === 1) {
            // if there's only one client, preselect them
            selectedUser.value = organisationStore.customers[0];
        }

        cols.value.forEach(col => {
            col.condition = "start_with";
        });
    })
</script>

<style lang="scss">
    @import url("~/assets/scss/components/_data-tables.scss");
    @import url("~/assets/scss/components/_user-listing.scss");
    .user-listing .bh-table-responsive {
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
</style>