export const useOrganisationStore = defineStore('organisationStore', {
    state: () => ({
        data: {
            organisation: {
                userID: '',
                name: '',
                address: '',
                phone: '',
                email: '',
                URL: ''
            },
            slug: '',
            purchaseTypes: {
                passes: true,
                membership: true
            },
            theme: {
                colors: {
                    brand: '',
                    brandContrast: '',
                    text: '',
                    background: '',
                    accent: ''
                },
                logoURL: ''
            }
        }
    }),
    actions: {
        async getOrganisationData(organisationID) {
            this.data.slug = organisationID;
            try {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json())
                .then(json => {
                    this.data = {
                        organisation: {
                            "userId": 1,
                            "name": "Community Table Tennis",
                            "address": `Methodist Center<br>Chapel Allerton<br>Leeds LS7 7SW`,
                            "phone": `0113 242 1550`,
                            "email": `info@theschoolofknock.com`,
                            "URL": `https://theschoolofknock.com`,
                        },
                        theme: {
                            colors: {
                                brand: 'hsl(207, 96%, 25%)',
                                brandContrast: 'hsl(55, 100%, 99%)',
                                text: 'hsl(208, 100%, 10%)',
                                background: 'hsl(207, 40%, 89%)',
                                accent: 'hsl(55, 100%, 50%)'
                            },
                            logoURL: '/demo/logo.svg'
                        }
                    };
                    return true;
                });
            } catch (error) {
                return error
            }
        },
    }
})