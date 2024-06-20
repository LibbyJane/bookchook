<template>
    <svg class="icon" :class="svgClass" width="19.5" height="20.5" viewBox="2.2 1.2 19.5 20.5" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Calendar icon'">
        <path d="M5 21.7c-1.5 0-2.8-1.2-2.8-2.8v-9c0-.2.1-.4.2-.5.2-.1.4-.1.6-.1h18c.2 0 .4.1.5.2.1.1.2.3.2.5v9c0 1.5-1.2 2.8-2.8 2.8H5v-.1zM3.8 19c0 .7.6 1.2 1.2 1.3h14c.7 0 1.2-.6 1.3-1.3v-8.2H3.8V19zM3 10.8V10v.8zM14.2 6V4.8h-3.8c-.4 0-.7-.3-.7-.8 0-.4.3-.7.7-.7h3.8V2c0-.4.3-.8.8-.8.4 0 .7.3.7.8v4c0 .4-.3.7-.7.7-.4 0-.8-.3-.8-.7z"/>
        <path d="M2.2 10V6c0-1.5 1.2-2.8 2.8-2.8h2c.4 0 .8.3.8.8 0 .4-.3.8-.8.8H5c-.7 0-1.2.5-1.3 1.2v4c0 .4-.3.8-.8.8-.3 0-.7-.4-.7-.8z"/>
        <path d="M6.2 6V2c0-.4.3-.8.7-.8.4 0 .8.3.8.8v4c0 .4-.3.8-.8.8-.3 0-.7-.4-.7-.8zM20.3 10V6c0-.7-.6-1.2-1.3-1.2h-.5c-.4 0-.8-.3-.8-.7 0-.4.3-.8.8-.8h.5c1.5 0 2.7 1.2 2.8 2.8v4c0 .4-.3.7-.8.7-.4-.1-.7-.4-.7-.8z"/>
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