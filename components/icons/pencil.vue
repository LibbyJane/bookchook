<template>
    <svg class="icon" :class="cssClass" width="20px" height="20px" viewBox="0 0 20 20" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Pencil icon'">
        <path d="M0.8,20c-0.2,0-0.4-0.1-0.6-0.2l0,0C0.1,19.6,0,19.4,0,19.2l0,0v-4.7c0-0.5,0.2-0.9,0.5-1.3l0,0l10-10l2.9-2.9 c0.3-0.3,0.8-0.3,1.1,0l0,0l5.2,5.2C19.9,5.5,20,5.7,20,5.9l0,0c0,0.2-0.1,0.4-0.2,0.6l0,0l-2.9,3c0,0,0,0,0,0l0,0l-10,10 C6.5,19.8,6,20,5.5,20l0,0H0.8L0.8,20z M1.6,14.3c0,0-0.1,0.1-0.1,0.2l0,0v3.9h3.9c0.1,0,0.1,0,0.2-0.1l0,0l9.5-9.5l-4.1-4.1 L1.6,14.3L1.6,14.3z M16.3,7.8l1.8-1.8l-4.1-4.1l-1.8,1.8L16.3,7.8L16.3,7.8z"/>
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