<template>
    <svg class="icon" :class="cssClass" width="10px" height="16px" viewBox="0 0 10 16" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Bold formatting icon'">
        <path d="M1.4,16C0.6,16,0,15.4,0,14.6l0,0l0-7V1.4C0,0.6,0.6,0,1.4,0l0,0H5c0.1,0,1,0,2.1,0.5l0,0C8.2,1,9.3,2.2,9.3,4.2l0,0 c0,1.6-0.7,2.7-1.6,3.3l0,0C8.9,8.1,10,9.4,10,11.4l0,0c0,2.2-1.3,3.5-2.6,4l0,0C6.2,16,5.1,16,5,16l0,0H1.4L1.4,16z M5,14.5 c0,0,0.2,0,0.5,0l0,0c0.3-0.1,0.8-0.2,1.2-0.4l0,0c0.9-0.4,1.6-1,1.6-2.6l0,0c0-1.2-0.5-1.8-1-2.2l0,0C6.8,8.8,6.1,8.6,5.5,8.5l0,0 C5.2,8.4,5,8.4,5,8.4l0,0H1.6l0,6H5L5,14.5z M5,6.9c0,0,0.1,0,0.4,0l0,0c0.3,0,0.6-0.1,1-0.3l0,0c0.7-0.4,1.3-0.9,1.3-2.3l0,0 c0-2.1-1.4-2.4-2.3-2.6l0,0c-0.3,0-0.4,0-0.4,0l0,0l-3.4,0l0,5.3H5L5,6.9z M5,8.4L5,8.4L5,8.4L5,8.4z"/>
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