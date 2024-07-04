<template>
    <svg class="icon" :class="cssClass" width="16px" height="12px" viewBox="4 6 16 12" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Tick'">
        <path d="M8.3,17.7l-4-4c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0l0,0L9,15.6l9.3-9.3c0.4-0.4,1-0.4,1.4,0l0,0 c0.4,0.4,0.4,1,0,1.4l0,0l-10,10C9.5,17.9,9.3,18,9,18l0,0C8.7,18,8.5,17.9,8.3,17.7L8.3,17.7z"/>
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
