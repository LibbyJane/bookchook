<template>
    <details class="disclosure" :class="cssClass" :open="open">
        <summary>
            <span>{{ title}}</span>
        </summary>
        <div class="disclosure-content">
            <slot />
        </div>
    </details>
</template>

<script setup>
    const props = defineProps({
        cssClass: {
            type: String,
        },
        title: {
            type: String
        },
        open: {
            default: false
        }
    });
</script>

<style lang="scss">
    :root {
        --summary-icon-size: 1.5rem;
    }

    .disclosure {
        margin-bottom: var(--space);
    }

    summary {
        display: grid;
        grid-template-areas: "icon text";
            justify-content: start;
            align-items: center;
            grid-template-columns: var(--summary-icon-size) 1fr;
        font-size: var(--h5);
        font-weight: 600;
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;

        &::before {
            content: '▸';
            display: block;
            grid-area: icon;
            margin-left: calc(var(--space-xs) * -1);
            padding: var(--space-xs);
            transform-origin: center;
            transition: transform var(--transition-speed-fast) var(--transition-type-motionless);

            details[open] & {
                transform: rotate(90deg);
            }
        }

        span {
            grid-area: text;
        }
    }

    details {
        > div {
            padding-left: var(--summary-icon-size);
        }
    }
</style>
