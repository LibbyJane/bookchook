<template>
    <section class="container" v-if="eventData">
        <div class="schedule-card">
            <header class="schedule-card__header">
                <h2>{{ eventData.title }}</h2>
                <a href="#tickets" class="btn btn--outlined">Book</a>
            </header>

            <img v-if="eventData.imageURL" :src="eventData.imageURL" :alt="`${eventData.title} banner image`" />
            <ul class="icon-list">
                <li>
                    <CalendarIcon css-class="icon--lg" />
                    <h6 class="icon-list__title">
                        {{ new Intl.DateTimeFormat('default', { weekday: 'long', month: 'long', day: 'numeric'}).format(new Date(eventData.dateTime)) }}
                    </h6>
                    {{ getEventTimeRange() }}
                </li>
                <li>
                    <MapPinIcon css-class="icon--lg" />
                    <h6 class="icon-list__title">
                        {{ organisationStore.locations[eventData.location].name }}
                    </h6>

                </li>
                <li>
                    <UsersIcon css-class="icon--lg" />
                    <h6 class="icon-list__title">
                        {{ eventData.placesAvailable }} spaces
                    </h6>
                    remaining
                </li>
            </ul>

            <div class="schedule-card__body">
                <details v-for="item in eventData.information">
                    <summary>
                        {{ item.title}}
                    </summary>
                    <div v-html="item.contentHTML"></div>
                </details>
                <details>
                    <summary>
                        Location
                    </summary>
                    <div>
                        <h6>{{ organisationStore.locations[eventData.location].name }}</h6>
                        <address v-html="organisationStore.locations[eventData.location].formattedAddress"></address>
                    </div>
                </details>

                <div id="tickets" class="schedule-card__tickets">

                </div>

            </div>
        </div>

    </section>
</template>

<script setup>
    import { computed } from 'vue'
    import { useOrganisationStore } from '@/stores/organisation';
    import CalendarIcon from '@/components/icons/calendar.vue';
    import MapPinIcon from '@/components/icons/map-pin.vue';
    import UsersIcon from '@/components/icons/users.vue';

    const organisationStore = useOrganisationStore();

    const props = defineProps({
        eventID: {
            required: true
        }
    });

    const eventData = computed(() => {
        return organisationStore.schedule.filter(event => event.id == props.eventID)[0];
    })
    function getEventTimeRange() {
        const startDate = new Date(this.eventData.dateTime);
        const endDate = new Date(startDate.getTime() + (60*parseInt(this.eventData.durationInMinutes)*1000));
        return (new Intl.DateTimeFormat('default', { timeStyle: 'short'}).formatRange(startDate, endDate));
    }
</script>

<style lang="scss">
    .schedule-card {
        background: var(--c-white);
        border-radius: var(--space-sm);
        box-shadow: var(--box-shadow-elevate);
        display: flex;
            flex-direction: column;
    }

    .schedule-card__header {
        display: flex;
            justify-content: space-between;
            gap: var(--space);
            align-items: center;
        padding: var(--content-padding-all);
    }

    .schedule-card__body {

        padding: var(--content-padding-all);
        position: relative;
        &::before {
            border-top: thin solid var(--c-text);
            //background-color: var(--c-accent);
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.1;
        }
    }

    .icon-list {
        display: flex;
            gap: var(--space-lg);
            justify-content: center;
        line-height: var(--line-height-sm);
        list-style: none;
        margin-bottom: var(--space-med);
        padding: var(--content-padding-all);



        li {
            display: flex;
                flex-direction: column;
            flex: 1 1 0;
            font-weight: 500;
            line-height: var(--line-height-sm);
            text-align: center;
        }

        .icon {
            // color: var(--c-accent);
            margin: 0 auto var(--space-sm);
        }
    }

    .icon-list__title {
        line-height: inherit;
        margin: 0 0 var(--space-xxs);
        padding: 0;
    }
</style>