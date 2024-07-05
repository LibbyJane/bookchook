<template>
    <section class="container">
        <form v-on:submit="handleSubmit" class="form form--signup" :class="{ 'loading': form.state == 'loading' }"
        >
            <!-- <pre>
                ipAddressGeo {{ ipAddressGeo }}
                fields.country_code {{  fields.country_code.value }}
                timezonesData {{  timezonesData }}
            </pre> -->

            <fieldset>
                <legend>About your organisation</legend>

                <Field
                    :id="account_name"
                    labelText="Organisation Name"
                    :required="fields.account_name.required"
                    :error="fields.account_name.error"
                >
                    <input
                        id="account_name"
                        type="text"
                        v-model="fields.account_name.value"
                        v-on:keyup="clearError"
                        v-on:blur="updateURLSlug"
                        autocomplete="organization"
                        :required="fields.account_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="url_slug"
                    labelText="Account Handle"
                    :required="fields.url_slug.required"
                    :help="`The way your organision name will show in URLs, e.g. ${url.host}${siteStore.organisationPagePrefix}${fields.url_slug.value ? fields.url_slug.value : 'your-name-here'}`"
                    :error="fields.url_slug.error"
                    placeholder=""
                >
                    <input
                        id="url_slug"
                        type="text"
                        v-model="fields.url_slug.value"
                        v-on:keyup="clearError"
                        v-on:blur="handleSlugChange"
                        :required="fields.url_slug.required"
                        minlength="3"
                        style="text-transform: lowercase;"
                        placeholder=""
                        pattern="[a-zA-Z0-9\-_.]{3,}"

                    />
                </Field>

                <Field
                    :id="address_line_1"
                    labelText="Address line 1"
                    :required="fields.address_line_1.required"
                    :error="fields.address_line_1.error"
                >
                    <input
                        id="address_line_1"
                        type="text"
                        v-model="fields.address_line_1.value"
                        v-on:keyup="clearError"
                        autocomplete="address-line1"
                        :required="fields.address_line_1.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="address_line_2"
                    labelText="Address line 2"
                    :required="fields.address_line_2.required"
                    :error="fields.address_line_2.error"
                >
                    <input
                        id="address_line_2"
                        type="text"
                        v-model="fields.address_line_2.value"
                        v-on:keyup="clearError"
                        autocomplete="address-line2"
                        :required="fields.address_line_2.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="suburb"
                    labelText="Town or City"
                    :required="fields.suburb.required"
                    :error="fields.suburb.error"
                >
                    <input
                        id="suburb"
                        type="text"
                        v-model="fields.suburb.value"
                        v-on:keyup="clearError"
                        autocomplete="address-level2"
                        :required="fields.suburb.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="state"
                    labelText="County"
                    :required="fields.state.required"
                    :error="fields.state.error"
                >
                    <input
                        id="state"
                        type="text"
                        v-model="fields.state.value"
                        v-on:keyup="clearError"
                        autocomplete="address-level1"
                        :required="fields.state.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="postcode"
                    labelText="Postcode"
                    :required="fields.postcode.required"
                    :error="fields.postcode.error"
                >
                    <input
                        id="postcode"
                        type="text"
                        v-model="fields.postcode.value"
                        v-on:keyup="clearError"
                        autocomplete="postal-code"
                        :required="fields.postcode.required"
                        maxlength="10"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="country_code"
                    labelText="Country"
                    :required="fields.country_code.required"
                    :error="fields.country_code.error"
                >
                    <select
                        id="country_code"
                        v-model="fields.country_code.value"
                        v-on:change="clearError"
                        :required="fields.country_code.required"
                    >
                        <option disabled value="-1">Select</option>
                        <option v-for="country in countriesData" :value="country.country_code">{{ country.country_name }}</option>
                    </select>
                </Field>

                <Field
                    :id="timezone"
                    labelText="Timezone"
                    :required="fields.timezone.required"
                    :error="fields.timezone.error"
                >
                    <select
                        id="timezone"
                        v-model="fields.timezone.value"
                        v-on:change="clearError"
                        :disabled="!fields.country_code.value"
                        :required="fields.timezone.required"
                    >
                        <option disabled value="-1">Select</option>
                        <option v-for="timezone in timezonesData" :value="timezone.timezone ">{{ timezone.timezone }}</option>
                    </select>
                </Field>

                <Field
                    :id="phone"
                    labelText="Phone Number"
                    :required="fields.phone.required"
                    :error="fields.phone.error"
                >
                    <input
                        id="phone"
                        type="tel"
                        v-model="fields.phone.value"
                        v-on:keyup="clearError"
                        autocomplete="tel"
                        :required="fields.phone.required"
                        placeholder=""
                    />
                </Field>
            </fieldset>

            <fieldset>
                <legend>Your Details</legend>

                <Field
                    :id="user_first_name"
                    labelText="First name"
                    :required="fields.user_first_name.required"
                    :error="fields.user_first_name.error"
                >
                    <input
                        id="user_first_name"
                        type="text"
                        v-model="fields.user_first_name.value"
                        v-on:keyup="clearError"
                        autocomplete="given-name"
                        :required="fields.user_first_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="user_last_name"
                    labelText="Last name"
                    :required="fields.user_last_name.required"
                    :error="fields.user_last_name.error"
                >
                    <input
                        id="user_last_name"
                        type="text"
                        v-model="fields.user_last_name.value"
                        v-on:keyup="clearError"
                        autocomplete="family-name"
                        :required="fields.user_last_name.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="email_address"
                    labelText="Email address"
                    :required="fields.email_address.required"
                    :error="fields.email_address.error"
                >
                    <input
                        id="email_address"
                        type="email"
                        v-model="fields.email_address.value"
                        v-on:keyup="clearError"
                        autocomplete="email"
                        :required="fields.email_address.required"
                        placeholder=""
                    />
                </Field>

                <Field
                    :id="password"
                    labelText="Password"
                    :required="fields.password.required"
                    :error="fields.password.error"
                >
                    <div class="field field-with-button">
                        <input
                            id="password"
                            :type="fields.password.type"
                            v-model="fields.password.value"
                            v-on:keyup="clearError"
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

            <button class="btn" type="submit" v-on:click="handleSubmit">sign up</button>
        </form>
    </section>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useSiteStore } from '@/stores/site.js';
    import { useSiteAPI } from '@/api/useSiteAPI';

    import Field from '@/components/forms/shared/Field.vue';
    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Help from '~/components/forms/shared/Help.vue';

    import EyeIcon from '@/components/icons/eye.vue';
    import EyeClosedIcon from '@/components/icons/eye-closed.vue';

    const siteStore = useSiteStore();

    const url = useRequestURL();

    let countriesData = ref(null);
    let timezonesData = ref(null);

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


    const fields2 = reactive({
        account_name: {
            label: 'Organisation Name',
            value: 'Community TTC',
            required: true,
            error: null,
        },
        url_slug: {
            value: 'community-ttc',
            required: true,
            error: null,
        },
        phone: {
            value: '07 123 1234',
            required: true,
            error: null,
        },
        address_line_1: {
            value: '40 Methley Place',
            required: true,
            error: null,
        },
        address_line_2: {
            value: '',
            required: false,
            error: null,
        },
        suburb: {
            value: 'Leeds',
            required: false,
            error: null,
        },
        postcode: {
            value: 'LS7 3NN',
            required: true,
            error: null,
        },
        state: {
            value: 'West Yorkshire',
            required: false,
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
        user_first_name: {
            value: 'a',
            required: true,
            error: null,
        },
        user_last_name: {
            value: 'b',
            required: true,
            error: null,
        },
        email_address: {
            value: 'yourmum@test.com',
            required: false,
            error: null,
        },
        password: {
            value: '4385gji3$£%',
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

    const clearError = () => {
        // fields[fieldKey].error = null;
        form.error = '';
    };


    const updateURLSlug = async () => {
        if (!fields.url_slug.value && fields.account_name.value.length > 2) {
            const replaceOptions = ['-', '_', ''];

            replaceOptions.some(async function(element, index) {
                let testSlug = fields.account_name.value.replaceAll(' ', element);
                let response = await useSiteAPI({endpoint: 'slugAvailable', id: testSlug});
                // let response.data.available = index == 2 ? true : false;
                console.log('testSlug', testSlug);
                console.log('response', response);
                console.log('response.data.available', response.data?.available);

                if (response.data?.available) {
                    fields.url_slug.value = testSlug;
                    return false;
                }

                else return true
            })
        }
    };

    const handleSlugChange = async () => {
        if (!fields.url_slug.value?.length) {
            fields.url_slug.error = "";
            return;
        }

        if (fields.url_slug.value?.length < 3) {
            fields.url_slug.error = "Please enter at least three characters";
            return;
        };
        fields.url_slug.error = "";

        fields.url_slug.value = fields.url_slug.value.toLowerCase();
        const response = await useSiteAPI({endpoint: 'slugAvailable', id: `${fields.url_slug.value}`});

        if (response.error) {
            fields.url_slug.error = response.error.replaceAll('AccountSlug', 'Account handle');
            return;
        }

        if (response.data.available == false) {
            fields.url_slug.error = "This handle is unavailable.";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.state = 'loading';
        let data = {};

        for (let [key, value] of Object.entries(fields)) {
            data[key] = value.value;
        }

        const outcome = await useSiteAPI({ endpoint: 'register', data });

        if (outcome && outcome.error) {
            form.error = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                console.log('error', error);
                form.error += `${error}`;
            }
        }

        form.state = '';
    };
</script>
