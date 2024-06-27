import { useOrganisationAPI } from '@/api/useOrganisationAPI';

export const useOrganisationStore = defineStore('organisationStore', {
    state: () => ({
        account: {
            theme_config: {
                colors: {}
            }
        },
        schedule: [],
        locations: {
            l1: {
                name: "The Chapel Allerton Methodist Centre",
                address: "Town Street, Chapel Allerton, Leeds, LS7 4NB",
                formattedAddress: "Town Street, Chapel Allerton<br>Leeds LS7 4NB",
                notes: "<p>We are in the basement - the stairs going down are on the right hand side of the outside of the building.</p><p>Please note that toilets are only available after 8pm on a Tuesday and Thursday night.<p>",
                URL: "https://www.google.com/maps/place/Chapel+Allerton+Methodist+Church/@53.8289522,-1.5397305,17z/data=!3m1!4b1!4m6!3m5!1s0x48795bef204432ef:0xbf355ea3ba294e83!8m2!3d53.8289522!4d-1.5371502!16s%2Fg%2F1wbrx8_z?entry=ttu"
            },
            l2: {
                name: "East Keswick Village Hall",
                address: "School Lane, East Keswick, Leeds LS17 9DA",
                formattedAddress: "School Lane, East Keswick<br>Leeds LS17 9DA",
                notes: "<p>The village of East Keswick is found just off the A58 Leeds-Wetherby road. The A1 is 3 miles away at the Boston Spa exit.</p><p>The nearest main line railway station is Leeds.</p><p>East Keswick is serviced by bus route X99 which provide an hourly service from Leeds and Wetherby and by service 923 which provides a two hourly service daytimes to Wetherby and Otley. Full details on all bus times from www.wymetro.com",
                URL: "https://www.google.com/maps/place/East+Keswick+Village+Hall/@53.8937194,-1.4522842,17z/data=!3m1!4b1!4m6!3m5!1s0x487945531de2f023:0x8c781ea7aaf07104!8m2!3d53.8937194!4d-1.4497039!16s%2Fg%2F11b5ph_kr3?entry=ttu"
            }
        },
        purchaseTypes: {
            passes: true,
            membership: true
        },
    }),
    actions: {
        async getOrganisationData(organisationID) {
            console.log('getOrganisationData', organisationID);
            const response = await useOrganisationAPI({endpoint: `getAccountBySlug`,  id: organisationID});
            this.account = response.data.account;
            if (response.data.status) {
                this.account = response.data.account;
                // TODO: remove logo and theme hard wiring when properly set up
                this.account.logo_url = '/demo/logo.svg';
                this.account.theme_config.colors = {
                    headerBackground: 'hsl(207, 96%, 25%)',
                    headerText:  'hsl(0, 0%, 100%)',
                    headerAccent: 'hsl(55, 100%, 50%)',
                    text: 'hsl(208, 100%, 18%)',
                    background: 'hsl(207, 25%, 97%)',
                    accent: 'hsl(207, 96%, 50%)',
                    accentContrast: 'hsl(0, 0%, 100%)',
                };
            }
        },
        async getOrganisationSchedule(pageSize = 20, pageNumber = 0) {
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
            const date = new Date('2024-06-28T09:00:00.000Z');

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
    }
})
