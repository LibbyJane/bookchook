<template>
    <div class="snackbar" :class="cssClass">
        <slot />
    </div>
</template>

<script setup>
    const props = defineProps({
        cssClass: {
            type: String,
        },
        text: {
            type: String
        }
    });
</script>

<style lang="scss">

</style>
