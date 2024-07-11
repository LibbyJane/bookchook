<template>
    <svg class="icon" :class="cssClass" width="14px" height="14px" viewBox="0 0 14 14" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Eye icon'">
        <path d="M6.2,13.2V7.8H0.8C0.3,7.8,0,7.4,0,7l0,0c0-0.4,0.3-0.8,0.8-0.8l0,0h5.4V0.8C6.2,0.3,6.6,0,7,0l0,0c0.4,0,0.8,0.3,0.8,0.8 l0,0v5.4h5.4C13.7,6.2,14,6.6,14,7l0,0c0,0.4-0.3,0.8-0.8,0.8l0,0H7.8v5.4C7.8,13.7,7.4,14,7,14l0,0C6.6,14,6.2,13.7,6.2,13.2 L6.2,13.2z"/>
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
