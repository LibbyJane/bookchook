<template>
    <div class="field-wrapper" :class="cssClass">
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
        cssClass: {},
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
        text-transform: capitalize; // for when object keys are used to generate label text, eg billing preferences
    }

    .field-wrapper {
        &:has(:valid) {
            .field-status__icon--valid {
                display: block;
            }

            .required__indicator,
            .field-status__icon--invalid {
                display: none;
            }
        }

        &:has(:placeholder-shown),
        .form-error & {
            .required__indicator {
                display: block;
            }

            .field-status__icon {
                display: none;
            }
        }
    }
</style>