<template>
    <section class="container">
        <h1>Event Detail</h1>
        <span>{{ eventID }}</span>
    </section>
</template>

<script setup>
    const props = defineProps({
        eventID: {
            type: String,
        }
    });
</script>

<style lang="scss">
</style>