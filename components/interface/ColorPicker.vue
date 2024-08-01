<template>
        <Vue3ColorPicker :type="type" v-model="value" :mode="mode" :showColorList="showColorList" :showEyeDrop="showEyeDrop" :showAlpha="showAlpha"/>
</template>

<script setup>
    import { ref } from 'vue';
    import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
    import '@cyhnkckali/vue3-color-picker/dist/style.css'

   const value = ref(null);

    const props = defineProps({
        mode: {
            default: "solid"
        },
        showColorList: {
            default: false
        },
        showAlpha: {
            default: false
        },
        showEyeDrop: {
            default: false
        },
        type: {
            default: "RGB"
        }
    });


    function rgb2hue(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let c   = max - min;
        let hue;
        let segment;
        let shift;

        if (c == 0) {
            hue = 0;
        } else {
            switch(max) {
            case r:
                segment = (g - b) / c;
                shift = 0 / 60;       // R° / (360° / hex sides)
                if (segment < 0) {          // hue > 180, full rotation
                    shift = 360 / 60;         // R° / (360° / hex sides)
                }
                hue = segment + shift;
                break;
            case g:
                segment = (b - r) / c;
                shift = 120 / 60;     // G° / (360° / hex sides)
                hue = segment + shift;
                break;
            case b:
                segment = (r - g) / c;
                shift = 240 / 60;     // B° / (360° / hex sides)
                hue = segment + shift;
                break;
            }
        }
        return hue * 60; // hue is in [0,6], scale it up
    }
</script>

<style lang="scss">
    .ck-cp-container {
        --padding: 0;
        // box-shadow: var(--box-shadow-elevate);
        box-shadow: none;
        padding-top: 0;
    }

    .ck-cp-menu {
        display: none;
    }

    .cp-picker-wrap {
        margin: 0;
        padding: 0;
    }

    .ck-cp-input-container {
        font-family: var(--font-body);
        margin-inline: 0;
    }

    .ck-cp-input-content,
    .ck-cp-input-label {
        font-family: var(--font-body);
    }
</style>