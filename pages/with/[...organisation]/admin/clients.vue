<template>
    <Header title="Clients"></Header>

    <div class="user-listing" :style="`opacity: ${tableOpacity};`">
        <vue3-datatable
            v-if="organisationStore.clients"
            :rows="organisationStore.clients"
            :columns="cols"
            :sortable="true"
            :columnFilter="true"
            :pageSizeOptions="[20, 50, 100]"
            :showPageSize="organisationStore.clients.length > 20"
            :pagination="organisationStore.clients.length > 20"
            noDataContent="No matches found."
            :loader="true"
            skin="bh-table-hover"
            v-on:rowClick="handleRowClick"
        >
            <!-- <template #email_address="data">
                <a :href="`mailto:${data.value.email_address}`" class="text-primary hover:underline">{{ data.value.email_address }}</a>
            </template> -->
        </vue3-datatable>
        <!-- <ul v-if="organisationStore.clients" class="clickable-list">
            <li v-for="client in organisationStore.clients" role="button" class="clickable-list__item" :class="`${ client.id == selectedClient?.id ? 'active' : '' }`" v-on:click="selectedClient = client">
                <h6>
                    {{ client.first_name }} {{ client.last_name }}
                    <small v-if="client.role_type.toLowerCase() == 'administrator'">{{ client.role_type }}</small>
                </h6>
                {{ client.email_address }}
                <ArrowIcon />
            </li>
        </ul> -->
        <p v-if="!organisationStore.clients" class="user-listing_empty-message">
            You don&rsquo;t have any clients to display yet.
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
    import Header from '@/components/admin/Header.vue';
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
    await useAsyncData(() => organisationStore.getOrganisationClients());

    onMounted(()=>{
        tableOpacity.value = 1;
        if (organisationStore.clients.length === 1) {
            // if there's only one client, preselect them
            selectedUser.value = organisationStore.clients[0];
        }
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

    // .clients {
    //     display: grid;
    //     grid-template-columns: 1fr;
    //     margin-bottom: auto;
    //     width: 100%;

    //     @include breakpoint(lg) {
    //         grid-template-areas: 'sidebar main-col';
    //         grid-template-columns: 1fr minmax(max-content, 46rem);
    //         gap: var(--space-xl);
    //     }
    // }

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

    // &:hover,
    // &:focus {
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