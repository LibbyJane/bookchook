<template>
    <article class="app-schedule">
        <aside class="app-schedule__filters container">
            <h1>Filters</h1>
        </aside>
        <section class="container">
            <h1>Schedule</h1>
            <table v-if="organisationStore.schedule" class="schedule" cellspacing="0">
                <template v-for="event in organisationStore.schedule" >
                    <tr v-if="rowIsHeader(event.date.month, event.date.year)" class="schedule__header" >
                        <th :colspan="colspan">
                            {{ getScheduleHeaderText(event.date.month, event.date.year) }}
                        </th>
                    </tr>
                    <!-- <tr class="schedule__header" v-if="newYear(event.date.year)">
                        <th :colspan="colspan">
                            {{ event.date.month }} {{ event.date.year }}
                        </th>
                    </tr>
                    <tr class="schedule__header" v-else-if="newMonth(event.date.month)">
                        <th :colspan="colspan">
                            {{ event.date.month }}
                        </th>
                    </tr> -->

                    <tr v-else  :class="`schedule__item availability-${event.availabilty} ${getSelectedClass(event.id)}`"  v-on:click="showDetail(event.id)">
                        <template v-if="newDay(event.date.day)">
                            <td>
                                <span class="schedule__day">{{ event.date.day }}</span>
                            </td>
                            <td>
                                <span class="schedule__weekday--short">
                                    {{ event.date.weekdayShort }}
                                </span>
                                <span class="schedule__weekday--long">
                                    {{ event.date.weekday }}
                                </span>
                            </td>
                        </template>
                        <template v-else>
                            <td></td>
                            <td></td>
                        </template>

                        <td class="schedule__time">
                            {{ new Intl.DateTimeFormat('default', { timeStyle: 'short',  }).format(new Date(event.dateTime)) }}
                        </td>
                        <td class="schedule__title">
                            {{ event.title }}
                        </td>
                        <td>
                            <span class="schedule__availability-indicator" :title="`Availablity: ${event.availabilty}`">

                            </span>
                        </td>
                    </tr>
                </template>
            </table>

            <p v-if="!organisationStore.schedule" >
                {{ organisationStore.data.organisation.name }} has no scheduled events to display.
            </p>
        </section>
        <AppEventDetail v-if="selectedEventID" :eventID="selectedEventID" />
    </article>
</template>

<script setup>
    import { ref } from 'vue';
    import { useOrganisationStore } from '@/stores/organisation';
    import { useBookerStore } from '@/stores/booker';
    import { formatDate } from '@/composables/formatDate';

    import CalendarIcon from '@/components/icons/calendar.vue';
    import TicketIcon from '@/components/icons/ticket.vue';
    import UserIcon from '@/components/icons/user.vue';

    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const bookerStore = useBookerStore();

    let currentYear;
    let currentMonth;
    let currentDay;

    const scheduleDataPageSize = 20;
    const scheduleDataPageNumber = ref(0);

    const colspan = 5;

    await useAsyncData('schedule', () => organisationStore.getOrganisationSchedule(scheduleDataPageSize, scheduleDataPageNumber.value));

    const selectedEventID = ref(-1);


    function showDetail(eventID) {
        console.log('show detail for', eventID);
        selectedEventID.value = eventID;
    }

    function getSelectedClass(eventID) {
        if (eventID == selectedEventID.value) {
            return "selected";
        }

        return "";
    }


    function rowIsHeader(month, year) {
        console.log('rowIsHeader item month, year', month, year);
        console.log('rowIsHeader curent month, year', currentMonth, currentMonth);
        console.log('new month or new year?', month != currentMonth || year != currentYear);
        return month != currentMonth || year != currentYear;
    }

    function getScheduleHeaderText(month, year) {
        let returnValue = month;

        if (year != currentYear) {
            returnValue = `${month} ${year}`;

            currentYear = year;
            currentMonth = month;
            currentDay = null;
        }

        currentMonth = month;
        return returnValue;
    }

    function newDay(day) {
        if (day != currentDay) {
            currentDay = day;
            return true;
        }
    }

</script>

<style lang="scss">
    .app-schedule {
        display: grid;
        margin-bottom: auto;

        @include breakpoint(lg) {
            grid-template-columns: minmax(max-content, 20rem) 1fr 40vw;
        }
    }

    .app-schedule__filters {
        background-color: var(--c-background);
        position: sticky;
            top: 5rem;
            left: 0;
        z-index: var(--zi-base);
    }

    .schedule {
        font-size: var(--p-sm);

        @include breakpoint(med) {
            font-size: var(--p);
        }

        th,
        td {
            padding: var(--space-xxxs);
            vertical-align: baseline;

            @include breakpoint(med) {
                padding: var(--space-xs);
            }

            // &:first-child {
            //     padding-inline-start: 0;
            // }

            // &:last-child {
            //     padding-inline-end: 0;
            // }
        }
    }

    .schedule__header {
        position: relative;

        &::after {
            //border-bottom: thin solid var(--c-accent);
            background: var(--c-text);
            border-radius: var(--space) var(--space) 0 0;
            content: '';
            opacity: 0.05;
            position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            z-index: -1;
        }

        th {
            font-size: var(--h5);
            text-align: start;
        }
    }

    .schedule__item {
        cursor: pointer;
        position: relative;
        z-index: 1;

        &:hover,
        &:focus,
        &.selected {
            background-color: transparent;
            &::before {
                opacity: 0.1;
            }
        }

        &.selected {
            color: var(--c-accent-contrast);

            &::before {
                opacity: 0.8;
            }
        }

        &:has(+.schedule__header) {
            &::after {
                content: none;
            }

            td {
                padding-bottom: var(--space);
            }
        }

        &::before {
            background: var(--c-accent);
            content: '';
            opacity: 0;
            position: absolute;
                inset: 0;
            z-index: -1;
        }

        &::after {
            border-bottom: thin solid var(--c-text);
            content: '';
            opacity: 0.2;
            position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
        }
        &.availability-none {
            filter: grayscale(1);
            opacity: 0.7;
        }
    }

    .schedule__day {
        aspect-ratio: 1/1;
        display: flex;
            align-items: center;
            justify-content: center;
        font-weight: bold;
        line-height: 1;
        padding: var(--space-xxs);
        position: relative;
        z-index: 1;

        &::before {
            background-color: var(--c-text);
            border-radius: 99em;
            content: '';
            opacity: 0.1;
            position: absolute;
                inset: 0;
                z-index: 0;

        }
    }

    .schedule__weekday--short {
        @include breakpoint(lg) {
            display: none;
            visibility: hidden;
        }
    }

    .schedule__weekday--long {
        display: none;
        visibility: hidden;

        @include breakpoint(lg) {
            display: inline;
            visibility: visible;
        }
    }

    .schedule__time.schedule__time {
        padding-right: var(--space-xs);
        white-space: nowrap;
    }

    .schedule__availability-indicator {
        aspect-ratio: 1 / 1;
        border-radius: 99em;
        display: block;
        width: 10px;
        border: 2px solid var(--c-accent-contrast);
        // height: var(--space-sm);

        .availability-high & {
            background-color:  rgb(103, 206, 103);
        }

        .availability-medium & {
            background-color: orange;
        }

        .availability-low & {
            background-color: orangered;
        }
    }

    .schedule__title {
        font-weight: bolder;
    }
</style>