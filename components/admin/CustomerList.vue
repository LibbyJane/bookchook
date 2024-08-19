<template>
    <div v-if="data" class="">
        <vue3-datatable
            :rows="data"
            :columns="cols"
            :sortable="true"
            :columnFilter="true"
            :pageSizeOptions="[20, 50, 100]"
            :showPageSize="data.length > 20"
            :pagination="data.length > 20"
            noDataContent="No matches found."
            :loader="true"
            skin="bh-table-hover"
            :hasCheckbox="true"
            v-on:rowClick="handleRowClick"
        >
            <!-- <template #email_address="data">
                <a :href="`mailto:${data.value.email_address}`" class="text-primary hover:underline">{{ data.value.email_address }}</a>
            </template> -->
        </vue3-datatable>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from "@bhplugin/vue3-datatable";
    import { useOrganisationStore } from '@/stores/organisation';
    import { formatDtmLong } from '@/utils/dates';
    import EnvelopeIcon from '@/components/icons/envelope.vue';
    import PhoneIcon from '@/components/icons/smartphone.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const cols = ref([
        { field: "first_name", title: "First Name" },
        { field: "last_name", title: "Last Name" }
        ]);

    function handleRowClick(user) {
        console.log('row click', user);
        // selectedUser.value = user;
    }
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