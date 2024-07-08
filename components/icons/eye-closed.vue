<template>
    <svg class="icon" :class="cssClass" width="17px" height="10px" viewBox="3.5 6.2 17 10" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Eye closed icon'">
        <path d="M18,10.4c1-0.8,1.8-1.9,2.4-3.1c0.2-0.4,0-0.8-0.4-1c-0.4-0.2-0.8,0-1,0.4c-1.4,3-4.2,4.4-7,4.4c-2.8,0-5.6-1.5-7-4.4 c-0.2-0.4-0.6-0.5-1-0.4c-0.4,0.2-0.6,0.6-0.4,1C4.2,8.6,5,9.6,6,10.4l-2.3,3.1c-0.3,0.3-0.2,0.8,0.2,1c0.1,0.1,0.3,0.1,0.5,0.1 c0.2,0,0.5-0.1,0.6-0.3l2.3-3.1c1.2,0.7,2.6,1.1,4,1.2v2.9c0,0.4,0.3,0.8,0.8,0.8c0.4,0,0.8-0.3,0.8-0.8v-2.9c1.4-0.1,2.8-0.5,4-1.2 l2.3,3.1c0.2,0.2,0.4,0.3,0.6,0.3c0.2,0,0.3,0,0.5-0.1c0.3-0.2,0.4-0.7,0.2-1L18,10.4z"/>
    </svg>
</template>

<script setup>
    const props = defineProps({
        cssClass: {
            type: String,
        },
        svgColor: {
            type: String,
        },
        svgAlt: {
            type: String,
        }
    });
</script>