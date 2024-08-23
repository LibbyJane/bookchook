import axios from "axios"
import { apibase_URL, config } from '@/api/config';
import { useUserStore } from '@/stores/user';

const endpoints = {
    getAccountBySlug: {
        uri: `account/by_slug`,
        method: 'GET'
    },
    getOrganisationUsers: {
        uri: `private/user/list`,
        method: 'GET',
        query: `?search=`
    },
    getOrganisationBillingSettings: {
        uri: `private/account/billing_settings`,
        method: 'GET'
    },
    updateOrganisationBillingSettings: {
        uri: `private/account/billing_settings`,
        method: 'PATCH'
    },
    updateThemeConfig: {
        uri: `private/account/theme_config`,
        method: 'PATCH'
    },
    getCustomerGroupsList: {
        uri: `private/customerGroup`,
        method: 'GET'
    },
    createCustomerGroup: {
        uri: `private/customerGroup`,
        method: 'POST'
    },
    deleteCustomerGroup: {
        uri: `private/customerGroup`,
        method: 'DELETE'
    },
    updateCustomerGroup: {
        uri: `private/customerGroup`,
        method: 'PATCH'
    },
    updateCustomerGroupCustomers: {
        uri: `private/customerGroup`,
        uriAddendum: `users`,
        method: 'POST'
    }
}

export async function useOrganisationAPI({endpoint, data, id, qs, $pinia }) {
    console.log('use organisation api', endpoint, data, id, qs, $pinia);
    const userStore = useUserStore($pinia)

    // console.log('useOrganisationAPI config:', config);
    // console.log('useOrganisationAPI endpoint, endpoints[endpoint]', endpoint, endpoints[endpoint]);
    // console.log('useOrganisationAPI endpoint, data, id, qs', data, id, qs);

    if (endpoint && endpoints[endpoint]) {
        config.base_URL = apibase_URL;
        config.url =  `/api/${endpoints[endpoint].uri}`;
        config.method = endpoints[endpoint].method;
        // console.log('updated config', config);

        if (config.url.indexOf('upload') > -1) {
            config.headers['content-type'] = 'multipart/form-data';
        }

        if (data) {
            config.data = data;
        }

        if (id) {
            config.url = config.url + `/${id}`;
        }

        if (qs) {
            if (config.url)
            config.url = config.url + `${endpoints[endpoint].query}${qs}`;
        }

        if (endpoints[endpoint].uriAddendum) {
            config.url = config.url + `/${endpoints[endpoint].uriAddendum}`;
        }

        // console.log('final config', config);

        try {
            const response = await axios(config)
            return response;
        } catch (error) {
            // console.log('error', error)
            // console.log('error.response', error.response)
            // console.log('error.response.data', error.response.data)

            // console.log("There was a problem.", error)
            if (error.response.status === 403 || error.response.status === 401) {
                console.warn('bad token, logout');
                userStore.$state.authenticated = false;
            }

            else if (error.response && error.response.data) {
                // console.log('return error', error.response.data);
                return error.response.data
            }
        }

        // return () => {
        //     ourRequest.cancel()
        // }
    }
}

export default useOrganisationAPI
