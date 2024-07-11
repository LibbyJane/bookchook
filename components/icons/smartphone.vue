<template>
    <svg class="icon" :class="cssClass" width="12" height="18" viewBox="0 0 12 18" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'User icon'">
        <path d="M5.3,13.9c-0.4-0.4-0.4-1-0.1-1.4l0,0l0,0c0.4-0.4,1-0.4,1.4-0.1l0,0c0.4,0.4,0.4,1,0.1,1.4l0,0l0,0 C6.5,14,6.3,14.1,6,14.1l0,0C5.8,14.1,5.5,14,5.3,13.9L5.3,13.9z"/>
        <path d="M1.4,18C0.6,18,0,17.4,0,16.6l0,0V1.4C0,0.6,0.6,0,1.4,0l0,0h9.2C11.4,0,12,0.6,12,1.4l0,0v15.2c0,0.8-0.6,1.4-1.4,1.4 l0,0L1.4,18L1.4,18z M10.4,16.5V1.5H1.6v14.9L10.4,16.5L10.4,16.5z"/>
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