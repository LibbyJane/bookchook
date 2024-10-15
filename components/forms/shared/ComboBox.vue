<template>
    <h1>ComboBox</h1>
    <div class="combobox" >
                                     <!-- v-on:focus="$event => filterComboBox(key, $event.target.value)" :class="{ 'combobox--open': form.state == 'loading'}" -->
                                      <!-- <pre>{{ field }}</pre> -->
                                      <pre>{{ searchValue }}</pre>
        <input
            type="search"
            v-on:input="$event => filterComboBox($event)"
            v-on:focus="showOptions = true"
            :required="field.required"
            :placeholder="field.placeholder"
            :value="searchValue"
            ref="comboboxInput"
        />
        <Transition>
            <ul class="combobox__options" v-if="showOptions"
            >
                <li v-for="option in field.options">
                    <label v-if="!option.hidden">
                        {{ option.text }}
                    </label>
                    <input type="radio" name="`cb-${field.label}`" :value="option.value" v-model="field.value" :disabled="option.disabled" v-on:click="handleCbChange(option.text)" />
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script setup>
    const emit = defineEmits(['fieldChange']);

    const searchValue = ref('test');
    const comboboxInput = ref(null);
    const showOptions = ref(false);

    const props = defineProps({
        field: {

        }
    });

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
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    max-height: 0;
  opacity: 0;
}

</style>