<template>
    <svg class="icon" :class="cssClass" width="20px" height="20px" viewBox="2 2 20 20" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'User icon'">
        <path d="M11.3,12.9V7.3c0-0.4,0.3-0.7,0.7-0.7l0,0c0.4,0,0.7,0.3,0.7,0.7l0,0v5.6c0,0.4-0.3,0.7-0.7,0.7l0,0
		C11.6,13.6,11.3,13.3,11.3,12.9L11.3,12.9z"/>
        <path d="M11.3,17.4c-0.4-0.4-0.4-1-0.1-1.4l0,0l0,0c0.4-0.4,1-0.4,1.4-0.1l0,0c0.4,0.4,0.4,1,0.1,1.4l0,0l0,0
		c-0.2,0.2-0.5,0.3-0.7,0.3l0,0C11.8,17.7,11.5,17.6,11.3,17.4L11.3,17.4z"/>
        <path d="M2,12C2,6.5,6.5,2,12,2l0,0c5.5,0,10,4.5,10,10l0,0c0,5.5-4.5,10-10,10l0,0v-0.7v-0.7c4.8,0,8.6-3.9,8.6-8.6l0,0
		c0-4.8-3.9-8.6-8.6-8.6l0,0c-4.8,0-8.6,3.9-8.6,8.6l0,0c0,4.8,3.9,8.6,8.6,8.6l0,0v0.7V22v0C6.5,22,2,17.5,2,12L2,12z"/>
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