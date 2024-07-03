import axios from "axios"
import { apiBaseURL } from '@/api/config';
import { useBookerStore } from '@/stores/booker';

const endpoints = {
    register: {
        uri: `register`,
        method: 'POST'
    },

    login: {
        uri: `login`,
        method: 'POST'
    },

    logout: {
        uri: `logout`,
        method: 'GET'
    },
}

export async function useBookerAPI(endpoint, data, id) {
    const bookerStore = useBookerStore();
    const token = bookerStore && bookerStore.getAuthenticationToken ? bookerStore.getAuthenticationToken : null;
    // console.log('token', token)

    if (endpoint && endpoints[endpoint]) {
        let config = {
            headers: {},
            baseURL: apiBaseURL,
            url: `/api/user/${endpoints[endpoint].uri}`,
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

        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }

        console.log('final config', config);

        try {
            const response = await axios(config)
            // console.log('response', response)
            return response.data

        } catch (error) {
            console.log('error', error)
            // console.log("There was a problem.", error)
            if (error.response.status === 403) {
                console.log('bad token, logout')

                bookerStore.performLogout;
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

export default useBookerAPI
