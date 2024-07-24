<template>
    <div class="rte-editor">
        <div class="rte-editor__buttons" v-if="editor">
            <button type="button" v-on:click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" class="btn btn--tertiary" title="Align Text Left">
                <AlignLeft />
            </button>
            <button type="button" v-on:click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" class="btn btn--tertiary" title="Align Text Center">
                <AlignCenter />
            </button>
            <button type="button" v-on:click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" class="btn btn--tertiary" title="Align Text Right">
                <AlignRight />
            </button>
            <button type="button" v-on:click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" class="btn btn--tertiary" title="Justify Text">
                <AlignJustify />
            </button>

            <button type="button" v-on:click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }" class="btn btn--tertiary" title="Bold">
                    <Bold />
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }" class="btn btn--tertiary" title="Italic">
                    <Italic />
            </button>
            <!-- <button type="button" v-on:click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }" class="btn btn--tertiary" title="Strikethrough">
                <Strikethrough />
            </button> -->
            <!-- <button type="button" v-on:click="editor.chain().focus().unsetAllMarks().run()" class="btn btn--tertiary">
                clear marks
            </button>
            <button type="button" v-on:click="editor.chain().focus().clearNodes().run()" class="btn btn--tertiary">
                clear nodes
            </button> -->

            <button type="button" v-on:click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }" class="btn btn--tertiary" title="Paragraph text">
                <Text />
            </button>

            <!-- Naming the heading buttons for their relative size, rather than actual element -->
            <button type="button" v-on:click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" class="btn btn--tertiary" title="Small Heading">
                h4
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" class="btn btn--tertiary" title="Medium Heading">
                h3
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" class="btn btn--tertiary" title="Large Heading">
                h2
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="btn btn--tertiary" title="Largest Heading">
                h1
            </button>

            <!-- <button type="button" v-on:click="setLink"
                :class="{ 'is-active': editor.isActive('link') }" class="btn btn--tertiary" title="Link">
                <LinkIcon />
            </button>
            <button type="button" v-on:click="editor.chain().focus().unsetLink().run()"
            :disabled="!editor.isActive('link')" class="btn btn--tertiary" title="Remove link">
                <LinkSlash />
            </button> -->
            <button type="button" v-on:click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }" class="btn btn--tertiary" title="Bullet list">
                <List />
                <!-- <span class="sr-only">Bullet list</span> -->
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }" class="btn btn--tertiary" title="Numbered list">
                <NumberedListLeft />
                <!-- <span class="sr-only">Numbered list</span> -->
            </button>
            <button type="button" v-on:click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }" class="btn btn--tertiary" title="Blockquote">
                <QuoteSolid />
                <!-- <span class="sr-only">Blockquote</span> -->
            </button>
            <button type="button" v-on:click="editor.chain().focus().setHorizontalRule().run()" class="btn btn--tertiary" title="Horizontal rule">
                <Minus />
                <!-- <span class="sr-only">Horizontal rule</span> -->
            </button>
            <button style="margin-right: auto" type="button" v-on:click="editor.chain().focus().setHardBreak().run()" class="btn btn--tertiary" title="Hard break">
                <LongArrowDownLeft />
            </button>
            <button type="button" v-on:click="editor.chain().focus().unsetAllMarks().clearNodes().run()" class="btn btn--tertiary btn-rte-editor-clear" title="Clear Formatting">
                <!-- clear formatting -->
                <Erase />
                <!-- <Text />
                <Xmark /> -->
                <!-- CLR -->
            </button>
            <button type="button" v-on:click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" class="btn btn--tertiary" title="Undo">
                <Undo />
                <!-- <span class="sr-only">Undo</span> -->
            </button>
            <button type="button" v-on:click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" class="btn btn--tertiary" title="Redo">
                <Redo />
                <!-- <span class="sr-only">Redo</span> -->
            </button>
        </div>
        <TiptapEditorContent :editor="editor" class="textarea rte-editor__editor" v-on:blur="$emit(props.updatedEventName, editor.getHTML())" />
    </div>

</template>

<script setup>
    import { AlignLeft, AlignRight, AlignCenter, AlignJustify, Bold, Italic, Strikethrough, List, NumberedListLeft, Text, QuoteSolid, Undo, Redo, Minus, Xmark, LongArrowDownLeft, Erase, LinkSlash, Link as LinkIcon } from '@iconoir/vue';
    import TextAlign from '@tiptap/extension-text-align';
    import Link from '@tiptap/extension-link';

    const props = defineProps({
        editorContent: {
            default: ""
        },
        updatedEventName: {
            default: "rteUpdate"
        }
    });

    const editor = useEditor({
        content: props.editorContent,
        placeholder: props.placeholder,
        extensions: [
            TiptapStarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'li', 'blockquote'],
                alignments: ['left', 'center', 'right', 'justify']
            }),
            Link.configure({
                openOnClick: false,
                defaultProtocol: 'https',
            }),
        ]
    });

    onBeforeUnmount(() => {
        unref(editor).destroy();
    });
</script>

<style lang="scss">
    .rte-editor {
        width: 100%;
        word-break: break-all;
    }

    .rte-editor__buttons {
        display: flex;
            flex-wrap: wrap;
            gap: var(--space-xxs);
        margin: 0 0 var(--space-sm);

        button {
            font-size: var(--sm);
            padding: var(--space-xs);
        }

        svg,
        path {
            stroke-width: 2.4px;
        }

        svg {
            max-height: var(--icon-size-sm);
            max-width: var(--icon-size-sm);

            @include breakpoint(med) {
                max-height: var(--icon-size);
                max-width: var(--icon-size);
            }
        }
    }

    .btn-rte-editor-clear {
        gap: 0;
    }
</style>

