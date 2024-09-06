<template>
    <Header title="Account"></Header>

    <Card
        title="Colour Scheme"
        titleCssClass="h4"
        elemType="section"
    >
        <template #actions>
            <button type="button" class="btn btn--sm btn--tertiary" v-on:click="inEditMode == 'colors' ? inEditMode = '' : inEditMode = 'colors'">
                <template v-if="inEditMode != 'colors'">
                    <PencilIcon css-class="icon--xs" />
                    Edit
                </template>
                <template v-if="inEditMode == 'colors'">
                    <CrossIcon css-class="icon--xs" />
                    Cancel
                </template>
            </button>
        </template>
        <template #body>
            <dl v-if="inEditMode != 'colors'" class="settings-list" v-on:click="inEditMode = 'colors'">
                <div v-for="setting, key in organisationStore.account.theme_config.colors" class="settings-list__item swatch">
                    <dd class="swatch__color" :style="`background-color: hsl(${setting.hsl.hsl});`"></dd>
                    <dt class="swatch__label" style="text-transform: capitalize;">{{ getLabelText(key) }}</dt>
                </div>
            </dl>

            <ThemeSettings v-if="inEditMode == 'colors'" :callback="handleSettingsUpdated" />
        </template>
    </Card>

    <Card
        title="Billing"
        titleCssClass="h4"
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
            <dl v-if="inEditMode != 'billing'" class="settings-list" v-on:click="inEditMode = 'billing'">
                <div class="settings-list__item" v-for="setting, key in organisationStore.settings.billing">
                    <dt style="text-transform: capitalize;">{{ getLabelText(key) }}</dt>
                    <dd>{{ setting }}</dd>
                </div>
            </dl>

            <BillingSettings v-if="inEditMode == 'billing'" :callback="handleSettingsUpdated"  />
        </template>
    </Card>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation';
    import Header from '@/components/admin/PageHeader.vue';
    import Card from '@/components/interface/Card.vue';
    import ThemeSettings from '@/components/forms/ThemeSettings.vue';
    import BillingSettings from '@/components/forms/BillingSettings.vue';
    import PencilIcon from '@/components/icons/pencil.vue';
    import CrossIcon from '@/components/icons/cross.vue';


    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationBillingSettings());

    const inEditMode = ref('account');
    const snackbar = useSnackbar();

    function handleSettingsUpdated(section) {
        if (inEditMode.value == section ) {
            inEditMode.value = '';
        }

        snackbar.add({
            type: 'success',
            text: `${section} settings updated`
        });
    }


    function getLabelText(key) {
        let transformedText = key.replaceAll('_', ' ');

        if (key == "tax_rate") {
            transformedText += ' (%)';
        }

        return `${transformedText}`;
    };
</script>

<style lang="scss">
    @import "@/assets/scss/components/swatches";

    .settings-list {
        font-size: var(--p);
        list-style: none;
        margin: 0 0 var(--space);
        padding: 0;
        display: grid;
            // grid-template-columns: repeat(4, max-content 1fr);
            // grid-template-rows: repeat(auto-fill, 120px);
            gap: var(--space);
            grid-template-columns: repeat(auto-fill, minmax(15ch, 25ch));

        dt,
        dd {
            font-size: inherit;
        }

        dt {
            font-weight: 600;
            // text-align: end;
        }

        .swatch {
            font-size: var(--p-sm);
        }
    }



</style>