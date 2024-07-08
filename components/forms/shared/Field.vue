<template>
    <div class="field-wrapper">
        <Label :labelFor="id" :text="labelText" :required="required" />
        <Help v-if="help" :message="help" />
        <slot />
        <Error v-if="error" :message="error" />
    </div>
</template>

<script setup>
    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Help from '@/components/forms/shared/Help.vue';

    const props = defineProps({
        id: {
            type: String
        },
        labelText: {
            type: String
        },
        required: {
            type: [String, Boolean],
            default: false
        },
        error: {
            type: String
        },
        help: {
            type: String
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

    .field-wrapper {
        // &:has(~:valid, +.help+ :valid, +div :valid) {
        &:has(:valid) {
            .field-status__icon--valid {
                aspect-ratio: 1 / 1;
                background-color: var(--c-success-light);
                border-radius: 50%;
                color: var(--c-success-dark);
                display: block;
                outline: 2px solid var(--c-success-light);
            }

            .required__indicator,
            .field-status__icon--invalid {
                display: none;
            }
        }

        // &:has(:invalid) {
        //     .field-status__icon--invalid {
        //         color: var(--c-danger-dark);
        //         opacity: 1;
        //     }

        //     .required__indicator,
        //     .field-status__icon--valid {
        //         opacity: 0;
        //     }
        // }

        &:has(:placeholder-shown) {
            .required__indicator {
                display: block;
            }

            .field-status__icon {
                display: none;
            }
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
        grid-area: indicator;
        display: none;
    }
</style>