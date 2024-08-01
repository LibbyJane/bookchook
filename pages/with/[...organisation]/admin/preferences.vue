<template>
    <Header title="Preferences"></Header>

    <Card
        title="Account"
        titleCssClass="h3"
        elemType="section"
    >
        <template #body>
            <dl v-if="inEditMode != 'theme'" class="settings-list" >
                <template v-for="setting, key in organisationStore.account.theme_config.colors">
                    <dt style="text-transform: capitalize;">{{ getLabelText(key) }}</dt>
                    <dd>{{ setting }}</dd>
                </template>
            </dl>

            <!-- <ThemeSettings  /> -->
        </template>
    </Card>

    <Card
        title="Billing"
        titleCssClass="h3"
        elemType="section"
    >
        <template #actions>
            <button type="button" class="btn btn--sm btn--tertiary" v-on:click="inEditMode == 'billing' ? inEditMode = '' : inEditMode = 'billing'">
                <template v-if="inEditMode != 'billing'">
                    <PencilIcon css-class="icon--xs" />
                    Edit
                </template>
                <template v-if="inEditMode == 'billing'">
                    <CrossIcon css-class="icon--xs" />
                    Cancel
                </template>
            </button>
        </template>
        <template #body>
            <pre>
                inEditMode: {{ inEditMode }}
                inEditMode != 'billing': {{ inEditMode != 'billing' }}
                {{ organisationStore.settings.billing }}
            </pre>
            <dl v-if="inEditMode != 'billing'" class="settings-list" >
                <template v-for="setting, key in organisationStore.settings.billing">
                    <dt style="text-transform: capitalize;">{{ getLabelText(key) }}</dt>
                    <dd>{{ setting }}</dd>
                </template>
            </dl>

            <BillingSettings v-if="inEditMode == 'billing'" />
        </template>
    </Card>
</template>

<script setup>
    import { ref } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/Header.vue';
    import Card from '@/components/interface/Card.vue';
    import ThemeSettings from '@/components/forms/ThemeSettings.vue';
    import BillingSettings from '@/components/forms/BillingSettings.vue';
    import PencilIcon from '@/components/icons/cross.vue';
    import CrossIcon from '@/components/icons/cross.vue';


    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());
    const inEditMode = ref('');


    function getLabelText(key) {
        let transformedText = key.replaceAll('_', ' ');

        if (key == "tax_rate") {
            transformedText += ' (%)';
        }

        return `${transformedText}:`;
    };
</script>

<style lang="scss">
    .settings-list {
        list-style: none;
        margin: 0 0 var(--space);
        padding: 0;
        display: grid;
            grid-template-columns: repeat(4, max-content 1fr);
            gap: var(--space-xs);

        dt {
            font-size: var(--p);
            font-weight: 600;
            text-align: end;
        }
    }



</style>