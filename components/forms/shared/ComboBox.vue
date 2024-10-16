<template>
    <div
        :id="id"
        class="combobox"
    >
        <input
            type="search"
            v-on:input="$event => filterComboBox($event)"
            v-on:focus="showOptions = true"
            :required="field.required"
            :placeholder="field.placeholder"
            :value="searchValue"
            ref="comboboxInput"
            tabindex="0"
        />
        <Transition>
            <ul class="combobox__options" v-if="showOptions" ref="optionsList" tabindex="-1"
            >
                <template v-for="option in field.options"  >
                    <li v-if="!option.hidden" tabindex="-1">
                        <label  v-on:keyup.enter="handleSelectOption($event)"  tabindex="0">
                            {{ option.text }}
                            <input type="radio" :id="`cb-${option.text.replaceAll(' ', '')}`" :name="`cb-${field.label.replaceAll(' ', '')}`" :data-display="option.text" :value="option.value" v-model="field.value" :disabled="option.disabled" v-on:click="handleCbChange(option.text)" v-on:keyup.enter="handleSelectOption($event)"
                            />
                        </label>
                    </li>
                </template>
            </ul>
        </Transition>
    </div>
</template>

<script setup>
    const emit = defineEmits(['fieldChange']);

    const searchValue = ref('');
    const optionsList = ref(null);
    const comboboxInput = ref(null);
    const showOptions = ref(false);

    const props = defineProps({
        id: null,
        field: {}
    });

    function handleSelectOption(e) {
        props.field.value = e.srcElement.type == 'radio' ? e.srcElement.value : e.srcElement.firstElementChild.value;
        searchValue.value = e.srcElement.type == 'radio' ? e.srcElement.dataset.display : e.srcElement.firstElementChild.dataset.display;
        showOptions.value = false;
    }

    const filterComboBox = (e) => {
        const val = e.target.value.toLowerCase();

        props.field.options.forEach(option => {
            const searchMatched = val && option.text?.toLowerCase().indexOf(val) > -1;

            if (!val) {
                option.hidden = false;
                props.field.value = null;
            } else if (!searchMatched) {
                option.hidden = true;
            } else {
                option.hidden = false;
            }
        });

    }

    function handleCbChange(value) {
        searchValue.value = value;
        showOptions.value = false;

        emit('fieldChange', props.field);
    }
</script>


<style lang="scss">

.v-enter-active,
.v-leave-active {
    max-height: 100vh;
}

.v-enter-from,
.v-leave-to {
    max-height: 0;
}


.combobox {
    input[type="search"] {
        margin: 0;
    }
}

.combobox__options {
    @include scrollbars($alt-theme: true);
    box-shadow: var(--box-shadow-elevate);
    max-height: 50vh;
    overflow: auto;
    opacity: 1;
    z-index: var(--zi-base);
    list-style: none;
    margin: 0;
    padding: var(--space-sm);

    li {
        margin: 0;
        padding: 0;
        position: relative;

        &:empty {
            display: none;
        }
    }

    label {
        cursor: pointer;
        display: flex;
        padding: var(--space-xs) 0;
        position: relative;

        #{$hover} {
            color: var(--c-accent);
        }
    }

    input {
        &,
        &:disabled {
            position: absolute;
            inset: 0;
            margin: 0;
            padding: 0;
            z-index: 1;
            opacity: 0;
        }

    }

}

</style>