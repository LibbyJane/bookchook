<template>
    <footer class="main-footer" :callOnce="customerStore.getCustomerData($route.path.replace('/with/', ''))">
        <div class="main-footer__block">
            <h6>{{ customerStore.customerData.name }}</h6>
            <address v-if="customerStore.customerData.address" v-html="customerStore.customerData.address"></address>
            <p v-if="customerStore.customerData.phone">
                <a :href="`tel:${customerStore.customerData.phone}`">
                    {{ customerStore.customerData.phone }}
                </a>
            </p>
            <p v-if="customerStore.customerData.email">
                <a :href="customerStore.customerData.email">
                    {{ customerStore.customerData.email }}
                </a>
            </p>

            <p v-if="customerStore.customerData.URL">
                <a :href="customerStore.customerData.URL">
                    {{ customerStore.customerData.URL }}
                </a>
            </p>
        </div>

        <div class="main-footer__copyright">
            <p>&copy; {{ siteStore.siteName }} {{ thisYear }}. All rights reserved.</p>
        </div>
    </footer>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import { useCustomerStore } from '@/stores/customer';
    import { useSiteStore } from '@/stores/site';
    const siteStore = useSiteStore();
    const customerStore = useCustomerStore();
    const thisYear = new Date().getFullYear();
</script>