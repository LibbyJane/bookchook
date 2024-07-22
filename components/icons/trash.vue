<template>
    <svg class="icon" :class="cssClass" width="20px" height="22px" viewBox="0 0 20 22" :fill="svgColor ? svgColor : 'currentColor'" :alt="svgAlt ? svgAlt : 'Trash bin icon'">
        <path d="M19.2,4.1h-4.4V2.8c0-1.6-1.3-2.8-2.8-2.8H7.9C6.4,0,5.1,1.3,5.1,2.8v1.3H2.8H0.8C0.3,4.1,0,4.4,0,4.9 c0,0.4,0.3,0.8,0.8,0.8h1.3v13.6c0,1.6,1.3,2.8,2.8,2.8h10.3c1.6,0,2.8-1.3,2.8-2.8V5.6h1.3c0.4,0,0.8-0.3,0.8-0.8 C20,4.4,19.7,4.1,19.2,4.1z M6.7,2.8c0-0.7,0.6-1.3,1.3-1.3h4.1c0.7,0,1.3,0.6,1.3,1.3v1.3H6.7V2.8z M16.4,19.2 c0,0.7-0.6,1.3-1.3,1.3H4.9c-0.7,0-1.3-0.6-1.3-1.3V5.6h12.8V19.2z M7.9,16.9c0.4,0,0.8-0.3,0.8-0.8V10c0-0.4-0.3-0.8-0.8-0.8 S7.2,9.6,7.2,10v6.1C7.2,16.5,7.5,16.9,7.9,16.9z M12.1,16.9c0.4,0,0.8-0.3,0.8-0.8V10c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v6.1 C11.3,16.5,11.6,16.9,12.1,16.9z"/>
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
