<template>
    <section class="container">
        <form v-on:submit="handleSubmit" class="form form--signup" :class="{ 'loading': form.state == 'loading' }" ref="signupFormElement">
            <fieldset>
                <legend>About your organisation</legend>

                <Field
                    id="account_name"
                    labelText="Organisation Name"
                    :required="fields.account_name.required"
                    :error="fields.account_name.error"
                >
                    <input
                        id="account_name"
                        type="text"
                        v-model="fields.account_name.value"
                        v-on:keyup="clearError('account_name')"
                        v-on:blur="updateURLSlug"
                        autocomplete="organization"
                        :required="fields.account_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    id="url_slug"
                    labelText="Account Handle"
                    :required="fields.url_slug.required"
                    :help="`e.g. ${url.host}${organisationStore.organisation_page_prefix}${fields.url_slug.value ? fields.url_slug.value : 'your-name-here'}`"
                    :error="fields.url_slug.error"
                >
                    <input
                        id="url_slug"
                        type="text"
                        v-model="fields.url_slug.value"
                        v-on:keyup="clearError('url_slug')"
                        v-on:blur="handleSlugChange"
                        :required="fields.url_slug.required"
                        minlength="3"
                        maxlength="45"
                        style="text-transform: lowercase;"
                        placeholder=""
                        pattern="[a-z0-9]{1}[a-z0-9\-_.]{2,}"
                        ref="urlSlugField"
                    />
                </Field>

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

                <Field
                    id="country_code"
                    labelText="Country"
                    :required="fields.country_code.required"
                    :error="fields.country_code.error"
                >
                    <select id="country_code" v-model="fields.country_code.value" v-on:change="clearError('country_code')" :required="fields.country_code.required">
                        <option disabled value="-1">Select</option>
                        <option v-for="country in countriesData" :value="country.country_code">{{ country.country_name }}</option>
                    </select>
                </Field>

                <Field
                    id="timezone"
                    labelText="Timezone"
                    :required="fields.timezone.required"
                    :error="fields.timezone.error"
                >
                    <select
                        id="timezone"
                        v-model="fields.timezone.value"
                        v-on:change="clearError('timezone')"
                        :disabled="!fields.country_code.value"
                        :required="fields.timezone.required"

                    >
                        <option disabled>Select</option>
                        <option v-for="timezone in timezonesData" :value="timezone.timezone ">{{ timezone.timezone }}</option>
                    </select>
                </Field>
            </fieldset>

            <fieldset>
                <legend>Your Details</legend>

                <Field
                    id="user_first_name"
                    labelText="First name"
                    :required="fields.user_first_name.required"
                    :error="fields.user_first_name.error"
                >
                    <input
                        id="user_first_name"
                        type="text"
                        v-model="fields.user_first_name.value"
                        v-on:keyup="clearError('user_first_name')"
                        autocomplete="given-name"
                        :required="fields.user_first_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    id="user_last_name"
                    labelText="Last name"
                    :required="fields.user_last_name.required"
                    :error="fields.user_last_name.error"
                >
                    <input
                        id="user_last_name"
                        type="text"
                        v-model="fields.user_last_name.value"
                        v-on:keyup="clearError('user_last_name')"
                        autocomplete="family-name"
                        :required="fields.user_last_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    id="email_address"
                    labelText="Email address"
                    :required="fields.email_address.required"
                    :error="fields.email_address.error"
                >
                    <input
                        id="email_address"
                        type="email"
                        v-model="fields.email_address.value"
                        v-on:keyup="clearError('email_address')"
                        autocomplete="email"
                        :required="fields.email_address.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    id="phone"
                    labelText="Phone Number"
                    :required="fields.phone.required"
                    :error="fields.phone.error"
                >
                    <input
                        id="phone"
                        type="tel"
                        v-model="fields.phone.value"
                        v-on:keyup="clearError('phone')"
                        autocomplete="tel"
                        :required="fields.phone.required"
                        placeholder=""
                    />
                </Field>
                <Field
                    id="password"
                    labelText="Password"
                    :required="fields.password.required"
                    :error="fields.password.error"
                >
                    <div class="field field-with-button">
                        <input
                            id="password"
                            :type="fields.password.type"
                            v-model="fields.password.value"
                            v-on:keyup="clearError('password')"
                            autocomplete="password"
                            minlength="8"
                            :required="fields.password.required"
                            placeholder=""
                        />
                        <button type="button" v-on:click="() => fields.password.type == 'password' ?  fields.password.type = 'text' : fields.password.type = 'password'" title="Toggle password visiblity">
                            <EyeIcon cssClass="show-if-text" svgAlt="Show password" />
                            <EyeClosedIcon cssClass="show-if-password" svgAlt="Hide password" />
                        </button>
                    </div>
                </Field>
            </fieldset>
            <Error v-if="form.error" :message="form.error" />
            <button class="btn" type="submit" v-on:click="handleSubmit">
                Sign Up
                <ArrowIcon />
            </button>
        </form>
    </section>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation.js';
    import { useSiteAPI } from '@/api/useSiteAPI';

    import Field from '@/components/forms/shared/Field.vue';
    import Error from '@/components/forms/shared/Error.vue';

    import ArrowIcon from '@/components/icons/arrow.vue';
    import EyeIcon from '@/components/icons/eye.vue';
    import EyeClosedIcon from '@/components/icons/eye-closed.vue';

    const organisationStore = useOrganisationStore();
    const url = useRequestURL();

    let countriesData = ref(null);
    let timezonesData = ref(null);

    const signupFormElement = ref(null);
    const urlSlugField = ref(null);

    let form = reactive({
        state: 'init',
        error: null
    })

    const fields = reactive({
        account_name: {
            value: '',
            required: true,
            error: null,
        },
        url_slug: {
            value: '',
            required: true,
            error: null,
        },
        address_line_1: {
            value: '',
            required: true,
            error: null,
        },
        address_line_2: {
            value: '',
            required: false,
            error: null,
        },
        suburb: {
            value: '',
            required: true,
            error: null,
        },
        state: {
            value: '',
            required: true,
            error: null,
        },
        postcode: {
            value: '',
            required: true,
            error: null,
        },
        country_code: {
            value: '',
            required: true,
            error: null,
        },
        timezone: {
            value: -1,
            required: true,
            error: null,
        },
        phone: {
            value: '',
            required: true,
            error: null,
        },
        user_first_name: {
            value: '',
            required: true,
            error: null,
        },
        user_last_name: {
            value: '',
            required: true,
            error: null,
        },
        email_address: {
            value: '',
            required: true,
            error: null,
        },
        password: {
            value: '',
            error: null,
            required: true,
            type: 'password'
        },

    });

    async function initForm() {
        const ipAddressData = await useSiteAPI({endpoint: 'getGeoInfoFromIpAddress'});

        if (ipAddressData) {
            fields.country_code.value = ipAddressData.data.ipaddress_geoinfo.country_code;
            fields.timezone.value = ipAddressData.data.ipaddress_geoinfo.timezone;
        }

        const cData = await useSiteAPI({ endpoint: 'getCountries' });

        if (cData) {
            countriesData.value = cData.data.countries;
        }

        form.state = "";
    }
    initForm();

    watchEffect(async () => {
        let timezonesConfig = {
            endpoint: 'getTimezones'
        };

        if (fields.country_code.value) {
            timezonesConfig.qs = `country_code=${fields.country_code.value}`;
        }

        const response = await useSiteAPI(timezonesConfig);

        if (response.data) {
            timezonesData.value = response.data.timezones;

            response.data.timezones.length === 1 ? fields.timezone.value = response.data.timezones[0].timezone : fields.timezone.value = -1;
        }
    });

    const clearError = (id) => {
        if (!id || !fields[id])  return;
        fields[id].error = null;
        form.error = '';
    };


    const updateURLSlug = async () => {
        if (!fields.url_slug.value && fields.account_name.value?.length > 2) {
            let testSlug = fields.account_name.value.toLowerCase().replaceAll(' ', '');
            const response = await useSiteAPI({endpoint: 'slugAvailable', id: testSlug});

            if (response.data?.available) {
                fields.url_slug.value = testSlug;
            }
        }
    };

    const slugValidationPatternMessage = "Please enter at least 3 characters, starting with a letter or number, and no special characters other than _ . or -.";

    const handleSlugChange = async () => {
        // reset any slug errors
        fields.url_slug.error = "";
        urlSlugField.value.setCustomValidity("");
        urlSlugField.value.checkValidity();

        // if the regex doesn't match, give a more helpful error message
        if (urlSlugField.value.validity.patternMismatch) {
            urlSlugField.value.setCustomValidity(slugValidationPatternMessage);
        }

        fields.url_slug.error = urlSlugField.value.validationMessage;

        if (!urlSlugField.value.validity.valid)
        {
            return;
        }

        let errorMessage = "";
        fields.url_slug.value = fields.url_slug.value.toLowerCase();
        const response = await useSiteAPI({endpoint: 'slugAvailable', id: `${fields.url_slug.value}`});

        if (response.error) {
            errorMessage = response.error.replaceAll('AccountSlug', 'Account handle');
        }

        else if (response.data?.available == false) {
            errorMessage = "This handle is unavailable.";
        }

        fields.url_slug.error = errorMessage;
    };

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
</script>