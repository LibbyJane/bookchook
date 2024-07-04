<template>
    <label :for="labelFor">
        {{ text }}

        <span class="field-status">
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
        labelFor: {
            type: String
        },
        required: {
            type: [String, Boolean],
            default: false
        }
    });
</script>

<style lang="scss">
    label {
        font-size: var(--p-sm);
        font-weight: 500;
        display: flex;
            gap: var(--space-xxs);
        //margin: 0 0 var(--space-sm) 0;
        margin: 0;
        padding: 0;
    }

    //     &:has(~:valid) {
    //         outline: 3px solid lime;
    //     }

    //     // &:has(~:valid, +.help+ :valid, +div :valid) {
    //     &:has(~:valid) {
    //         outline: 3px solid lime;
    //         .field-status__icon--valid {
    //             color: var(--c-success-dark);
    //             opacity: 1;
    //         }

    //         .required__indicator,
    //         .field-status__icon--invalid {
    //             opacity: 0;
    //         }
    //     }

    //     // &:has(+:invalid, +.help+ :invalid, +div :invalid) {
    //     &:has(~:invalid) {
    //         border: 3px solid red;
    //         .field-status__icon--invalid {
    //             color: var(--c-error-dark);
    //             opacity: 1;
    //         }

    //         .required__indicator,
    //         .field-status__icon--valid {
    //             opacity: 0;
    //         }
    //     }

    //     &:has(~:empty) {
    //         .required__indicator {
    //             opacity: 1;
    //         }

    //         .field-status__icon {
    //             opacity: 0;
    //         }
    //     }
    // }

    // input:empty {
    //     outline:2px solid pink;
    // }

    // .field-status {
    //     display: grid;
    //         grid-template-areas: "indicator";
    //         align-items: center;
    //         justify-content: center;
    // }

    // .required__indicator {
    //     grid-area: indicator;
    //     color: var(--c-accent);
    //     text-decoration: none;
    // }

    // .field-status__icon {
    //     grid-area: indicator;
    //     opacity: 0;
    // }
</style>