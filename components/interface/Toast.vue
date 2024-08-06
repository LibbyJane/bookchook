<template>
    <div v-if="text" class="toast" :class="cssClass">
        {{ text }}
        <slot />
    </div>
</template>

<script setup>
    const props = defineProps({
        cssClass: {
            type: String
        },
        text: {
            type: String
        },
        callback: {
            type: Function
        },
        durationInMS: {
            default: 30000
        }
    });

    if (props.callback) {
    setTimeout(() => {

            props.callback();
    }, props.durationInMS);

}

</script>

<style lang="scss">
    .toast {
        background-color: var(--c-background);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-elevate);
        display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-sm);
        font-size: var(--sm);
        padding: var(--space-xs) var(--space);
        margin: auto auto 0;
        position: fixed;
            bottom: var(--space);
            left: 0;
            right: 0;
        z-index: var(--zi-modal);
        width: max-content;
        max-width: calc(100vw - var(--content-padding)*2);

        &.success {
            background: var(--c-success-light);
            color: var(--c-success-dark);
            outline: 2px solid hsla(var(--c-success-hsl), 0.2);
        }
    }
</style>
