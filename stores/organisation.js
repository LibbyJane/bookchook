import { useOrganisationAPI } from '@/api/useOrganisationAPI';

export let defaultColors = {
    theme_type: 'light',
    colors: {
        background: {
            hsl: {
                h: 207,
                s: 25,
                l: 97,
                hsl: '207, 25%, 97%'
            },
            hex: '#f5f8f9'
        },
        background_alt: {
            hsl: {
                h: 0,
                s: 0,
                l: 100,
                hsl: '0, 0%, 100%'
            },
            hex: '#ffffff'
        },
        background_alt2: {
            hsl: {
                h: 207,
                s: 25,
                l: 92,
                hsl: '207, 25%, 92%'
            },
            hex: '#fbfcfc'
        },
        text: {
            hsl: {
                h: 207,
                s: 100,
                l: 18,
                hsl: '207, 100%, 18%'
            },
            hex: '#00315c'
        },
        accent: {
            hsl: {
                h: 207,
                s: 96,
                l: 50,
                hsl: '207, 96%, 50%'
            },
            hex: '#058cfa'
        },
        accent_contrast: {
            hsl: {
                h: 0,
                s: 0,
                l: 100,
                hsl: '0, 0%, 100%'
            },
            hex: '#ffffff'
        },
        header_background: {
            hsl: {
                h: 207,
                s: 96,
                l: 25,
                hsl: '207, 96%, 25%'
            },
            hex: '#03467d'
        },
        header_text: {
            hsl: {
                h: 0,
                s: 0,
                l: 100,
                hsl: '0, 0%, 100%'
            },
            hex: '#ffffff'
        },
        header_accent: {
            hsl: {
                h: 55,
                s: 100,
                l: 50,
                hsl: '55, 100%, 50%'
            },
            hex: '#ffea00'
        }
    }
}

export let defaultDarkColors = {
    theme_type: 'dark',
    colors: {
        background: {
            hsl: {
                h: 223,
                s: 14,
                l: 15,
                hsl: '223, 14%, 15%'
            },
            hex: '#21242c'
        },
        background_alt: {
            hsl: {
                h: 223,
                s: 14,
                l: 10,
                hsl: '223, 14%, 10%'
            },
            hex: '#16181d'
        },
        background_alt2: {
            hsl: {
                h: 223,
                s: 14,
                l: 5,
                hsl: '223, 14%, 5%'
            },
            hex: '#0b0c0f'
        },
        text: {
            hsl: {
                h: 220,
                s: 100,
                l: 98,
                hsl: '220, 100%, 98%'
            },
            hex: '#f6f9ff'
        },
        accent: {
            hsl: {
                h: 207,
                s: 100,
                l: 69,
                hsl: '207, 100%, 69%'
            },
            hex: '#61b8ff'
        },
        accent_contrast: {
            hsl: {
                h: 0,
                s: 0,
                l: 100,
                hsl: '0, 0%, 100%'
            },
            hex: '#ffffff'
        },
        header_background: {
            hsl: {
                h: 223,
                s: 32,
                l: 52,
                hsl: '223, 32%, 52%'
            },
            hex: '#5d74ac'
        },
        header_text: {
            hsl: {
                h: 0,
                s: 0,
                l: 100,
                hsl: '0, 0%, 100%'
            },
            hex: '#ffffff'
        },
        header_accent: {
            hsl: {
                h: 39,
                s: 49,
                l: 59,
                hsl: '39, 49%, 59%'
            },
            hex: '#caa663'
        }
    }
}

