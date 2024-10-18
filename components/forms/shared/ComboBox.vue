<template>
    <div
        :id="id"
        class="combobox"
        v-on:keyup.esc="handleComboBoxBlur()"
        v-on:mouseleave="handleComboBoxBlur()"
    >
        <div class="combobox__search-wrapper">
            <!-- :list="`cb-${id}`" -->
            <button type="button" class="btn--plain combobox__search-button--search" v-if="showSearchButton">
                <span class="sr-only">Search</span>
                <Search />
            </button>
            <button type="button" class="btn--plain combobox__search-button--reset" v-if="showResetButton" v-on:click="resetCombobox">
                <span class="sr-only">Reset</span>
                <Xmark />
            </button>
            <input
                type="search"
                class="combobox__search"
                v-on:input="$event => filterComboBox($event.target.value.toLowerCase())"
                v-on:focus="handleComboBoxFocus()"
                v-on:blur="handleComboBoxBlur($event)"
                :required="field.required"
                :placeholder="field.placeholder"
                :value="searchValue"
                ref="comboboxInput"
                tabindex="0"
                :minlength="field.minLength"
            />
        </div>
        <!-- <datalist :id="`cb-${id}`">
            <option v-for="option in field.options" :value="option.value" :label="option.label"></option>
        </datalist> -->
        <Transition>

            <ul class="combobox__options" :hidden="!showOptions" ref="optionsList" tabindex="-1">
                <template v-for="option in field.options"  >
                    <li :hidden="option.hidden" tabindex="-1">
                        <label v-on:keyup.enter="handleSelectOption($event)"  tabindex="0">
                            {{ option.label }}
                            <input
                                type="radio"
                                :id="`cb-${option.label.replaceAll(' ', '')}`"
                                :name="`cb-${field.label.replaceAll(' ', '')}`"
                                :data-display="option.label"
                                :value="option.value"
                                v-model="field.value"
                                :disabled="option.disabled"
                                :hidden="option.hidden"
                                v-on:click="handleCbChange(option.label)"
                                v-on:keyup.enter="handleSelectOption($event)"
                                :required="field.required"
                            />
                        </label>
                    </li>
                </template>
            </ul>
        </Transition>
        <!-- <p v-if="noMatches" class="m-top error">No results matched your search.</p> -->

        <!-- <Error v-if="noMatches" cssClass="m-top" message="No results matched your search." /> -->
    </div>
</template>

<script setup>
    import { ref, watch, computed } from 'vue';
    import { Search, Xmark} from '@iconoir/vue';
    import Error from '@/components/forms/shared/Error.vue';

    const emit = defineEmits(['fieldChange']);

    const showResetButton = ref(false);
    const showSearchButton = ref(true);

    const searchValue = ref('');
    const optionsList = ref(null);
    const comboboxInput = ref(null);
    const showOptions = ref(false);
    const noMatches = ref(false);

    const props = defineProps({
        id: null,
        field: {}
    });

    function resetCombobox() {
        props.field.value = null;
        searchValue.value = '';
    }

    function handleComboBoxFocus() {
        showOptions.value = true;
        showSearchButton.value = false;
        // showResetButton.value = true;
        showResetButton.value = searchValue.value?.length ? true : false;

        if (!props.field.value && comboboxInput.value.length ) {
            filterComboBox(searchValue.value);
            return;
        }

        filterComboBox();
    }

    function handleComboBoxBlur(e) {
        console.log('cb blur', e);
        if (e) {
            return;
        }
        searchValue.value = '';

        const selectedOption = optionsList.value?.querySelector('li input:checked');
        searchValue.value = selectedOption ? selectedOption.getAttribute('data-display') : '';

        showOptions.value = false;
        comboboxInput.value.blur();
    }

    function handleSelectOption(e) {
        console.log('cb select', e);

        props.field.value = e.srcElement.type == 'radio' ? e.srcElement.value : e.srcElement.firstElementChild.value;
        searchValue.value = e.srcElement.type == 'radio' ? e.srcElement.dataset.display : e.srcElement.firstElementChild.dataset.display;
        showOptions.value = false;
    }

    const filterComboBox = (val) => {
        console.log('cb filter', val);

        let hiddenCount = 0;
        props.field.options.forEach(option => {
            const searchMatched = val && option.label?.toLowerCase().indexOf(val) > -1;

            if (!val) {
                option.hidden = false;
                // props.field.value = null;
            } else if (!searchMatched) {
                option.hidden = true;
                hiddenCount++;
            } else {
                option.hidden = false;
            }
        });
        noMatches.value = hiddenCount == props.field.options.length ? true : false;
    }

    function handleCbChange(val) {
        console.log('cb change', val);

        searchValue.value = val;
        showOptions.value = false;

        emit('fieldChange', props.field);
    }

    watch(
        () => searchValue.value,
        (val) => {
            emit('fieldChange', val);
        }
    )
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

    .combobox__search-wrapper {
        display: grid;
            grid-template-columns: 1fr calc(var(--icon-size) + var(--field-padding));
            align-items: center;
            justify-content: center;
        position: relative;
        z-index: var(--zi-base);

        #{$hover} {
            .combobox__search-button--search {

            }
        }

        button {
            grid-column: 2;
            grid-row: 1;
            display: flex;
                align-items: center;
                justify-content: center;
            transition: var(--transition);
            z-index: calc(var(--zi-base) + 1);
        }
    }

    .combobox__search {
        appearance: none;
        margin: 0;
        grid-column: 1/-1;
        grid-row: 1;

        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
            display: none;
        }
    }

    .combobox__options {
        @include scrollbars($alt-theme: true);
        background-color: var(--c-background);
        // box-shadow: var(--box-shadow-elevate);
        max-height: 50vh;
        overflow: auto;
        opacity: 1;
        list-style: none;
        margin: 0;
        padding: 0 var(--space-sm);

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