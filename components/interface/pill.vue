<template>
    <span class="pill" :class="cssClass">
        <slot />
    </span>
</template>

<script setup>
    const props = defineProps({
        cssClass: {
            type: String,
        },
        text: {
            type: String
        }
    });
</script>

<style lang="scss">
    .pill {
        background-color: var(--c-neutral-95);
        color: var(--c-neutral-30);
        display: flex;
            gap: var(--space-sm);
            justify-content: center;
        font-size: var(--xs);
        border-radius: 99em;
        line-height: 1;
        padding: var(--space-xxs) var(--space-sm);
        // text-transform: uppercase;

        &.success {
            background-color: var(--c-success-light);
            color: var(--c-success-dark);
        }

        &.info {
            background-color: var(--c-info-light);
            color: var(--c-info-dark);
        }
    }
</style>
