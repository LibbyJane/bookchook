<template>
    <p class="help">
        <HelpIcon cssClass="icon--sm" />
        {{ message }}
        <slot />
    </p>
</template>

<script setup>
    import HelpIcon from '@/components/icons/question-mark-circle.vue'

    const props = defineProps({
        message: {
            type: String,
        },
    });
</script>

<style lang="scss">
    .help {
        // background: var(--c-danger-light);
        display: flex;
            gap: var(--space-sm);
            align-items: start;
        font-size: var(--p-sm);
        line-height: var(--line-height-sm);
        margin: 0;
        opacity: 0.85;
        padding: var(--space-xs) 0;
    }
</style>
