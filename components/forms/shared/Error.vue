<template>
    <p class="error">
        <AlertIcon css-class="icon--sm" />
        {{ message }}
    </p>
</template>

<script setup>
    import AlertIcon from '@/components/icons/alert.vue';

    const props = defineProps({
        message: {
            type: String,
        },
    });
</script>

<style lang="scss">
    .error {
        // background: var(--c-danger-light);
        color: var(--c-danger);
        display: flex;
            gap: var(--space-xs);
            align-items: center;
        font-size: var(--p-sm);
    }

    input {
        +.error {
            transform: translateY(calc(var(--space-sm) * -1));
        }
    }
</style>
