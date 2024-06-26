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

    users: {
        uri: `users`,
        method: 'GET'
    },

    notes: {
        uri: `notes`,
        method: 'GET'
    },

    note: {
        uri: `note`,
        method: 'POST'
    },

    notePhoto: {
        uri: `upload/note_photo/`,
        method: 'PATCH'
    },

    noteStatus: {
        uri: `note/update_status/`,
        method: 'PATCH'
    },

    noteReaction: {
        uri: `note/update_reaction/`,
        method: 'PATCH'
    },

    reactions: {
        uri: `note/reactions/`,
        method: 'GET'
    },

    profilePhoto: {
        uri: `upload/profile_photo`,
        method: 'POST'
    },

    invite: {
        uri: `invite`,
        method: 'POST'
    },

    invitationsReceived: {
        uri: `user/invitationsReceived`,
        method: 'GET'
    },

    acceptInvitation: {
        uri: `invite/accept/`,
        method: 'POST'
    },

    invitationIssuer: {
        uri: `user/invite/`,
        method: 'GET'
    },

    user: {
        uri: `user`,
        method: 'GET'
    },

    friends: {
        uri: `friends`,
        method: 'GET'
    }
}

export async function useAPI(endpoint, data, endpointID) {
    const bookerStore = useBookerStore();
    const token = bookerStore && bookerStore.getAuthenticationToken ? bookerStore.getAuthenticationToken : null;
    // console.log('token', token)

    if (endpoint && endpoints[endpoint]) {
        let config = {
            headers: {},
            baseURL: apiBaseURL,
            url: endpoints[endpoint].uri,
            method: endpoints[endpoint].method
        }

        if (config.url.indexOf('upload') > -1) {
            config.headers['content-type'] = 'multipart/form-data';
        }

        if (data) {
            config.data = data
        }

        if (endpointID) {
            config.url = config.url + `${endpointID}`
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

export default useAPI
