import axios from "axios"
import { apiBaseURL } from '@/api/config';

const endpoints = {
    getRegions: {
        uri: `geo/regions`,
        method: 'GET'
    },
    getCountries: {
        uri: `geo/countries`,
        method: 'GET'
    },
    getGeoInfoFromIpAddress: {
        uri: `geo/ipaddress_geoinfo`,
        method: 'GET'
    },
    getTimezones: {
        uri: `geo/timezones`,
        method: 'GET'
    },
    slugAvailable: {
        uri: `account/account_slug_available`,
        method: 'GET'
    },
    register: {
        uri: `account`,
        method: 'POST'
    }
}

export async function useSiteAPI({endpoint, data, id, qs}) {
    // console.log('use site api: endpoint, data, id, qs',  endpoint, data, id, qs);
    if (endpoint && endpoints[endpoint]) {
        let config = {
            headers: {},
            baseURL: apiBaseURL,
            url: `/api/${endpoints[endpoint].uri}`,
            method: endpoints[endpoint].method
        }

        if (config.url.indexOf('upload') > -1) {
            config.headers['content-type'] = 'multipart/form-data';
        }

        if (data) {
            config.data = data
        }

        if (qs) {
            config.url = config.url + `?${qs}`
        }

        if (id) {
            config.url = config.url + `/${id}`
        }

        try {
            const response = await axios(config)
            return response;
        } catch (error) {
            console.warn('error', error)
            if (error.response.status === 403) {
                console.warn('bad token, logout')
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

export default useSiteAPI
