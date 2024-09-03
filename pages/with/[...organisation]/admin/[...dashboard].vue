<template>
    <Header title="Welcome!"></Header>
    <Combined />

    <Revenue />
    <Attendance />
</template>

<script setup>
    import Combined from '@/components/admin/charts/Combined.vue';

    import Header from '@/components/admin/PageHeader.vue';
    import Attendance from '@/components/admin/charts/Attendance.vue';
    import Revenue from '@/components/admin/charts/Revenue.vue';

</script>