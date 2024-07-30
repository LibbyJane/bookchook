<template>
    <component :is="elemType" class="card" :class="cssClass">
        <header class="card__header">
            <h2 v-if="title" class="card__header--heading" :class="titleCssClass">
                {{ title }}
            </h2>
            <slot name="header"></slot>

            <div class="card__header--actions">
                <slot name="actions"></slot>
            </div>
        </header>

        <div class="card__body">
            <slot name="body"></slot>
        </div>
    </component>
</template>

<script setup>
    const props = defineProps({
        elemType: {
            default: "div"
        },
        cssClass: {
            type: String,
        },
        title: {
            type: String
        },
        titleCssClass:  {
            type: String,
            default: "h3"
        },
    });
</script>

