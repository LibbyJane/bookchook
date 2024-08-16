<template>
    <details class="disclosure" :class="cssClass" :open="open">
        <summary :class="variant === 'button'? `btn btn--sm btn--tertiary` : null">
            <NavArrowRight />
            <div class="summary__text">
                <span v-if="title">{{ title}}</span>
                <slot name="summary"></slot>
            </div>

        </summary>
        <div class="disclosure-content">
            <slot />
        </div>
    </details>
</template>

<script setup>
    import { NavArrowRight } from '@iconoir/vue';

    const props = defineProps({
        cssClass: {
            type: String,
        },
        variant: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        open: {
            default: false
        }
    });
</script>

<style lang="scss">
    :root {
        --summary-icon-size: var(--icon-size-sm);
    }

    .disclosure {
        font-size: var(--p);
        margin-bottom: var(--space);

        &.btn {
            display: block;
        }
    }

    summary {
        display: grid;
        grid-template-areas: "icon text";
            justify-content: start;
            align-items: center;
            grid-template-columns: max-content 1fr;
        font-size: var(--h5);
        font-weight: 600;
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;
        text-align: start;
        width: 100%;

        &.btn {
            justify-content: start;

            ~ div {
                margin-top: var(--space);
            }
        }

        svg {
            display: block;
                grid-area: icon;
            max-height: var(--icon-size-sm);
            max-width: var(--icon-size-sm);

            transform-origin: center;
            transition: transform var(--transition-speed-fast) var(--transition-type-motionless);

            details[open] & {
                transform: rotate(90deg);
            }
        }
    }

    .summary__text {
        grid-area: text;
        line-height: var(--line-height-sm);
        white-space: normal;
    }

    details {
        > div {
            padding-inline: var(--icon-size-sm);
        }
    }
</style>
