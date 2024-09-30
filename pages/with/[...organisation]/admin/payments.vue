<template>
    <Header title="Payment Methods" />

    <!-- <Location v-if="inEditMode == 'new'" /> -->

    <ul v-if="Object.keys(organisationStore.purchaseTypes).length" class="locations-list">
        <Card
            v-for="purchaseType, key in organisationStore.purchaseTypes"
            elemType="li"
            class="card"
            :class="{ 'editing': inEditMode == key }"
        >
            <template #header>
                <h3 class="card__header--heading">{{ key }}</h3>
            </template>
            <template #actions>
                <button type="button" class="btn btn--sm btn--tertiary" v-on:click="inEditMode == key ? inEditMode = null : inEditMode = key">
                    <template v-if="inEditMode == key">
                        <CrossIcon css-class="icon--xs" />
                        Cancel
                    </template>
                    <template v-if="inEditMode != key">
                        <PencilIcon css-class="icon--sm" />
                        Edit
                    </template>
                </button>
            </template>

            <template #body>
                <pre>{{ purchaseType }}</pre>
                <template v-for="pt in purchaseType">

                    <h3>{{ pt.name }}</h3>
                    <p>{{ pt.description }}</p>
                    <p>{{ organisationStore.settings.billing.currency_symbol }}{{ pt.price }} for {{ pt.duration }} {{ (pt.duration_unit).toLowerCase() }}</p>
                </template>

                <!-- <Location v-if="key == inEditMode" :id="key" v-on:click="inEditMode = key" />

                <template v-if="key != inEditMode">
                    <div class="location__info">
                        <address v-html="location.formatted_address"></address>

                        <h6 v-if="location.description">Description</h6>
                        <div v-if="location.description" v-html="location.description"></div>
                    </div>

                    <div class="location__map-wrapper">
                        <a v-if="location.url" :href="location.url" target="_blank">
                            <MapIcon />
                            {{ location.url}}
                        </a>
                        <div class="location__map">
                            <Map :latLong="location.latLong" />
                        </div>
                    </div>
                </template> -->
            </template>
        </Card>
    </ul>

</template>

<script setup>
    import { ref } from 'vue';

    import Header from '@/components/admin/PageHeader.vue';
    import Card from '@/components/interface/Card.vue';
    import PlusIcon from '@/components/icons/plus.vue';
    import PencilIcon from '@/components/icons/pencil.vue';
    import TrashIcon from '@/components/icons/trash.vue';
    import CrossIcon from '@/components/icons/cross.vue';
    import MapIcon from '@/components/icons/map.vue';

    import { useOrganisationStore } from '@/stores/organisation';
    import Location from '@/components/forms/Location.vue'

    const organisationStore = useOrganisationStore();
    const inEditMode = ref(null);

    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());
</script>

<style lang="scss">
    .card__header--heading {
        text-transform: capitalize;
    }
    // @import '@/assets/scss/admin/header';

    // .locations-list {
    //     display: flex;
    //         flex-direction: column;
    //         gap: var(--space-med);
    //     list-style: none;
    //     margin: 0;
    //     padding: 0;
    //     max-width: none;

    //     .card__body {
    //         @include breakpoint(med) {
    //             display: grid;
    //                 grid-template-columns: 1fr max-content;
    //                 gap: 0 var(--space-med);
    //             justify-content: space-between;
    //         }
    //     }

    //     p,
    //     address {
    //         font-size: inherit;
    //     }
    // }

    // .location__map-wrapper {
    //     word-break: break-all;
    //     margin-bottom: var(--space);
    //     min-width: 260px;
    //     max-width: 100%;

    //     @include breakpoint(lg) {
    //         width: 500px;
    //     }

    //     a {
    //         border: 0 none;
    //         display: flex;
    //         font-size: var(--sm);
    //         margin-bottom: var(--space);
    //         text-decoration: none;
    //     }
    // }
</style>