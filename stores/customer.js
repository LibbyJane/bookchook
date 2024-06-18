import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customerStore', {
    state: () => ({
        customerData: {
            userID: '',
            name: '',
            address: '',
            phone: '',
            email: '',
            URL: ''
        },
        theme: {
            colors: {

            }
        }
    }),
    actions: {
        async getCustomerData(customerID) {
            try {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json())
                .then(json => {
                    console.log(customerID, json);
                    this.customerData = {
                        "userId": 1,
                        "name": "School of Knock",
                        "address": `Methodist Center<br>Chapel Allerton<br>Leeds LS7 7SW`,
                        "phone": `0113 242 1550`,
                        "email": `info@theschoolofknock.com`,
                        "URL": `https://theschoolofknock.com`
                    }
                });
            } catch (error) {
                return error
            }
        },
    }
})