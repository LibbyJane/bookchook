<template>
    <aside class="container main-content__sidebar">
        <nav class="admin-nav sidebar sticky">
            <ul class="admin-nav__list">
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/`" class="admin-nav__item" title="Admin dashboard">
                        <HomeIcon />
                        <span class="admin-nav__text">Dashboard</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/schedule`" class="admin-nav__item" title="Schedule">
                        <CalendarIcon />
                        <span class="admin-nav__text">Schedule</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/bookings`" class="admin-nav__item" title="Bookings">
                        <TicketsIcon />
                        <span class="admin-nav__text">Bookings</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/clients`" class="admin-nav__item" title="Clients">
                        <UsersIcon />
                        <span class="admin-nav__text">Clients</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/locations`" class="admin-nav__item" title="Locations">
                        <MapPinIcon />
                        <span class="admin-nav__text">Locations</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/team`" class="admin-nav__item" title="Team">
                        <IdBadge />
                        <span class="admin-nav__text">Team</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}/preferences`" class="admin-nav__item" title="Preferences">
                        <CogIcon />
                        <span class="admin-nav__text">Preferences</span>
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
    import MapPinIcon from '@/components/icons/map-pin.vue';
    import IdBadge from '@/components/icons/id-badge-vertical.vue';

    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationData());
</script>

<style lang="scss">
    .admin-nav__list {
        display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: var(---space-sm);
        list-style: none;
        margin: 0 auto;
        padding: 0;

        @include breakpoint(lg) {
            flex-direction: column;
            align-items: start;
            margin: auto;
        }

        li {
            margin: 0;
            padding: 0 0 var(--space);
        }

        a {
            border: none;
            display: grid;
                grid-template-columns: var(--icon-size-med) 1fr;
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
                max-height: var(--icon-size-med);
                max-width: var(--icon-size-med);
                margin: auto;
                transition: inherit;
            }
        }

        .active {
            color: var(--c-accent);
        }
    }

    .admin-nav__text {
        display: none;

        @include breakpoint(lg) {
            display: inline;
        }
    }
</style>