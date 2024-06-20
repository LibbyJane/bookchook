<template>
    <article class="app-calendar container">
        <section>
            <h1>Calendar</h1>
        </section>
        <section>
            <h1>Detail</h1>
        </section>
    </article>
</template>

<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import { useBookerStore } from '~/stores/booker.js';

    import CalendarIcon from '@/components/icons/calendar.vue';
    import TicketIcon from '@/components/icons/ticket.vue';
    import UserIcon from '@/components/icons/user.vue';

    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const bookerStore = useBookerStore();
</script>

<style lang="scss">
    .app-calendar {
        display: grid;
        gap: var(--space-med);
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: auto;
    }
</style>