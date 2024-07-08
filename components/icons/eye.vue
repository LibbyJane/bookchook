<template>
    <svg class="icon" :class="cssClass" width="17px" height="10px" viewBox="3.5 6.2 17 10" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Eye icon'">
        <path d="M3.4,12.9c-0.4-0.2-0.6-0.6-0.4-1l0,0c1.7-3.6,5.1-5.4,8.4-5.4l0,0c3.4,0,6.8,1.8,8.4,5.4l0,0c0.2,0.4,0,0.8-0.4,1l0,0 c-0.4,0.2-0.8,0-1-0.4l0,0c-1.4-3-4.2-4.5-7-4.5l0,0c-2.8,0-5.6,1.5-7,4.5l0,0C4.3,12.8,4.1,13,3.8,13l0,0C3.7,13,3.6,12.9,3.4,12.9 L3.4,12.9z"/>
        <path d="M11.5,10.9c-1.6,0-2.8,1.2-2.8,2.8c0,1.5,1.3,2.8,2.8,2.8s2.8-1.2,2.8-2.8C14.3,12.2,13.1,10.9,11.5,10.9z M11.5,15 c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C12.8,14.4,12.2,15,11.5,15z"/>
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