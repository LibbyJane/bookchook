import axios from "axios"
import { apiBaseURL } from '@/api/config';
// import { useOrganisationStore } from '@/stores/organisation';

const endpoints = {
    getAccountBySlug: {
        uri: `by_slug`,
        method: 'GET'
    },
}

export async function useOrganisationAPI({endpoint, data, id}) {
    if (endpoint && endpoints[endpoint]) {
        let config = {
            headers: {},
            baseURL: apiBaseURL,
            url: `/api/account/${endpoints[endpoint].uri}`,
            method: endpoints[endpoint].method
        }

        if (config.url.indexOf('upload') > -1) {
            config.headers['content-type'] = 'multipart/form-data';
        }

        if (data) {
            config.data = data
        }

        if (id) {
            config.url = config.url + `/${id}`
        }

        console.log('final config', config);

        try {
            const response = await axios(config)
            console.log('response', response)
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
