import { useOrganisationStore } from '@/stores/organisation';

export async function getUsersForSelect($pinia, initial) {
    const organisationStore = useOrganisationStore($pinia);
    await organisationStore.getOrganisationCustomers();

    let users = [];

    organisationStore.customers.forEach(customer => {
        users.push({
            value: customer.id,
            text: `${customer.first_name} ${customer.last_name}`
        });
    });

    return users;
}
