<template>
    <svg class="icon" :class="cssClass" width="12" height="12" viewBox="6 6 12 12" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Toggle Menu'">
        <path d="M16.7,17.8L12,13.1l-4.7,4.7c-0.3,0.3-0.8,0.3-1.1,0l0,0c-0.3-0.3-0.3-0.8,0-1.1l0,0l4.7-4.7L6.2,7.3 C5.9,7,5.9,6.5,6.2,6.2l0,0c0.3-0.3,0.8-0.3,1.1,0l0,0l4.7,4.7l4.7-4.7c0.3-0.3,0.8-0.3,1.1,0l0,0c0.3,0.3,0.3,0.8,0,1.1l0,0 L13.1,12l4.7,4.7c0.3,0.3,0.3,0.8,0,1.1l0,0c-0.1,0.1-0.3,0.2-0.5,0.2l0,0C17.1,18,16.9,17.9,16.7,17.8L16.7,17.8z"/>
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
