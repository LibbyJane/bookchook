import axios from "axios"
import { apibase_URL } from '@/api/config';
import { useUserStore } from '@/stores/user';

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

export async function useUserAPI(endpoint, data, id) {
    const userStore = useUserStore();
    const token = userStore && userStore.getAuthenticationToken ? userStore.getAuthenticationToken : null;
    // console.log('token', token)

    if (endpoint && endpoints[endpoint]) {
        let config = {
            headers: {},
            base_URL: apibase_URL,
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

                userStore.performLogout;
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

export default useUserAPI
