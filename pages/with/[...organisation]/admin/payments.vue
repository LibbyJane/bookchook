<template>
    <Header title="Payment Options" />

    <template v-for="purchaseType, key in organisationStore.purchaseTypes" >
        <h2 class="capitalise">{{ key }}</h2>

        <Card
            v-for="pt in purchaseType"
            class="card card--pt"
            :class="{ 'editing': inEditMode == key }"
        >
            <template #header>
                <h4 class="card__header--heading">{{ pt.name }}</h4>
            </template>

            <template #body>
                <p>{{ pt.description }}</p>
                <p>{{ organisationStore.settings.billing.currency_symbol }}{{ pt.price }} for {{ pt.duration }} {{ (pt.duration_unit).toLowerCase() }}</p>
            </template>
        </Card>
    </template>
</template>

<script setup>
    import { ref } from 'vue';
    import { Plus, Xmark} from '@iconoir/vue';
    import Header from '@/components/admin/PageHeader.vue';
    import Card from '@/components/interface/Card.vue';
    import { useOrganisationStore } from '@/stores/organisation';

    const organisationStore = useOrganisationStore();
    const inEditMode = ref(null);

    await useAsyncData(() => organisationStore.getOrganisationMemberships());
    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());
</script>

<style lang="scss">
    .card--pt {
        p {
            margin-bottom: var(--space-sm);
        }
    }
</style>