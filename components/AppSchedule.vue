<template>
    <article class="app-schedule">
        <aside class="app-schedule__filters container">
            <h1>Filters</h1>
        </aside>
        <section class="container">
            <h1>Schedule</h1>
            <table v-if="organisationStore.schedule" class="schedule" cellspacing="0">
                <template v-for="event in organisationStore.schedule">
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
                    <tr v-if="newDay(event.date.day)" class="schedule__subheader" >
                        <td>
                            <span class="schedule__day">{{ event.date.day }}</span>
                        </td>
                        <td class="schedule__weekday">
                            <!-- <span class="schedule__weekday--short">
                                {{ event.date.weekdayShort }}
                            </span>
                            <span class="schedule__weekday--long">
                                {{ event.date.weekday }}
                            </span> -->
                            {{ event.date.weekday }}
                        </td>
                    </tr>

                    <tr :class="`schedule__item availability-${event.availabilty} ${getSelectedClass(event.id)}`"  v-on:click="showDetail(event.id)" :data-booking-status="getBookingStatus(event.id, event.availabilty)">
                        <td class="schedule__item--time">
                            {{ new Intl.DateTimeFormat('default', { timeStyle: 'short',  }).format(new Date(event.dateTime)) }}
                        </td>
                        <td class="schedule__item--title">
                            {{ event.title }}
                        </td>
                        <td class="schedule__item--status">
                            <Pill v-if="getBookingStatus(event.id) === 'booked'" cssClass="success">
                                <CheckIcon cssClass="icon--sm" />
                                Booked
                            </Pill>

                            <Pill v-else-if="getBookingStatus(event.id, event.availabilty) === 'wait list'" cssClass="info">
                                On Waiting List
                            </Pill>

                            <Pill v-else-if="event.availabilty === 'none'">
                                Sold Out
                            </Pill>
                        </td>
                            <td class="schedule__item--availability">
                                <span class="schedule__item--availability-indicator" :title="`Availablity: ${event.availabilty}`">

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
    import Pill from '@/components/interface/pill.vue';
    import CheckIcon from '@/components/icons/check.vue';

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

    function getBookingStatus(eventID, availability) {
        eventID = parseInt(eventID);
        // TODO
        if (eventID % 4 === 0 || eventID % 9 === 0 )
            return 'booked';

        if (eventID === 1)
            return 'wait list';

        if (availability == 'none') {
            return availability;
        }
    }


    function showDetail(eventID) {

        selectedEventID.value = eventID;
    }

    function getSelectedClass(eventID) {
        if (eventID == selectedEventID.value) {
            return "selected";
        }

        return "";
    }


    function rowIsHeader(month, year) {
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
        display: block;
        text-align: start;

        th,
        td {
            text-align: inherit;
        }
    }

    .schedule__header {
        display: flex;
            flex-direction: column;
        margin: 0;
        padding: var(--space) 0 var(--space-sm);

        &:first-child {
            padding-top: 0;
        }

        th {
            font-size: var(--h4);
            opacity: 0.9;
            text-align: start;
        }
    }

    .schedule__subheader {
        display: flex;
            gap: var(--space-sm);
        margin: 0;
        padding: var(--space-sm) 0 ;
        text-align: start;
        transition: color var(--transition-speed) var(--transition-type-motionless);
        transition-delay: 200ms;

        &:has(~.schedule__item:hover, ~.schedule__item:focus) {
            &:not(&:has(~.schedule__item~.schedule__subheader~.schedule__item:hover, ~.schedule__item~.schedule__subheader~.schedule__item:focus)) {
                color: var(--c-accent);

                .schedule__day {
                    &::before {
                        background: var(--c-accent);
                    }
                }
                // .schedule__weekday {
                //     color: var(--c-accent);
                // }

            }

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
        min-width: 1.5rem;
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

    .schedule__item {
        background: white;
        border-radius: var(--space-sm);
        box-shadow: var(--box-shadow-card);
        cursor: pointer;
        // display: flex;
        //     gap: var(--space-sm);
        //     justify-content: space-between;
        font-size: var(--p-sm);
        display: grid;
            grid-template-areas: "availability time status" "title title title " ;
            grid-template-columns: max-content 1fr auto;
            gap: 0 var(--space-sm);
            justify-content: start;
            align-items: center;
        margin: 0 0 var(--space-sm);
        padding: var(--space-sm);
        outline: 1px solid transparent;
        outline-offset: -2px;
        text-align: start;
        transition: all var(--transition-speed-fast) var(--transition-type-motionless);

        @include breakpoint(lg) {
            display: flex;
                gap: var(--space-sm);
                justify-content: space-between;
        }

        &:hover,
        &:focus  {
            // outline-color: var(--c-accent);
            // outline-offset: 2px;
            transform: scale(1.01);
            box-shadow: var(--box-shadow-card-hover);
        }

        &.availability-none {
            color: var(--c-neutral-50);

            // &:hover,
            // &:focus {
            //     outline-color: var(--c-neutral-80);
            // }
        }

        // &[data-booking-status="unavailable"] {
        //     &:hover,
        //     &:focus {
        //         outline-color: var(--c-neutral-50);
        //     }
        // }

        // &[data-booking-status="booked"] {
        //     &:hover,
        //     &:focus {
        //         outline-color: var(--c-success);
        //     }
        // }


        // &.selected {
        //     background-color: var(--c-accent);
        //     color: var(--c-accent-contrast);
        //     // outline-color: var(--c-accent);
        //     outline-offset: -1px;
        // }
    }

    .schedule__item--time {
        grid-area: time;
    }

    .schedule__item--title {
        grid-area: title;
        flex: 1;
        font-weight: bolder;
    }

    .schedule__item--status-display {
        display: flex;
            gap: var(--space-sm);
        font-size: var(--sm);
        border-radius: 99em;
        line-height: 1;
        padding: var(--space-xxs) var(--space-sm);

        .is-booked & {
            background-color: hsla(var(--c-success-hsl), 0.1);
            color: var(--c-success-dark);
        }
    }

    .schedule__item--availability {
        grid-area: availability;

        display: flex;
            align-items: center;
            justify-content: center;
    }

    .schedule__item--availability-indicator {
        aspect-ratio: 1 / 1;
        background-color: var(--c-neutral-70);
        border-radius: 99em;
        display: flex;
        width: 8px;

        // margin: calc(var(--space-sm)*-1);
        // margin-left: 0;

        .availability-high & {
            background-color: var(--c-success);
        }

        .availability-medium & {
            background-color: var(--c-warning);
        }

        .availability-low & {
            background-color: var(--c-danger);
        }
    }
</style>