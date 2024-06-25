<template>
    <svg class="icon" :class="cssClass" width="32.4" height="20" viewBox="-4.2 1.5 32.4 20" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Ticket icon'">
        <path d="M19.7 19v-1.3H21V19h-1.3zM19.7 16.7v-1.3H21v1.3h-1.3zM19.7 14.5v-1.3H21v1.3h-1.3zM19.7 12.2v-1.3H21v1.3h-1.3zM19.7 9.9V8.7H21V10h-1.3zM19.7 7.7V6.4H21v1.3h-1.3zM19.7 5.4V4.1H21v1.3h-1.3z"/>
        <path d="M28.2 9.3V3.7c0-.6-.2-1.2-.6-1.6-.4-.4-1-.6-1.6-.6H-1.7c-.7 0-1.3.3-1.7.8-.5.4-.8 1-.8 1.7v15.3c0 .6.2 1.2.6 1.6.4.4 1 .6 1.6.6h28c.6 0 1.2-.2 1.6-.6.4-.4.6-1 .6-1.6v-5.8c0-.2-.1-.4-.2-.5l-1.5-1.8L28 9.8c.1-.1.2-.3.2-.5zm-1.6-.4-1.7 1.6c-.3.3-.3.8-.1 1.1l1.7 2.2v5.5c0 .3-.1.4-.1.5s-.2.1-.5.1h-28c-.3 0-.4-.1-.5-.1-.1-.1-.1-.2-.1-.5V4c0-.1.1-.4.3-.6s.4-.3.6-.3h27.7c.3 0 .4.1.5.1.1.1.1.2.1.5v5.2z"/>
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