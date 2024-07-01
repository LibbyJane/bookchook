<template>
    <label :for="for">{{ text }}<abbr v-if="required" title="Required field">*</abbr></label>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        for: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        }
    });
</script>

<style lang="scss">
    label {
        font-size: var(--h6);
        font-weight: 400;
        display: block;
        //margin: 0 0 var(--space-sm) 0;
        margin: 0;

        abbr {
            text-decoration: none;
            color: var(--c-accent);
        }
    }
</style>