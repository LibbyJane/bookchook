<template>
	<ColorPicker :color="color"  v-on:color-change="callback" :alpha-channel="alphaChannel" :default-format="defaultFormat" :visible-formats="['hex', 'hsl', 'rgb']" >
<!--
        <template #copy-button></template> -->

    </ColorPicker>
</template>

<script setup>
    import { ColorPicker } from 'vue-accessible-color-picker'

    const props = defineProps({
        color: {},
        callback: {
            type: Function
        },
        alphaChannel: {
            default: "hide"
        },
        defaultFormat: {
            default: "hex"
        }
    });
</script>

<style lang="scss">
    @import url('vue-accessible-color-picker/styles');

    .vacp-color-picker {
        --vacp-spacing: var(--space-xs);
        background-color: transparent;
        font-family: inherit;
        padding: 0;
    }

    .vacp-range-input-label-text--hue {
        display: none;
    }

    .vacp-copy-button,
    .vacp-format-switch-button {
        background: transparent;
        border: 0;
        flex-shrink: 0;
        justify-content: end;
        outline: none;
        opacity: 0.7;
        padding: 0;
        transition: all var(--transition-speed-fast) var(--transition-type-motionless);

        svg {
            transition: all var(--transition-speed-fast) var(--transition-type-motionless);
        }

        &:enabled {
            #{$hover} {
                background-color: transparent;
                border-color: transparent;
                // color: var(--c-accent);
                outline-color: transparent;
                opacity: 1;

                svg {
                    transform: scale(1.1);
                }
            }
        }
    }

    .vacp-color-input-label {
        align-items: center;
        color: hsla(var(--c-text-hsl), 0.85);
    }

    .vacp-color-input {
        background-color: var(--c-input-bg);
        // border: 0;
        border-width: 2px;
        border-color: hsla(var(--c-text-hsl), 0.25);
        color: var(--c-text);
    }
</style>
