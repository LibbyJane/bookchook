<template>
    <svg class="icon" :class="svgClass" width="19.5" height="15.5" viewBox="2.3 4.3 19.5 15.5" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Toggle Menu'">
        <path class="menutoggle-line-1" d="M3 5.7c-.4 0-.7-.3-.7-.7 0-.4.3-.8.7-.8h18c.4 0 .8.3.8.8 0 .4-.3.7-.8.7H3z" />
        <path class="menutoggle-line-2" d="M3 12.8c-.4 0-.7-.3-.7-.7 0-.4.3-.8.7-.8h18c.4 0 .8.3.8.8 0 .4-.3.7-.8.7H3z"/>
        <path class="menutoggle-line-3" d="M3 19.8c-.4 0-.7-.3-.7-.8 0-.4.3-.8.7-.8h18c.4 0 .8.3.8.8 0 .4-.3.8-.8.8H3z"/>
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