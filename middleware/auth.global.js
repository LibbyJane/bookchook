import { useUserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    // const router = useRouter()

    if (to.path.indexOf('login') > -1 && userStore.$state.authenticated) {
        // already logged in
        return navigateTo(`${to.path.split('/login')[0]}`);
    }

    if (to.path.indexOf('admin') > -1 && to.path.indexOf('login') == -1) {
        if (!userStore.$state.authenticated ) {
            // console.log('not authenticated, go to login page');
            return navigateTo('login');
        }

        if (userStore.$state.role != 'admin') {
            // console.log('authenticated but lacks permissions, go to organisation page');
            return navigateTo(to.path.split('/admin')[0]);
        }
    }
})
