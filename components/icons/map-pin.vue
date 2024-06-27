<template>
    <svg class="icon" :class="cssClass" width="18px" height="22.4px" viewBox="3 0.9 18 22.4" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'User icon'">
        <path d="M12,0.9c-5,0-9,4-9,9c0,2.7,2.2,5.8,4.3,8.4c2.1,2.6,4.2,4.5,4.2,4.5l0.5,0.5l0.5-0.5c0,0,2.1-2,4.2-4.5
	c2.1-2.6,4.2-5.7,4.3-8.4h0C21,5,17,0.9,12,0.9z M15.5,17.3c-1.4,1.7-2.8,3.1-3.5,3.9c-0.7-0.7-2.1-2.2-3.5-3.9
	c-2-2.4-4-5.5-3.9-7.4c0-4.1,3.3-7.5,7.5-7.5c4.1,0,7.4,3.3,7.5,7.5C19.5,11.8,17.6,14.9,15.5,17.3z M12,8.1c-1,0-1.8,0.8-1.8,1.8
	c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8C13.8,8.9,13,8.1,12,8.1z"/>
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
