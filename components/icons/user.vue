<template>
    <svg class="icon" :class="svgClass" width="15.5" height="17.5" viewBox="4.2 3.2 15.5 17.5" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'User icon'">
            <path d="M14.8 11.8c1.2-.9 1.9-2.2 1.9-3.8 0-2.6-2.1-4.7-4.7-4.7C9.4 3.2 7.3 5.4 7.3 8c0 1.6.8 2.9 1.9 3.8-2.9 1.1-4.9 3.9-4.9 7.2v1c0 .4.3.8.8.8.4 0 .7-.3.7-.8v-1c0-3.5 2.8-6.2 6.3-6.3 3.5 0 6.2 2.8 6.3 6.3v1c0 .4.3.8.7.8.4 0 .8-.3.8-.8v-1c-.2-3.3-2.2-6.1-5.1-7.2zM12 4.7c1.8 0 3.2 1.5 3.3 3.3 0 1.8-1.5 3.2-3.3 3.3-1.8 0-3.2-1.5-3.3-3.3.1-1.8 1.5-3.2 3.3-3.3z"/>
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