<template>
    <aside class="form__message">
        <p v-if="text">{{ text }}</p>
        <slot />
    </aside>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String
        },
        cssClass: {
            type: String
        }
    });
</script>

<style lang="scss">
    .form__message {
        background: var(--c-white);
        border-radius: var(--border-radius);
        margin: var(--space) 0 var(--space-med);
        padding: var(--content-padding-all);
    }
</style>