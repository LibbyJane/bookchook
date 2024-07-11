import axios from "axios"
import { apiBaseURL, config } from '@/api/config';
// import { useOrganisationStore } from '@/stores/organisation';

const endpoints = {
    getAccountBySlug: {
        uri: `account/by_slug`,
        method: 'GET'
    },
    getOrganisationBookers: {
        uri: `private/user/list`,
        method: 'GET',
        query: `?search=`
    }
}

export async function useOrganisationAPI({endpoint, data, id, qs}) {
    console.log('useOrganisationAPI config::::', config);
    console.log('useOrganisationAPI endpoint, endpoints[endpoint]', endpoint, endpoints[endpoint]);
    console.log('useOrganisationAPI endpoint, data, id, qs', data, id, qs);

    if (endpoint && endpoints[endpoint]) {
        console.log('continue');

        // let config = {
        //     baseURL: apiBaseURL,
        //     url: `/api/${endpoints[endpoint].uri}`,
        //     method: endpoints[endpoint].method
        // };
        config.baseURL = apiBaseURL;
        config.url =  `/api/${endpoints[endpoint].uri}`;
        config.method = endpoints[endpoint].method;
        console.log('updated config', config);

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
            config.url = config.url + `${endpoints[endpoint].query}${qs}`;
        }

        console.log('final config', config);

        try {
            const response = await axios(config)
            return response;
        } catch (error) {
            console.log('error', error)
            // console.log("There was a problem.", error)
            if (error.response.status === 403) {
                console.log('bad token, logout')
            }
            else if (error.response && error.response.data) {
                return error.response.data
            }
        }

        // return () => {
        //     ourRequest.cancel()
        // }
    }

}

export default useOrganisationAPI
