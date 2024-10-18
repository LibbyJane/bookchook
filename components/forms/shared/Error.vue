<template>
    <p class="error" :class="cssClass" v-if="message">
        <AlertIcon css-class="icon--sm" />
        <div class="error__message">
            {{ message }}
            <slot name="message"></slot>
        </div>
    </p>
</template>

<script setup>
    import AlertIcon from '@/components/icons/alert.vue';

    const props = defineProps({
        message: {
            type: String,
        },
        cssClass: ""
    });
</script>

<style lang="scss">
    .error {
        // background: var(--c-danger-light);
        color: var(--c-danger);
        display: flex;
            gap: var(--space-xs);
            align-items: baseline;
        font-size: var(--p-sm);
        line-height: var(--line-height-sm);

        .icon {
            transform: translateY(1px);
        }
    }

    input {
        +.error {
            transform: translateY(calc(var(--space-sm) * -1));
        }
    }

    .error__message {
        &::first-letter {
            text-transform: uppercase;
        }
    }
</style>
