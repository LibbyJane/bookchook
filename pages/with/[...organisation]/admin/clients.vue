<template>
    <Header title="Clients"></Header>

    <div class="clients">
        <div class="client-list">
            <ul v-if="organisationStore.clients" class="clickable-list">
                <li v-for="client in organisationStore.clients" role="button" class="clickable-list__item" :class="`${ client.id == selectedClient?.id ? 'active' : '' }`" v-on:click="selectedClient = client">
                    <h6>
                        {{ client.first_name }} {{ client.last_name }}
                        <small v-if="client.role_type.toLowerCase() == 'administrator'">{{ client.role_type }}</small>
                    </h6>
                    {{ client.email_address }}
                    <ArrowIcon />
                </li>
            </ul>

        <p v-if="!organisationStore.clients">
            You don&rsquo;t have any clients to display yet.
        </p>
        </div>
        <div class="client-profile sticky">
            <ClientProfile v-if="selectedClient" :data="selectedClient" />
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/Header.vue';
    import ClientProfile from '@/components/admin/ClientProfile.vue';
    import ArrowIcon from '@/components/icons/arrow.vue';

    const selectedClient = ref(null);
    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationClients());

    onMounted(()=>{
        if (organisationStore.clients.length === 1) {
            // if there's only one client, preselect them
            selectedClient.value = organisationStore.clients[0];
        }
    })
</script>

<style lang="scss">
    .clients {
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: auto;
        width: 100%;

        @include breakpoint(lg) {
            grid-template-areas: 'sidebar main-col';
            grid-template-columns: 1fr minmax(max-content, 46rem);
            gap: var(--space-xl);
        }
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

    &:hover,
    &:focus {
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
</style>
