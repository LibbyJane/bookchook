
import { nextTick } from 'vue';
import { useAPI } from '@/api/useBookerAPI';

export const useBookerStore = defineStore({
    id: 'user',
    state: () => ({
        authenticated: true,
        info: null,
        bookings: [1, 2, 10]
    }),
    getters: {
        getAuthenticationToken(state) {
            if (state.authenticated && state.authenticated.token && state.authenticated.expiresAt > Date.now()) {
                return state.authenticated.token;
            }
        }
    },
    actions: {
        init() {
            const now = Date.now();

            if (bookerSessionValid) {
                console.log('valid');
            } else {
                console.log('invalid')
            }
        },

        async performLogin(data) {
            const response = await useAPI(`login`, data);
            console.log('response', response);

            if (response && response.tokenInfo) {
                this.initUserData(response);
                // router.replace('/');
            } else {
                return response;
            }
        },

        async performSignUp(data) {
            const response = await useAPI(`register`, data);

            if (response.tokenInfo) {
                this.initUserData(response);
                // router.replace('/');
            } else {
                return response;
            }
        },

        initUserData(data) {
            this.info = data.user;
            this.updateAuth(data.tokenInfo);
        },

        updateAuth(data) {
            this.auth = data;
            localStorage.setItem('bookerToken', data.token);
            localStorage.setItem('bookerSessionExpiry', data.expiresAt);
        },

        async performLogout() {
            if (this.auth.token) {
                const response = await useAPI(`logout`);
                this.reset();
                // router.replace('/login');
                // if (response.success) {
                //     this.reset();\\\\
                // }
            }
        },

        async updatePhoto(data) {
            console.log('update user photo', data);
            const response = await useAPI(`profilePhoto`, { profilePhoto: data });

            if (response.success) {
                this.info.imageURL = null;
                await nextTick();
                this.info.imageURL = response.imageUrl;
            }
        },

        reset() {
            this.$reset();
            localStorage.removeItem('bookerToken');
            localStorage.removeItem('bookerSessionExpiry');
        },
    },
    persist: {
        enabled: true,
    },
});
