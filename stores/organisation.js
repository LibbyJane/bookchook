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
                colors: {},
                logoURL: ''
            },

        },
        schedule: [],
        locations: {
            l1: {
                name: "The Chapel Allerton Methodist Centre",
                address: "The Chapel Allerton Methodist Centre, Town Street, Chapel Allerton, Leeds, LS7 4NB",
                notes: "<p>We are in the basement - the stairs going down are on the right hand side of the outside of the building.</p><p>Please note that toilets are only available after 8pm on a Tuesday and Thursday night.<p>",
                URL: "https://www.google.com/maps/place/Chapel+Allerton+Methodist+Church/@53.8289522,-1.5397305,17z/data=!3m1!4b1!4m6!3m5!1s0x48795bef204432ef:0xbf355ea3ba294e83!8m2!3d53.8289522!4d-1.5371502!16s%2Fg%2F1wbrx8_z?entry=ttu"
            },
            l2: {
                name: "East Keswick Village Hall",
                address: "School Lane, East Keswick, Leeds LS17 9DA",
                notes: "<p>The village of East Keswick is found just off the A58 Leeds-Wetherby road. The A1 is 3 miles away at the Boston Spa exit.</p><p>The nearest main line railway station is Leeds.</p><p>East Keswick is serviced by bus route X99 which provide an hourly service from Leeds and Wetherby and by service 923 which provides a two hourly service daytimes to Wetherby and Otley. Full details on all bus times from www.wymetro.com",
                URL: "https://www.google.com/maps/place/East+Keswick+Village+Hall/@53.8937194,-1.4522842,17z/data=!3m1!4b1!4m6!3m5!1s0x487945531de2f023:0x8c781ea7aaf07104!8m2!3d53.8937194!4d-1.4497039!16s%2Fg%2F11b5ph_kr3?entry=ttu"
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
                                headerBackground: 'hsl(207, 96%, 25%)',
                                headerText:  'hsl(0, 0%, 100%)',
                                headerAccent: 'hsl(55, 100%, 50%)',
                                text: 'hsl(208, 100%, 18%)',
                                background: 'hsl(207, 25%, 97%)',
                                accent: 'hsl(207, 96%, 50%)',
                                accentContrast: 'hsl(0, 0%, 100%)',
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
        async getOrganisationSchedule(pageSize = 20, pageNumber = 0) {
            console.log('getOrganisationSchedule pageSize, pageNumber', pageSize, pageNumber);
            const date = new Date('2024-06-21T09:00:00.000Z');
            let counter = pageSize * pageNumber;
            try {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json())
                .then(json => {
                    console.log('json', json, (new Date()).toISOString());
                    let data = [
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                title: 'Open Session',
                                availabilty: 20,
                                location: 'l1',
                                tags: ['open']
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                                availabilty: 'high',
                                location: 'l1',
                                tags: ['advanced'],
                                availabilty: 'none'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                                tags: ['open'],
                                availabilty: 'low'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'low'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Late Night Session',
                                availabilty: 'high'
                            }, {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'none'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'high',
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'low'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Late Night Session',
                                availabilty: 'high'
                            },{
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                title: 'Open Session',
                                availabilty: 20,
                                location: 'l1',
                                tags: ['open']
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                                availabilty: 'high',
                                location: 'l1',
                                tags: ['advanced']
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                                tags: ['open']
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'medium'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'medium'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Late Night Session',
                                availabilty: 'medium'
                            }, {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'none'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'medium',
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 1))).toISOString()}`,
                                category: 'League',
                                title: 'Sunday Sessions - League Players',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'low'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 2))).toISOString()}`,
                                category: 'Open',
                                title: 'Open Session',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (0.75*60*60*1000))).toISOString()}`,
                                category: 'Open',
                                title: 'Late Night Session',
                                availabilty: 'high'
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.setDate(date.getDate() + 365))).toISOString()}`,
                                title: 'Open Session',
                                availabilty: 20,
                                location: 'l1',
                                tags: ['open']
                            },
                            {
                                id: `${counter++}`,
                                dateTime: `${(new Date(date.getTime() + (60*60*1000))).toISOString()}`,
                                title: 'Advanced Session',
                                availabilty: 'high',
                                location: 'l1',
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
                            weekdayShort: new Intl.DateTimeFormat('default', { weekday: 'short'}).format(d),
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


// 25	Tue	7:45pm - 10:30pm	Open Session	1 / 14
// 27	Thu	7:45pm - 10:30pm	Open Session	0 / 14
// 8:30pm - 10:30pm	Thursday Late Night Session	0 / 4
// 29	Sat	9am - 11am	Open Session	1 / 14
// 11am - 1pm	Open Session	0 / 14
// 30	Sun	2pm - 5pm	Sunday Sessions - League Players	0 / 12
// July
// 2	Tue	7:45pm - 10:30pm	Open Session	1 / 14
// 4	Thu	7:45pm - 10:30pm	Open Session	0 / 14
// 8:30pm - 10:30pm	Thursday Late Night Session	0 / 4
// 6	Sat	9am - 11am	Open Session	0 / 14
// 11am - 1pm	Open Session	0 / 14
// 7	Sun	2pm - 5pm	Sunday Sessions - League Players	0 / 12
// 9	Tue	7:45pm - 10:30pm	Open Session	0 / 14
// 11	Thu	7:45pm - 10:30pm	Open Session	0 / 14
// 8:30pm - 10:30pm	Thursday Late Night Session	0 / 4
// 13	Sat	9am - 11am	Open Session	0 / 14
// 11am - 1pm	Open Session	0 / 14

