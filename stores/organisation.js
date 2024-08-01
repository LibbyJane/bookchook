import { useOrganisationAPI } from '@/api/useOrganisationAPI';

export const useOrganisationStore = defineStore('organisationStore', {
    state: () => ({
        account: {
            theme_config: {
                colors: {
                    background: '',
                    text: '',
                    accent: '',
                    accent_contrast: '',
                    header_background: '',
                    header_text: '',
                    header_accent: ''
                }
            },
        },
        organisation_page_prefix: '\/with\/',
        admin_URL: '',
        base_URL: '',
        clients: [],
        schedule: [],
        locations: {},
        purchase_types: {
            passes: true,
            membership: true
        },
        users: [],
        settings: {
            billing: {}
        }
    }),
    actions: {
        async getOrganisationData(organisationID) {
            const response = await useOrganisationAPI({endpoint: `getAccountBySlug`,  id: organisationID});
            console.log('account', this.account);
            this.account = response.data.account;
            if (response.data.status) {
                this.account = response.data.account;
                this.base_URL = `${this.organisation_page_prefix}${organisationID}`;
                this.admin_URL = `${this.organisation_page_prefix}${organisationID}/admin`;
                // TODO: remove logo and theme hard wiring when properly set up
                this.account.logo_url = '/demo/logo.svg';

                // TODO: make sure the HSL values are taken from whichever color picker plugin
                this.account.theme_config.colors = {
                    headerBackground: '207, 96%, 25%',
                    headerText:  '0, 0%, 100%',
                    headerAccent: '55, 100%, 50%',
                    text: '208, 100%, 18%',
                    background: '207, 25%, 97%',
                    accent: '207, 96%, 50%',
                    accentContrast: '0, 0%, 100%',
                };
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
            const date = new Date('2024-07-05T09:00:00.000Z');

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
        async getOrganisationClients() {
            // TODO: remove test data when endpoint complete
            // const response = await useOrganisationAPI({endpoint: `getOrganisationUsers`});
            const response = {};

            if (response.data?.clients) {
            //if (response.usethistogettestdata?.users) {
                this.clients = response.data.clients;
            } else {
                this.clients = [
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
                                name: "Annual Members",
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
                                title: "Annual Members",
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
                        "role_type": "MEMBER"
                    },
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Emanuella",
                        "last_name": "Persephone",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "persephone@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "MEMBER"
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
                        "role_type": "MEMBER"
                    },
                ];
            }
        },
        async getOrganisationUsers() {
            // TODO: remove test data when client details page complete
            // const response = await useOrganisationAPI({endpoint: `getOrganisationUsers`});
            const response = {};

            if (response.data?.users) {
            //if (response.usethistogettestdata?.users) {
                this.users = response.data.users;
            } else {
                this.users = [
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
                                name: "Annual Members",
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
                                title: "Annual Members",
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
                        "first_name": "Stan",
                        "last_name": "Ntiajuka",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "stan.ntiajuka@gmail.com",
                        "phone": "07122 1234133",
                        "created_dtm": 1710057010,
                        "updated_dtm": 1720047009,
                        "role_type": "ADMINISTRATOR"
                    },
                    {
                        "id": "52155d7d-ff16-430d-b51b-c73985697774",
                        "account_id": "11d1c59b-38f4-4cce-ba8b-6e8af2d2a117",
                        "first_name": "Pudsey",
                        "last_name": "Paul",
                        "country_code": "GB",
                        "timezone": "Europe/London",
                        "email_address": "pudseypaul@communityttc.com",
                        "phone": "07111 1234133",
                        "created_dtm": 1620047009,
                        "updated_dtm": 1720047009,
                        "role_type": "LEADER"
                    }
                ];
            }
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
        },
        async getOrganisationBillingSettings() {
            // TODO: remove test data when client details page complete
            const response = await useOrganisationAPI({endpoint: `getOrganisationBillingSettings`});

            console.log('response', response);

            if (response.data?.billing_settings) {
                this.settings.billing = response.data.billing_settings;
            }
        }
    }
})
