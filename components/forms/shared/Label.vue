<template>
    <label class="field-label" :class="cssClass" :for="labelFor">
        {{ text }}

        <span v-if="showValidationStatus" class="field-status">
            <abbr class="required__indicator" v-if="required" title="Required field" alt="required field">*</abbr>
            <CheckIcon css-class="field-status__icon field-status__icon--valid icon--xs" />
            <CrossIcon css-class="field-status__icon field-status__icon--invalid icon--xs" />
        </span>
    </label>
</template>

<script setup>
    import CheckIcon from '@/components/icons/check.vue';
    import CrossIcon from '@/components/icons/cross.vue';

    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        cssClass: {
            type: String
        },
        labelFor: {
            type: String
        },
        required: {
            type: [String, Boolean],
            default: false
        },
        showValidationStatus: {
            default: true
        }
    });
</script>

<style lang="scss">
    .field-label {
        color: var(--c-text);
        font-size: var(--p);
        font-weight: 600;
        display: flex;
            gap: var(--space-xxs);
        margin: 0 0 var(--space-xxs) 0;
        padding: 0;

        + .help {
            padding-top: 0;
        }
    }

    .field-status {
        display: grid;
            grid-template-areas: "indicator";
            align-items: center;
            justify-content: center;
    }

    .required__indicator {
        grid-area: indicator;
        color: var(--c-accent);
        text-decoration: none;
    }

    .field-status__icon {
        aspect-ratio: 1 / 1;
        grid-area: indicator;
        display: none;
    }

    .field-status__icon--valid {
        color: var(--c-success);
    }
</style>