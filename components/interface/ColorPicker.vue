
<template>
    <!-- <h1>Color picker {{ value }} {{ cpModel }}</h1> -->
    <Vue3ColorPicker v-if="cpModel" v-model="cpModel" :mode="mode" type="RGB" :colorListCount="colorListCount" :showAlpha="showAlpha" :showColorList="showColorList" :showEyeDrop="showEyeDrop" :theme="theme" />

</template>

<script setup>
    import { ref, reactive, computed, onMounted, onBeforeMount, onUpdated, watch } from 'vue';
    import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
    import '@cyhnkckali/vue3-color-picker/dist/style.css'
    import { TinyColor } from '@ctrl/tinycolor';

    const props = defineProps({
        id: {

        },
        value: {
        },
        mode: {
            default: "solid"
        },
        colorListCount: 7,
        showAlpha: {
            default: false
        },
        showColorList: {
            default: false
        },
        showEyeDrop: {
            default: false
        },
        theme: {
            default: "light"
        },
        callback: {

        }
    });

    let cpModel = '';

    const init = function() {
        console.log('init function');
        if (props.value) {
            // color picker doesn't accept HSL as an input, convert to RGB
            cpModel = new TinyColor(props.value).toRgbString();
        }
    }

    onBeforeMount( () => init() );
    onUpdated( () => init() );

    // watch(cpModel.value, async (newVal, oldVal) => {
    //     console.log('change', newVal, oldVal);
    //     console.log('hsl?', new TinyColor(newVal).toHsl());
    //     props.callback(props.id, new TinyColor(newVal).toHsl());
    // })

</script>

<style lang="scss">
    .ck-cp-container {
        &.ck-cp-container {
            --padding: 0;
            --cp-container-bg: transparent;
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
    }

</style>