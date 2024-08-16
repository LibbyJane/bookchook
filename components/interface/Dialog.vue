<template>

    <dialog :class="[`dialog dialog--${variant}`, cssClass]" ref="dialogRef" open>
        <header class="dialog__header" v-on:keyup="console.log('keyup', $event)">
            <slot name="header">
                <button autofocus type="button" v-on:click="closeDialog()">
                    <Xmark />
                    <span class="visually-hidden">Close dialog</span>
                </button>
            </slot>
        </header>

        <slot name="body"></slot>
    </dialog>
</template>

<script setup>
    import { ref } from 'vue';
    import { Xmark } from '@iconoir/vue';

    const dialogRef = ref(null);


    const props = defineProps({
        cssClass: {
            type: String,
        },
        callback: {},
        variant: {
            default: "inline"
        },
        open: {
            default: true
        }
    });

    function closeDialog() {
        dialogRef.value.close();
        props.callback('closed');
    }

//     showButton.addEventListener("click", () => {
//   dialog.showModal();
// });

// // "Close" button closes the dialog
// closeButton.addEventListener("click", () => {
//   dialog.close();
// });

</script>

<style lang="scss">
    .dialog--inline[open] {
        position: relative;
    }

    .dialog[open] {
        border-radius: var(--border-radius);
        padding: var(--space);
        padding-bottom: 0;

        &.danger {
            background-color: var(--c-danger-light);
            color: var(--c-danger-dark);
        }
    }

    .dialog__header {
        display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space);

        button {
            margin-left: auto;
        }
    }
</style>
