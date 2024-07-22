<template>
    <form v-if="organisationStore.locations[id]" v-on:submit="handleSubmit" class="form form--location" :class="{ 'loading': form.state == 'loading' }" ref="locationFormElement">
        <fieldset class="location-fieldset__name">
            <!-- <legend>Location</legend> -->

            <Field
                id="location_name"
                labelText="Location Name"
                :required="fields.location_name.required"
                :error="fields.location_name.error"
            >
                <input
                    id="location_name"
                    type="text"
                    v-model="fields.location_name.value"
                    v-on:keyup="clearError('location_name')"
                    :required="fields.location_name.required"
                    placeholder=""
                />
            </Field>
        </fieldset>

        <fieldset class="location-fieldset__address">
            <legend>Address</legend>

            <Field
                id="address_line_1"
                labelText="Address line 1"
                :required="fields.address_line_1.required"
                :error="fields.address_line_1.error"
            >
                <input
                    id="address_line_1"
                    type="text"
                    v-model="fields.address_line_1.value"
                    v-on:keyup="clearError('address_line_1')"
                    autocomplete="address-line1"
                    :required="fields.address_line_1.required"
                    placeholder=""
                />
            </Field>

            <Field
                id="address_line_2"
                labelText="Address line 2"
                :required="fields.address_line_2.required"
                :error="fields.address_line_2.error"
            >
                <input
                    id="address_line_2"
                    type="text"
                    v-model="fields.address_line_2.value"
                    v-on:keyup="clearError('address_line_2')"
                    autocomplete="address-line2"
                    :required="fields.address_line_2.required"
                    placeholder=""
                />
            </Field>

            <Field
                id="suburb"
                labelText="Town or City"
                :required="fields.suburb.required"
                :error="fields.suburb.error"
            >
                <input
                    id="suburb"
                    type="text"
                    v-model="fields.suburb.value"
                    v-on:keyup="clearError('suburb')"
                    autocomplete="address-level2"
                    :required="fields.suburb.required"
                    placeholder=""
                />
            </Field>

            <Field
                id="state"
                labelText="County"
                :required="fields.state.required"
                :error="fields.state.error"
            >
                <input
                    id="state"
                    type="text"
                    v-model="fields.state.value"
                    v-on:keyup="clearError('state')"
                    autocomplete="address-level1"
                    :required="fields.state.required"
                    placeholder=""
                />
            </Field>

            <Field
                id="postcode"
                labelText="Postcode"
                :required="fields.postcode.required"
                :error="fields.postcode.error"
            >
                <input
                    id="postcode"
                    type="text"
                    v-model="fields.postcode.value"
                    v-on:keyup="clearError('postcode')"
                    autocomplete="postal-code"
                    :required="fields.postcode.required"
                    maxlength="10"
                    placeholder=""
                />
            </Field>
        </fieldset>

        <fieldset class="location-fieldset__map">
            <legend>Map</legend>

            <Field
                id="url"
                labelText="URL"
                :required="fields.url.required"
                :error="fields.url.error"
            >
                <input
                    id="url"
                    type="url"
                    v-model="fields.url.value"
                    v-on:keyup="clearError('url')"
                    :required="fields.url.required"
                    placeholder="https://www.google.com/maps"
                />
            </Field>
            <Field
                id="latLong"
                labelText="Latitude and Longitude (required to show a map)"
                :required="fields.latLong.required"
                :error="fields.latLong.error"
            >
                <input
                    id="latLong"
                    type="text"
                    v-model="fields.latLong.value"
                    v-on:keyup="clearError('url')"
                    :required="fields.latLong.required"
                    placeholder=""
                />
            </Field>

            <Disclosure title="Getting Latitude and Longitude via a Google Map">
                <ol>
                    <li>search for your location</li>
                    <li>right-click on the marker</li>
                    <li>click on the co-ordinates in the popup</li>
                    <li>paste into the into the Latitude and Longitude field above (e.g. right-click and select 'paste')</li>
                </ol>
                <img src="@/assets/images/admin/get-lat-long.gif" alt="Push Pin" style="max-width: 300px" />
            </Disclosure>
        </fieldset>

        <fieldset class="location-fieldset__notes">
            <legend>Notes</legend>

            <p>You may wish to include information such as available facilities, parking information, public availability, transportation routes etc.</p>
            <RTE :editorContent="fields.notes.value" />
        </fieldset>

        <button type="submit" class="btn btn--success">Save</button>
    </form>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    import { useSiteAPI } from '@/api/useSiteAPI';

    import Field from '@/components/forms/shared/Field.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Help from '@/components/forms/shared/Help.vue'
    import RTE from '~/components/forms/shared/RTE.vue';
    import Disclosure from '@/components/interface/Disclosure.vue';


    import ArrowIcon from '@/components/icons/arrow.vue';
    import EyeIcon from '@/components/icons/eye.vue';
    import EyeClosedIcon from '@/components/icons/eye-closed.vue';

    const organisationStore = useOrganisationStore();

    const props = defineProps({
        id: {
            required: true
        }
    });

    const locationFormElement = ref(null);

    let form = reactive({
        state: 'init',
        error: null
    })

    const fields = reactive({
        location_name: {
            value: organisationStore.locations[props.id].name,
            error: null,
        },
        address_line_1: {
            value: organisationStore.locations[props.id].address.address_line_1,
            required: true,
            error: null,
        },
        address_line_2: {
            value: organisationStore.locations[props.id].address.address_line_2,
            required: false,
            error: null,
        },
        suburb: {
            value: organisationStore.locations[props.id].address.suburb,
            required: true,
            error: null,
        },
        state: {
            value: organisationStore.locations[props.id].address.state,
            required: true,
            error: null,
        },
        postcode: {
            value: organisationStore.locations[props.id].address.postcode,
            required: true,
            error: null,
        },
        url: {
            value: organisationStore.locations[props.id].address.url,
            required: false,
            error: null,
        },
        latLong: {
            value: organisationStore.locations[props.id].latLong,
            required: false,
            error: null,
        },
        notes: {
            value: organisationStore.locations[props.id].notes,
            required: false,
            error: null,
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        signupFormElement.value.reportValidity();

        if (!signupFormElement.value.checkValidity()) {
            const list = signupFormElement.value.querySelectorAll('fieldset :invalid');
            list.forEach(elem => {
                fields[elem.id].error = elem.validationMessage;
            })

            list[0].focus();
            form.state = '';
            return;
        }

        let data = {};

        for (let [key, value] of Object.entries(fields)) {
            data[key] = value.value;
        }

        const outcome = await useSiteAPI({ endpoint: 'register', data });
        let errorMessage;

        if (outcome && outcome.error) {
            errorMessage = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                errorMessage += `${error}`;
            }
        }

        if (errorMessage) {
            form.error = errorMessage;
            form.state = '';
            return;
        }

        navigateTo(`/with/${fields.url_slug.value}/admin`);
    };

    const clearError = (id) => {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };


</script>

<style lang="scss">
    .form--location {
        grid-column-start: 1;
        grid-column-end: -1;

        gap: 0 var(--space);
        max-width: none;

        @include breakpoint(lg) {
            display: grid;
            grid-template-areas: "name name" "address map" "notes notes" "submit submit";
        }

        button[type="submit"] {
            // align-self: start;
            grid-area: submit;
            margin-inline: auto;
            min-width: 200px;
        }
    }

    fieldset {
        flex: 0 0 auto;
    }

    .location-fieldset__name {
        grid-area: name;
    }

    .location-fieldset__map {
        grid-area: map;
    }

    .location-fieldset__address {
        grid-area: address;
    }

    .location-fieldset__notes {
        grid-area: notes;
    }
</style>