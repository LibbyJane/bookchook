<template>
   <component :is="href ? 'a' : 'button'" class="button" :class="style" :href="href" :type="type">
        <span class="button-text">{{ text }}</span>
    </component>
</template>

<script setup>
    const props = defineProps({
        style: {
            type: String,
        },
        type: {
            default: 'button'
        },
        href: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
        }
    });
</script>