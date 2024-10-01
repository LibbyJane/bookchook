<template>
    <aside class="container main-content__sidebar">
        <nav class="admin-nav sidebar sticky">
            <ul class="admin-nav__list">
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}dashboard`" class="admin-nav__item" title="Admin dashboard">
                        <Home />
                        <span class="admin-nav__text">Dashboard {{ organisationStore.adminURL }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}schedule`" class="admin-nav__item" title="Schedule">
                        <Calendar />
                        <span class="admin-nav__text">Schedule</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}bookings`" class="admin-nav__item" title="Bookings">
                        <HandCard />
                        <span class="admin-nav__text">Bookings</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}customers`" class="admin-nav__item" title="Customers">
                        <Group />
                        <span class="admin-nav__text">Customers</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}payments`" class="admin-nav__item" title="Payments">
                        <AppleWallet />
                        <span class="admin-nav__text">Payment Options</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}customer-groups`" class="admin-nav__item" title="Customer Groups">
                        <Community />
                        <span class="admin-nav__text">Customer Groups</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}locations`" class="admin-nav__item" title="Locations">
                        <MapPin />
                        <span class="admin-nav__text">Locations</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}financials`" class="admin-nav__item" title="Financials">
                        <Coins />
                        <span class="admin-nav__text">Financials</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`${organisationStore.adminURL}account`" class="admin-nav__item" title="Account settings">
                        <Settings />
                        <span class="admin-nav__text">Account</span>
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import { Home, Community, Settings, MapPin, Group, Calendar, Coins, HandCard, AppleWallet} from '@iconoir/vue';

    const organisationStore = useOrganisationStore();
    await useAsyncData(() => organisationStore.getOrganisationData(useRoute().params?.organisation[0]));
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

            #{$hover} {
                border: none;
                color: currentColor;
                text-decoration: none;

                .icon,
                svg {
                    color: var(--c-accent);
                }
            }

            .icon,
            svg {
                max-height: var(--icon-size-med);
                max-width: var(--icon-size-med);
                margin: auto;
                transition: inherit;
            }
        }

        .active {
            &,
            &:focus {
               color: var(--c-accent);
            }
        }
    }

    .admin-nav__text {
        display: none;

        @include breakpoint(lg) {
            display: inline;
        }
    }
</style>