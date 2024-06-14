<template>
    <svg class="icon" :class="svgClass" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="13.5" height="7.5" viewBox="5.3 8.3 13.5 7.5" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Go'">
        <path :fill="svgColor ? svgColor : 'currentColor'" d="m11.5 15.5-6-6c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l5.5 5.5 5.5-5.5c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-6 6c-.1.1-.3.2-.5.2-.4 0-.6 0-.7-.2z"/>
    </svg>
</template>

<script setup>
    const props = defineProps({
        svgClass: {
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