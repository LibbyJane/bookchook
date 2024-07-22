<template>
    <section class="schedule-card__wrapper container sticky" v-if="eventData">
        <div class="schedule-card">
            <header class="schedule-card__header">
                <h2>{{ eventData.title }}</h2>
                <a v-if="eventActive" href="#tickets" class="btn btn--secondary">
                    <span class="btn__text">Book</span>
                    <ArrowIcon />
                </a>
            </header>

            <img v-if="eventData.imageURL" :src="eventData.imageURL" :alt="`${eventData.title} banner image`" />
            <ul class="icon-list">
                <li>
                    <CalendarIcon />
                    <h6 class="icon-list__title">
                        {{ new Intl.DateTimeFormat('default', { weekday: 'long', month: 'long', day: 'numeric'}).format(new Date(eventData.dateTime)) }}
                    </h6>
                    <span class="icon-list__detail">{{ setupEventTimes() }}</span>
                </li>
                <li>
                    <MapPinIcon />
                    <h6 class="icon-list__title">
                        {{ organisationStore.locations[eventData.location].name }}
                    </h6>
                </li>
                <li>
                    <UsersIcon />
                    <h6 class="icon-list__title">
                        {{ eventData.placesAvailable }} spaces
                    </h6>
                    <span class="icon-list__detail">remaining</span>
                </li>
            </ul>

            <div class="schedule-card__body">
                <Disclosure v-for="item in eventData.information" :title="item.title" open="true">
                    <div v-html="item.contentHTML"></div>
                </Disclosure>
                <Disclosure title="Location">
                    <h6>{{ organisationStore.locations[eventData.location].name }}</h6>
                    <address v-html="organisationStore.locations[eventData.location].formatted_address"></address>
                    <a v-if="organisationStore.locations[eventData.location].url" :href="organisationStore.locations[eventData.location].url" target="_blank" class="btn btn--tertiary">
                        <MapIcon /> Location Map
                    </a>
                </Disclosure>
            </div>
            <div id="tickets" class="schedule-card__tickets">
                <h3>Book</h3>
                <template v-if="!eventActive">
                    <p>This event is no longer available for bookings.</p>
                </template>
                <template v-else-if="!bookerStore.authenticated">
                    <p>Please <a href="login">login or register</a> to book on to this event.</p>
                </template>
                <template v-else>
                    tickets
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { computed } from 'vue'
    import { useOrganisationStore } from '@/stores/organisation';
    import { useBookerStore } from '@/stores/booker.js';
    import Disclosure from '@/components/interface/Disclosure.vue';

    import ArrowIcon from '@/components/icons/arrow.vue';
    import CalendarIcon from '@/components/icons/calendar.vue';
    import MapPinIcon from '@/components/icons/map-pin.vue';
    import UsersIcon from '@/components/icons/users.vue';
    import MapIcon from '@/components/icons/map.vue';

    const organisationStore = useOrganisationStore();
    const bookerStore = useBookerStore();

    const props = defineProps({
        eventID: {
            required: true
        }
    });

    const eventData = computed(() => {
        return organisationStore.schedule.filter(event => event.id == props.eventID)[0];
    })

    const eventActive = ref();

    function setupEventTimes() {
        const startDate = new Date(this.eventData.dateTime);
        const endDate = new Date(startDate.getTime() + (60*parseInt(this.eventData.durationInMinutes)*1000));
        eventActive.value = startDate.getTime() > Date.now();

        return (new Intl.DateTimeFormat('default', { timeStyle: 'short'}).formatRange(startDate, endDate));
    }
</script>

<style lang="scss">
    .schedule-card__wrapper {
        height: calc(100vh - var(--header-height));
    }

    .schedule-card {
        --sb-track-color: var(--c-neutral-100);
        --sb-thumb-color: var(--c-neutral-90);
        @include scrollbars();
        background: var(--c-white);
        border-radius: var(--space-sm);
        box-shadow: var(--box-shadow-elevate);
        container-type: inline-size;
        display: flex;
            flex-direction: column;

        max-height: calc(100vh - var(--header-height) - var(--space-xl) - var(--space-xl));
        // position: sticky;
        //     top: 0;
    }

    .schedule-card__header {
        display: flex;
            justify-content: space-between;
            gap: var(--space);
            align-items: center;
        padding: var(--content-padding);

        h2 {
            margin: 0;
            padding: 0;
        }
    }

    .schedule-card__body {
        border-top: thin solid hsla(var(--c-text-hsl), 0.1);
        padding: var(--content-padding-all);
    }

    .schedule-card__tickets {
        border-top: thin solid hsla(var(--c-text-hsl), 0.1);
        padding: var(--content-padding-all);
        position: sticky;
        top: calc(var(--header-height) + var(--space));
    }

    .icon-list {
        $il-breakpoint: 500px;
        display: flex;
            flex-direction: column;
        line-height: var(--line-height-sm);
        list-style: none;
        margin: 0 0 var(--space-sm);
        padding: var(--content-padding-all);
        min-width: 100%; /* important so the grid can collapse */

        @container (min-width: #{$il-breakpoint}) {
            flex-direction: row;
            justify-content: center;
            gap: var(--space-med);
        }

        li {
            // display: grid;
            //     grid-template-areas: "icon title" "icon detail";
            //     grid-template-columns: auto 1fr;
            display: flex;
                flex-wrap: wrap;
                align-items: center;
            font-weight: 500;
            line-height: var(--line-height-sm);
            margin: 0 0 var(--space);
            padding: 0;
                padding-left: 1.8rem;
            position: relative;
            // text-align: center;

            @container (min-width: #{$il-breakpoint}) {
                // /display: flex;
                    flex-direction: column;
                    gap: 0;
                flex: 1 1 0;
                padding: 0;
                text-align: center;
            }
        }

        .icon {
            // color: var(--c-accent);
            // color: hsla(var(--c-text-hsl), 0.8);
            // grid-area: "icon";
            // margin-right: var(--space-xs);
            position: absolute;
                left: 0;

            @container (min-width: #{$il-breakpoint}) {
                margin: 0 0 var(--space-sm);
                height: var(--icon-size-lg);
                width: var(--icon-size-lg);
                position: static;
            }
        }
    }

    .icon-list__title {
        grid-area: title;
        line-height: inherit;
        // margin: 0 0 var(--space-xxs);
        margin: 0;
        padding: 0;
    }

    .icon-list__detail {
        // grid-area: detail;
        &::before {
            content: ' ';
        }
    }
</style>