export default auth(_to => {
    if (import.meta.server) return;

    if (import.meta.client) {
        // code runs in the browser, not the server
        console.log('import.meta.client', import.meta.client)
        // console.log('local storage?', localStorage);

        // if (
        //     localStorage.getItem('bookerToken') &&
        //     localStorage.getItem('bookerSessionExpiry') &&
        //     localStorage.getItem('bookerSessionExpiry') > now
        // ) {
        //     console.log('valid');
        // }
    }


    const nuxtApp = useNuxtApp()
    if (process.client && nuxtApp.isHydrating &&
                nuxtApp.payload.serverRendered) {
       // this section will run only once , in the browser, when the page
       // initialized
    }
 })



// export default function({ store, redirect, route }) {
//     const bookerStore = useBookerStore();
//     // Do not run on server
//     if (import.meta.server) {
//         return
//     }


//     const bookerAuthenticationToken = bookerStore.getters['getAuthenticationToken']

//     if (bookerAuthenticationToken) {
//       if (route.path == '/login' || route.path == '/booker/temporary') {
//         return redirect('/')
//       }
//       return
//     }

//     // if (!bookerAuthenticationToken) {
//     //   return redirect('/login')
//     // }
//   }
