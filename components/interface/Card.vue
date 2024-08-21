<template>
    <component :is="elemType" class="card" :class="cssClass">
        <header class="card__header">
            <div class="card__header-title">
                <!-- <slot name="header-icon"></slot> -->
                <h2 v-if="title" class="card__header--heading" :class="titleCssClass">
                    {{ title }}
                </h2>
                <slot name="header"></slot>
            </div>

            <div class="card__header--actions">
                <slot name="actions"></slot>
            </div>
        </header>

        <div class="card__body">
            <slot name="body"></slot>
        </div>

        <footer class="card__footer">
            <slot name="footer"></slot>
        </footer>
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
        title: {},
        titleCssClass:  {
            type: String,
            default: "h3"
        },
    });
</script>

