<template>
    <svg class="icon" :class="cssClass" width="20px" height="20px" viewBox="2 2 20 20" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'User icon'">
        <path d="M14.8,21.9l-5.9-2l-5.1,1.7c-0.1,0-0.3,0.1-0.4,0.1l0,0c-0.7,0-1.4-0.6-1.4-1.4l0,0L2,5.3c0-0.6,0.4-1.1,0.9-1.3l0,0L8.7,2 c0.1,0,0.2,0,0.2,0l0,0C9,2,9.1,2,9.2,2l0,0l5.9,2l5.1-1.7c0.2-0.1,0.3-0.1,0.5-0.1l0,0c0.7,0,1.4,0.6,1.4,1.4l0,0l0,15.1 c0,0.6-0.4,1.1-0.9,1.3l0,0L15.3,22c-0.1,0-0.2,0-0.3,0l0,0C15,22,14.9,22,14.8,21.9L14.8,21.9z M14.3,20.2V5.4L9.7,3.8v14.8 L14.3,20.2L14.3,20.2z M15.8,20.2l4.6-1.5l0-14.8l-4.6,1.5V20.2L15.8,20.2z M3.5,20.2l4.6-1.5V3.8L3.5,5.4V20.2L3.5,20.2z"/>
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