<template>
    <svg class="icon" :class="cssClass" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="14px" height="14px" viewBox="5.3 5 14 14" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Go'">
        <path d="M12,18.8c-0.3-0.3-0.3-0.8,0-1.1l0,0l4.7-4.9H6c-0.4,0-0.7-0.3-0.7-0.8l0,0c0-0.4,0.3-0.8,0.7-0.8l0,0h10.7L12,6.3
		c-0.3-0.3-0.3-0.8,0-1.1l0,0c0.3-0.3,0.8-0.3,1.1,0l0,0l6,6.2c0.1,0.2,0.2,0.4,0.2,0.5l0,0c0,0.2-0.1,0.4-0.2,0.6l0,0l-6,6.2
		c-0.1,0.2-0.3,0.2-0.5,0.2l0,0C12.3,19,12.1,18.9,12,18.8L12,18.8z"/>
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