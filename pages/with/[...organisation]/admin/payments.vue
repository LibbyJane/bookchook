<template>
    <Header title="Payment Options"></Header>

    <section class="payment-option">
        <Memberships />
    </section>

</template>

<script setup>
    import Header from '@/components/admin/PageHeader.vue';

    import Memberships from '@/components/admin/Memberships.vue';
</script>