export const useOrganisationStore = defineStore('organisationStore', {
    state: () => ({
        account: {
            theme_config: {
                version: 1,
                colors: defaultColors
            },
        },
        organisationPagePrefix: '\/with\/',
        adminURL: '',
        baseURL: '',
        customers: [],
        schedule: [],
        locations: {},
        purchaseTypes: {
            pass: {
                enabled: true,
                options: []
            },
            GENERAL_USERship: {
                enabled: true,
                options: []
            },

        },
        customerGroups: [],
        settings: {
            billing: {}
        }
    }),
    actions: {
        async getOrganisationData(organisationID) {
            if (!organisationID) {
                console.warn('no organisation ID received');
                return;
            }
            //await this.updateThemeConfig(defaultColors);
            const response = await useOrganisationAPI({endpoint: `getAccountBySlug`,  id: organisationID});
            if (response.data?.status) {
                this.account = response.data.account;
                this.base_URL = `${this.organisation_page_prefix}${organisationID}`;
                this.admin_URL = `${this.organisation_page_prefix}${organisationID}/admin`;
                // TODO: remove logo and theme hard wiring when properly set up
                this.account.logo_url = '/demo/logo.svg';
            }

            return true;
        },
        async getOrganisationSchedule({pageSize = 20, pageNumber = 0}) {
            // TODO: wire this up when the API is ready
            // console.log('getOrganisationSchedule pageSize, pageNumber', pageSize, pageNumber);

            let defaultdata = {
                title: 'Open Session',
                imageURL: '',
                availability: 'high',
                placesAvailable: 10,
                location: 'l1',
                durationInMinutes: 90,
                tags: ['open'],
                information: [
                    {
                        title: "Details",
                        contentHTML: "<p>An open session for practice and fun. Everyone is welcome.</p>"
                    },
                    {
                        title: "Instructions",
                        contentHTML: "<p>If you do not have a bat we can provide one for you. Don&rsquo;t worry about balls &ndash; we have plenty.</p>"
                    },
                ]
            };
            const date = new Date('2024-09-06T09:00:00.000Z');

            let counter = pageSize * pageNumber + 20;
            try {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json())
                .then(json => {
                    // console.log('json', json, (new Date()).toISOString());
                    let data = [
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                imageURL: '/demo/schedule-event-default-banner.jpg'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                                tags: ['advanced'],
                                availabilty: 'none'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                                imageURL: '/demo/schedule-event-default-banner.jpg',
                                availabilty: 'low'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                imageURL: '/demo/schedule-event-default.jpg',
                                availabilty: 'low'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                title: 'Open Session at EKVH',
                                availabilty: 'low',
                                location: 'l2',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                title: 'Late Night Session',
                                tags: ['open', 'late'],
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                availabilty: 'none'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setTime(date.getTime() + (60*60*1000)))).toISOString()}`
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players (long session)',
                                durationInMinutes: 120,
                                tags: ['league'],
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                availabilty: 'low'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                title: 'Late Night Session',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                availability: 'high',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                availabilty: 'medium'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                availabilty: 'medium'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                title: 'Late Night Session',
                                availabilty: 'medium'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                availabilty: 'none'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                availabilty: 'medium',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                availabilty: 'low'
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                title: 'Late Night Session',
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 365))).toISOString()}`,
                            },
                            {
                                ...defaultdata,
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                                tags: ['advanced']
                            },
                        ];
                        // new Intl.DateTimeFormat('default', { year: 'numeric',  weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit',  }).format(new Date(event.dateTime))
                    data.forEach(item => {
                        const d = new Date(item.dateTime)
                        const date = {
                            year: d.getFullYear(),
                            month: new Intl.DateTimeFormat('default', { month: 'long'}).format(d),
                            day: new Intl.DateTimeFormat('default', { day: 'numeric'}).format(d),
                            weekday: new Intl.DateTimeFormat('default', { weekday: 'long'}).format(d),
                            time: new Intl.DateTimeFormat('default', { timeStyle: 'short',  }).format(d)
                        }
                        item.date = date;
                    });
                    this.schedule = [...this.schedule, ...data ];

                    return true;
                });
            } catch (error) {
                return error
            }
        },
        async getOrganisationCustomers() {
            // TODO: remove test data when endpoint complete
            const response = await useOrganisationAPI({endpoint: `getOrganisationCustomers`});
            // const response = {};
            if (response.data?.users) {
            //if (response.usethistogettestdata?.users) {
                this.customers = response.data.users;
                return true;
            } else {
                this.customers = [
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697772",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
                        "first_name": "Andrew",
                        "last_name": "Chapman",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "info@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "ADMINISTRATOR",
                        "groups": [
                            {
                                name: "Three Plus",
                                id: 1
                            },
                            {
                                name: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                name: "League Player",
                                id: 3
                            }
                        ],
                        "bookings": [
                            {
                                title: "Open Session",
                                id: 1
                            },
                            {
                                title: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                title: "League Player",
                                id: 3
                            }
                        ]
                    },
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
                        "first_name": "Alessandro",
                        "last_name": "Montgomery",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "alessandro@communityttc.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Emanuella",
                        "last_name": "Chapman",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "ella@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697775",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a118",
                        "first_name": "Isabella",
                        "last_name": "Philomena-Jones",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "issie@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-ab99-430d-b51b-c73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
                        "first_name": "Andrea",
                        "last_name": "Bauer",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "abauer@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "ADMINISTRATOR",
                        "groups": [
                            {
                                name: "Three Plus",
                                id: 1
                            },
                            {
                                name: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                name: "League Player",
                                id: 3
                            }
                        ],
                        "bookings": [
                            {
                                title: "Open Session",
                                id: 1
                            },
                            {
                                title: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                title: "League Player",
                                id: 3
                            }
                        ]
                    },
                    {
                        "id": "52155d7d-gh16-430d-b51b-73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
                        "first_name": "Alex",
                        "last_name": "Montgomery-Burns",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "al@communityttc.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-yc11-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Yasmine",
                        "last_name": "Cunningham",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "cunningham@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-bb22-430d-b51b-c73985697775",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a118",
                        "first_name": "Stephanie",
                        "last_name": "Johnstone-Jones",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "issie@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-mn45-430d-b51b-c73985697772",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
                        "first_name": "Bartholemew",
                        "last_name": "Ng",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "bng@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER",
                        "groups": [
                            {
                                name: "Three Plus",
                                id: 1
                            },
                            {
                                name: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                name: "League Player",
                                id: 3
                            }
                        ],
                        "bookings": [
                            {
                                title: "Open Session",
                                id: 1
                            },
                            {
                                title: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                title: "League Player",
                                id: 3
                            }
                        ]
                    },
                    {
                        "id": "52155d7d-jc12-430d-b51b-c73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
                        "first_name": "Jonah",
                        "last_name": "Coleman",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "jcnotthatone@communityttc.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-lb99-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Larissa",
                        "last_name": "Barton",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "lb1999@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-dm99-430d-b51b-c73985697775",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a118",
                        "first_name": "Dillon",
                        "last_name": "Mcknight",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "dmme@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-gs77-430d-b51b-c73985697772",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
                        "first_name": "Gilbert",
                        "last_name": "Sutton",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "g_sut@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER",
                        "groups": [
                            {
                                name: "Three Plus",
                                id: 1
                            },
                            {
                                name: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                name: "League Player",
                                id: 3
                            }
                        ],
                        "bookings": [
                            {
                                title: "Open Session",
                                id: 1
                            },
                            {
                                title: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                title: "League Player",
                                id: 3
                            }
                        ]
                    },
                    {
                        "id": "52155d7d-sz44-430d-b51b-c73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
                        "first_name": "Shane",
                        "last_name": "Zhang",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "szhang@communityttc.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-ak44-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Abagail",
                        "last_name": "Kent",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "akent@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-sa33-430d-b51b-c73985697775",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a118",
                        "first_name": "Samir",
                        "last_name": "Archer",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "sarcher@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-eb16-430d-b51b-c73985697772",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
                        "first_name": "Eric",
                        "last_name": "Beck",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "ebeck@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER",
                        "groups": [
                            {
                                name: "Three Plus",
                                id: 1
                            },
                            {
                                name: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                name: "League Player",
                                id: 3
                            }
                        ],
                        "bookings": [
                            {
                                title: "Open Session",
                                id: 1
                            },
                            {
                                title: "Annual GENERAL_USERs",
                                id: 2
                            },
                            {
                                title: "League Player",
                                id: 3
                            }
                        ]
                    },
                    {
                        "id": "52155d7d-bs16-430d-b51b-c73985697773",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
                        "first_name": "Bailey",
                        "last_name": "Sullivan",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "bsull@communityttc.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-gw26-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Griffin",
                        "last_name": "Wagner",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "gwagner@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    },
                    {
                        "id": "52155d7d-fv36-430d-b51b-c73985697775",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a118",
                        "first_name": "Raphael",
                        "last_name": "Velazquez",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "rapha@communityttc.com",
                        "phone": "07123 1234133",
                        "created_dtm": 1720047009,
                        "updated_dtm": 1720047009,
                        "role_type": "GENERAL_USER"
                    }
                ];
                return true;
            }

            return response;
        },
        async getOrganisationUsers() {
            // TODO: remove test data when client details page complete
            const response = await useOrganisationAPI({endpoint: `getOrganisationUsers`});
            // const response = {};

            if (response.data?.status) {
                this.users = response.data.users;
                return true;
            }

            return response;
            // else {
            //     this.users = [
            //         {
            //             "id": "52155d7d-ff16-430d-b51b-c73985697772",
            //             "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a115",
            //             "first_name": "Andrew",
            //             "last_name": "Chapman",
            //             "country_code": "GB",
            //             "timezone": "Europe/London",
            //             "email_address": "info@communityttc.com",
            //             "phone": "07123 1234133",
            //             "created_dtm": 1720047009,
            //             "updated_dtm": 1720047009,
            //             "role_type": "ADMINISTRATOR",
            //             "groups": [
            //                 {
            //                     name: "Three Plus",
            //                     id: 1
            //                 },
            //                 {
            //                     name: "Annual GENERAL_USERs",
            //                     id: 2
            //                 },
            //                 {
            //                     name: "League Player",
            //                     id: 3
            //                 }
            //             ],
            //             "bookings": [
            //                 {
            //                     title: "Open Session",
            //                     id: 1
            //                 },
            //                 {
            //                     title: "Annual GENERAL_USERs",
            //                     id: 2
            //                 },
            //                 {
            //                     title: "League Player",
            //                     id: 3
            //                 }
            //             ]
            //         },
            //         {
            //             "id": "52155d7d-ff16-430d-b51b-c73985697773",
            //             "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a116",
            //             "first_name": "Stan",
            //             "last_name": "Ntiajuka",
            //             "country_code": "GB",
            //             "timezone": "Europe/London",
            //             "email_address": "stan.ntiajuka@gmail.com",
            //             "phone": "07122 1234133",
            //             "created_dtm": 1710057010,
            //             "updated_dtm": 1720047009,
            //             "role_type": "ADMINISTRATOR"
            //         },
            //         {
            //             "id": "52155d7d-ff16-430d-b51b-c73985697774",
            //             "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
            //             "first_name": "Pudsey",
            //             "last_name": "Paul",
            //             "country_code": "GB",
            //             "timezone": "Europe/London",
            //             "email_address": "pudseypaul@communityttc.com",
            //             "phone": "07111 1234133",
            //             "created_dtm": 1620047009,
            //             "updated_dtm": 1720047009,
            //             "role_type": "LEADER"
            //         }
            //     ];
            // }
        },
        async getOrganisationLocations() {
            // TODO: wire up when endpoint is ready
            //const response = await useOrganisationAPI({endpoint: `getOrganisationLocations`});
            const response = {
                data: {
                    locations: {
                        l1: {
                            name: "The Chapel Allerton Methodist Centre",
                            formatted_address: "Town Street, Chapel Allerton<br>Leeds LS7 4NB",
                            description: "<p>We are in the basement - the stairs going down are on the right hand side of the outside of the building.</p><p>Please note that toilets are only available after 8pm on a Tuesday and Thursday night.<p>",
                            url: "https://maps.app.goo.gl/yCQWvLQvkqsY7f5L8",
                            latLong: [53.8289522,-1.5371502],
                            address: {
                                address_line_1: "Town Street",
                                address_line_2: "",
                                suburb: "Chapel Allerton",
                                state: "Leeds",
                                postcode: "LS7 4NB"
                            }
                        },
                        l2: {
                            name: "East Keswick Village Hall",
                            formatted_address: "School Lane, East Keswick<br>Leeds LS17 9DA",
                            description: "<p>The village of East Keswick is found just off the A58 Leeds-Wetherby road. The A1 is 3 miles away at the Boston Spa exit.</p><p>The nearest main line railway station is Leeds.</p><p>East Keswick is serviced by bus route X99 which provide an hourly service from Leeds and Wetherby and by service 923 which provides a two hourly service daytimes to Wetherby and Otley. Full details on all bus times from www.wymetro.com",
                            url: "https://maps.app.goo.gl/ZG66rNfVVeGsTwKV7",
                            latLong: [53.8937194,-1.4522842],
                            address: {
                                address_line_1: "School Lane",
                                address_line_2: "",
                                suburb: "East Keswick",
                                state: "Leeds",
                                postcode: "LS17 9DA"
                            }
                        }
                    }
                }
            }

            if (response.data?.locations) {
                this.locations = response.data.locations;
            };

            return true;
        },
        async getOrganisationBillingSettings() {
            // TODO: remove test data when client details page complete
            const response = await useOrganisationAPI({endpoint: `getOrganisationBillingSettings`});

            // console.log('response', response);

            if (response.data?.billing_settings) {
                this.settings.billing = response.data.billing_settings;
                return true;
            }

            return response;
        },
        async updateOrganisationBillingSettings(data) {
            const response = await useOrganisationAPI({endpoint: `updateOrganisationBillingSettings`, data});

            if (response.data?.billing_settings) {
                this.settings.billing = response.data.billing_settings;
                return;
            }
            return response;
        },
        async updateThemeConfig(data) {
            // console.log('update theme config with ', data);
            const response = await useOrganisationAPI({endpoint: `updateThemeConfig`, data});
            // console.log('original this.account.theme_config', this.account.theme_config);

            if (response.data?.theme_config) {
                // console.log('response.data.theme_config', response.data.theme_config);

                this.account.theme_config = response.data.theme_config;
                // console.log('new this.account.theme_config', this.account.theme_config);

                return;
            }
            return response;
        },
        async getCustomerGroupsList() {
            // console.log('get customer groups');
            const response = await useOrganisationAPI({endpoint: `getCustomerGroupsList`});
            // console.log('get customer groups response', response);
            if (response.data?.status) {
                this.customerGroups = response.data.customer_groups;
                return true;
            }
            return response;
        },
        async createCustomerGroup({data}) {
            // console.log('create customer group');
            const response = await useOrganisationAPI({endpoint: `createCustomerGroup`, data});
            console.log('create customer group', response);
            if (response.data?.status) {
                await this.getCustomerGroupsList();
            }
            return response;
        },
        async deleteCustomerGroup({id}) {
            if (id) {
                const response = await useOrganisationAPI({endpoint: `deleteCustomerGroup`, id});
                if (response.data?.status) {
                    await this.getCustomerGroupsList();
                    return true;
                }
            }
            return response;
        },
        async updateCustomerGroup({id, data}) {
            const response = await useOrganisationAPI({endpoint: `updateCustomerGroup`, id, data});
            if (response.data?.status) {
                this.getCustomerGroupsList();
                return true;
            }
            return response;
        },
        async getCustomerGroupCustomers({id}) {
            const response = await useOrganisationAPI({endpoint: `getCustomerGroupCustomers`, id});

            if (response.data?.status) {
                const index = this.customerGroups.findIndex((group => group.id == id));
                this.customerGroups[index].customers = response.data.users;
                return response.data.users;
            }

            return response;
        },
        async updateCustomerGroupCustomers({id, data}) {
            const response = await useOrganisationAPI({endpoint: `updateCustomerGroupCustomers`, id, data});
            if (response?.data?.status) {
                const index = this.customerGroups.findIndex((group => group.id == id));
                this.customerGroups[index].customers = response.data.users;
                // return response.data.users;
                // this.getCustomerGroupsList();

                return true;
            }
            return response;
        },
    }
})
