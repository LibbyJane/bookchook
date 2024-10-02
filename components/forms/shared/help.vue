<template>
    <p class="help">
        <HelpCircle class="icon--sm" />
        {{ message }}
        <slot />
    </p>
</template>

<script setup>
    import { HelpCircle } from '@iconoir/vue';

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
            gap: var(--space-xs);
            align-items: center;
        font-size: var(--sm);
        line-height: var(--line-height-sm);
        margin: 0;
        opacity: 0.85;
        padding: var(--space-xs) 0;

        svg {
            opacity: 0.8;
        }
    }
</style>
