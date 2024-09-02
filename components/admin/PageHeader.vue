<template>
    <header class="admin-header">
        <h1 v-if="title" :class="titleCssClass">{{ title}}</h1>

        <slot name="actions"></slot>
    </header>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String
        },
        titleCssClass:  {
            type: String
        },
    });
</script>

<style lang="scss">
    .admin-header {
        display: flex;
            gap: var(--space-med);
            justify-content: space-between;
            align-items: center;
        margin: 0 0 var(--space);

        h1 {
            margin-right: auto;
        }
    }
</style>