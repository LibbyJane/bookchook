import { useOrganisationStore } from '@/stores/organisation';

export async function getUsersForSelect($pinia, initial) {
    const organisationStore = useOrganisationStore($pinia);
    await organisationStore.getOrganisationCustomers();

    let users = [];

    organisationStore.customers.forEach(customer => {
        users.push({
            value: customer.id,
            label: `${customer.first_name} ${customer.last_name}`,
            disabled: false,
            hidden: false
        });
    });

    return users;
}
