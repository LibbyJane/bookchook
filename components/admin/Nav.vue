<template>
    <aside class="container main-content__sidebar">
        <nav class="admin-nav sidebar sticky">
            <ul class="admin-nav__list">
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/`" class="admin-nav__item" >
                        <HomeIcon />
                        Dashboard
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/schedule`" class="admin-nav__item" >
                        <CalendarIcon />
                        Schedule
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/bookings`" class="admin-nav__item" >
                        <TicketsIcon />
                        Bookings
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/clients`" class="admin-nav__item" >
                        <UsersIcon />
                        Clients
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/preferences`" class="admin-nav__item" >
                        <CogIcon />
                        Preferences
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import CogIcon from '@/components/icons/cog.vue';
    import CalendarIcon from '@/components/icons/calendar.vue';
    import HomeIcon from '@/components/icons/home.vue';
    import TicketsIcon from '@/components/icons/tickets.vue';
    import UsersIcon from '@/components/icons/users.vue';


    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationData());
</script>

<style lang="scss">
    .admin-nav {
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        li {
            margin: 0;
            padding: 0 0 var(--space);
        }

        a {
            border: none;
            display: grid;
                grid-template-columns: 2rem 1fr;
                gap: var(--space-sm);
                justify-content: start;
                align-items: center;
            text-decoration: none;
            transition: color var(--transition-fast) var(--transition-type-motionless);

            &:hover,
            &:focus {
                border: none;
                text-decoration: none;
            }

            .icon {
                margin: auto;
                transition: inherit;
            }
        }

        .active {
            color: var(--c-accent);
        }
    }
</style>