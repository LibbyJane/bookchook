<template>
    <aside class="container main-content__sidebar">
        <nav class="admin-nav sidebar">
            <ul class="admin-nav__list">
                <li>
                    <a class="admin-nav__item" href="/dashboard">
                        <HomeIcon />
                        Dashboard
                    </a>
                </li>
                <li>
                    <a class="admin-nav__item" href="/schedule">
                        <CalendarIcon />
                        Schedule
                    </a>
                </li>
                <li>
                    <a class="admin-nav__item" href="/bookings">
                        <TicketsIcon />
                        Bookings
                    </a>
                </li>
                <li>
                    <a class="admin-nav__item" href="/bookers">
                        <UsersIcon />
                        Clients
                    </a>
                </li>
                <!-- <li>
                    <div class="admin-nav__item">
                        <span>Payment Options</span>
                        <CaretIcon class="icon--xs" alt="View" />
                    </div>

                    <ul class="admin-nav__dropdown">
                        <li><a href="/bookings/class">Passes</a></li>
                        <li><a href="/bookings/course">Memberships</a></li>
                        <li><a href="/bookings/virtual">Client Groups</a></li>
                    </ul>
                </li> -->
                <li>
                    <a class="admin-nav__item" href="/pricing">
                        <CogIcon />
                        Preferences
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
    import CogIcon from '@/components/icons/cog.vue';
    import CalendarIcon from '@/components/icons/calendar.vue';
    // import CaretIcon from '@/components/icons/caret-down.vue';
    import HomeIcon from '@/components/icons/home.vue';
    import TicketsIcon from '@/components/icons/tickets.vue';
    import UsersIcon from '@/components/icons/users.vue';

</script>

<style lang="scss">
    .admin-nav {
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        a {
            border: none;
            text-decoration: none;
            transition: color var(--transition-fast) var(--transition-type-motionless);

            &:hover,
            &:focus {
                border: none;
                text-decoration: none;
            }

            .icon {
                transition: inherit;
            }
        }
    }
</style>