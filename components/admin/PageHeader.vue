<template>
    <header class="admin-header" :class="cssClass">
        <component v-if="title" :is="elemType" class="m-bottom-0" :class="titleCssClass" >{{ title}}</component>

        <slot name="actions"></slot>
    </header>
</template>

<script setup>
    const props = defineProps({
        elemType: {
            default: "h1"
        },
        cssClass: {
            type: String,
            default: "margin-bottom"
        },
        title: {
            type: String
        },
        titleCssClass:  {
            type: String,
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