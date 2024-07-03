<template>
    <section class="container">
        <form v-on:submit="handleSubmit" class="form form--signup">
            <!-- <pre>
                ipAddressGeo {{ ipAddressGeo }}
                fields.country_code {{  fields.country_code.value }}
                timezonesData {{  timezonesData }}
            </pre> -->

            <fieldset>
                <legend>About your organisation</legend>

                <Label for="account_name" text="Organisation Name" :required="fields.account_name.required" />
                <input
                    id="account_name"
                    type="text"
                    v-model="fields.account_name.value"
                    v-on:keyup="clearError"
                    v-on:blur="updateURLSlug"
                    autocomplete="organization"
                    :required="fields.account_name.required"
                />

                <Label for="url_slug" text="Account Handle" :required="fields.url_slug.required" />
                <Help :message="`The way your organision name will show in URLs, e.g. ${url.host}${siteStore.organisationPagePrefix}${fields.url_slug.value ? fields.url_slug.value : 'your-name-here'}`" />
                <input
                    id="url_slug"
                    type="text"
                    v-model="fields.url_slug.value"
                    v-on:keyup="clearError"
                    v-on:blur="handleSlugChange"
                    :required="fields.url_slug.required"
                    minlength="3"
                />
                <Error v-if="fields.url_slug.error" :message="fields.url_slug.error" />

                <Label for="address_line_1" text="Address line 1" :required="fields.address_line_1.required" />
                <input
                    id="address_line_1"
                    type="text"
                    v-model="fields.address_line_1.value"
                    v-on:keyup="clearError"
                    autocomplete="address-line1"
                    :required="fields.address_line_1.required"
                />

                <Label for="address_line_1" text="Address line 2" :required="fields.address_line_2.required" />
                <input
                    id="address_line_2"
                    type="text"
                    v-model="fields.address_line_2.value"
                    v-on:keyup="clearError"
                    autocomplete="address-line2"
                    :required="fields.address_line_2.required"
                />

                <Label for="suburb" text="Town or City" :required="fields.suburb.required" />
                <input
                    id="suburb"
                    type="text"
                    v-model="fields.suburb.value"
                    v-on:keyup="clearError"
                    autocomplete="address-level2"
                    :required="fields.suburb.required"
                />

                <Label for="state" text="County" :required="fields.state.required" />
                <input
                    id="state"
                    type="text"
                    v-model="fields.state.value"
                    v-on:keyup="clearError"
                    autocomplete="address-level1"
                    :required="fields.state.required"
                />

                <Label for="postcode" text="Postcode" :required="fields.postcode.required" />
                <input
                    id="postcode"
                    type="text"
                    v-model="fields.postcode.value"
                    v-on:keyup="clearError"
                    autocomplete="postal-code"
                    :required="fields.postcode.required"
                    maxlength="10"
                />

                <Label for="country_code" text="Country" :required="fields.country_code.required" />
                <select id="country_code" v-model="fields.country_code.value" v-on:change="clearError">
                    <option disabled value="-1">Select</option>
                    <option v-for="country in countriesData" :value="country.country_code">{{ country.country_name }}</option>
                </select>

                <Label for="timezone" text="Timezone" :required="fields.timezone.required" />
                <select id="timezone" v-model="fields.timezone.value" v-on:change="clearError" :disabled="!fields.country_code.value">
                    <option disabled value="-1">Select</option>
                    <option v-for="timezone in timezonesData" :value="timezone.timezone ">{{ timezone.timezone }}</option>
                </select>

                <Label for="phone" text="Phone number" :required="true" />
                <input
                    id="phone"
                    type="tel"
                    v-model="fields.phone.value"
                    v-on:keyup="clearError"
                    autocomplete="tel"
                    required
                />
            </fieldset>

            <fieldset>
                <legend>Your Details</legend>

                <Label for="user_first_name" text="First name" :required="true" />
                <input
                    id="user_first_name"
                    type="text"
                    v-model="fields.user_first_name.value"
                    v-on:keyup="clearError"
                    autocomplete="given-name"
                    required
                />

                <Label for="user_last_name" text="Last name" :required="true" />
                <input
                    id="user_last_name"
                    type="text"
                    v-model="fields.user_last_name.value"
                    v-on:keyup="clearError"
                    autocomplete="family-name"
                    required
                />

                <Label for="email_address" text="Email address" :required="true" />
                <input
                    id="email_address"
                    type="email"
                    v-model="fields.email_address.value"
                    v-on:keyup="clearError"
                    autocomplete="email"
                    required
                />

                <Label for="password" text="Password" :required="true" />
                <div class="field-with-button">
                    <input
                        id="password"
                        :type="fields.password.type"
                        v-model="fields.password.value"
                        v-on:keyup="clearError"
                        autocomplete="password"
                        minlength="8"
                        required
                    />
                <button type="button" v-on:click="() => fields.password.type == 'password' ?  fields.password.type = 'text' : fields.password.type = 'password'" title="Toggle password visiblity">
                    <EyeIcon cssClass="show-if-text" svgAlt="Show password" />
                    <EyeClosedIcon cssClass="show-if-password" svgAlt="Hide password" />
                </button>
            </div>

            <Error v-if="formError" :message="formError" />
            </fieldset>

            <button class="btn" type="submit">sign up</button>
        </form>
    </section>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useSiteStore } from '@/stores/site.js';
    import { useSiteAPI } from '@/api/useSiteAPI';

    import Label from '@/components/forms/shared/Label.vue';
    import Error from '@/components/forms/shared/Error.vue';
    import Help from '@/components/forms/shared/Help.vue';

    import EyeIcon from '@/components/icons/eye.vue';
    import EyeClosedIcon from '@/components/icons/eye-closed.vue';

    const siteStore = useSiteStore();

    const url = useRequestURL();

    let countriesData = ref(null);
    let timezonesData = ref(null);

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
        phone: {
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
            required: false,
            error: null,
        },
        postcode: {
            value: '',
            required: true,
            error: null,
        },
        state: {
            value: '',
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


    // const fields = reactive({
    //     account_name: {
    //         value: 'Community TTC',
    //         required: true,
    //         error: null,
    //     },
    //     url_slug: {
    //         value: 'community-ttc',
    //         required: true,
    //         error: null,
    //     },
    //     phone: {
    //         value: '07 123 1234',
    //         required: true,
    //         error: null,
    //     },
    //     address_line_1: {
    //         value: '40 Methley Place',
    //         required: true,
    //         error: null,
    //     },
    //     address_line_2: {
    //         value: '',
    //         required: false,
    //         error: null,
    //     },
    //     suburb: {
    //         value: 'Leeds',
    //         required: false,
    //         error: null,
    //     },
    //     postcode: {
    //         value: 'LS7 3NN',
    //         required: true,
    //         error: null,
    //     },
    //     state: {
    //         value: 'West Yorkshire',
    //         required: false,
    //         error: null,
    //     },
    //     country_code: {
    //         value: '',
    //         required: true,
    //         error: null,
    //     },
    //     timezone: {
    //         value: -1,
    //         required: true,
    //         error: null,
    //     },
    //     user_first_name: {
    //         value: 'Your',
    //         required: true,
    //         error: null,
    //     },
    //     user_last_name: {
    //         value: 'Mum',
    //         required: true,
    //         error: null,
    //     },
    //     email_address: {
    //         value: 'yourmum@test.com',
    //         required: true,
    //         error: null,
    //     },
    //     password: {
    //         value: '4385gji3$£%',
    //         error: null,
    //         required: true,
    //         type: 'password'
    //     },

    // });

    async function initGeoData() {
        const ipAddressData = await useSiteAPI({endpoint: 'getGeoInfoFromIpAddress'});

        if (ipAddressData) {
            fields.country_code.value = ipAddressData.data.ipaddress_geoinfo.country_code;
            fields.timezone.value = ipAddressData.data.ipaddress_geoinfo.timezone;
        }

        const cData = await useSiteAPI({ endpoint: 'getCountries' });

        if (cData) {
            countriesData.value = cData.data.countries;
        }
    }
    initGeoData();

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


    let formError = ref('');

    const clearError = () => {
        // fields[fieldKey].error = null;
        formError.value = '';
    };

    let slugAvailable = ref(true);

    // watchEffect(async () => {
    //     const response = await fetch(
    //         `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    //     )
    //     data.value = await response.json()
    // })




    const updateURLSlug = async () => {
        if (!fields.url_slug.value && fields.account_name.value.length > 2) {
            const replaceOptions = ['-', '_', ''];

            replaceOptions.some(async function(element, index) {
                let testSlug = fields.account_name.value.replace(' ', element);
                let response = await useSiteAPI({endpoint: 'slugAvailable', id: testSlug});
                // let response.data.available = index == 2 ? true : false;
                console.log('testSlug', testSlug);
                console.log('response.data.available', response.data.available);

                if (response.data.available) {
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

        const response = await useSiteAPI({endpoint: 'slugAvailable', id: `${fields.url_slug.value}`});

        if (response.data.available == false) {
            fields.url_slug.error = "This handle is unavailable.";
        }

        console.log('slug?', fields.url_slug.value, response);
    };

    // const computedSlug = computed({
    // // getter
    // get() {
    //     return firstName.value + ' ' + lastName.value
    // },
    // // setter
    // set(newValue) {
    //     // Note: we are using destructuring assignment syntax here.
    //     [firstName.value, lastName.value] = newValue.split(' ')
    // }
    // })


    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {};

        for (let [key, value] of Object.entries(fields)) {
            data[key] = value.value;
        }


//       const data =  {
// 	"account_name": "Community TTC",
//     "url_slug": "communityttc",
//     "user_first_name": "Andrew",
//     "user_last_name": "Chapman",
// 	"email_address": "info@communityttc.com",
// 	"password": "Mango77z",
//     "phone": "+44 7943 651 675",
//     "address_line_1": "48 Methley Place",
//     "address_line_2": "",
//     "suburb": "Leeds",
//     "postcode": "LS7 3NN",
//     "state": "Yorkshire West",
//     "country_code": "GB",
//     "timezone": "Europe/London"
// };
        const outcome = await useSiteAPI({ endpoint: 'register', data });

        if (outcome && outcome.error) {
            formError.value = outcome.error;
        } else if (outcome && outcome.errors) {
            for (let error of outcome.errors) {
                console.log('error', error);
                formError.value += `${error}`;
            }
        }
    };
</script>
