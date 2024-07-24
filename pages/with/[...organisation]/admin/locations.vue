<template>
    <div class="container">
        <header class="admin-header">
            <h1>Locations</h1>

            <ul class="admin-header__actions">
                <li>
                    <button type="button" class="btn btn--secondary" v-on:click="inEditMode == 'new' ? inEditMode = null : inEditMode = 'new'">
                        <template v-if="inEditMode == 'new'">
                                <CrossIcon css-class="icon--xs" />
                                Cancel
                            </template>
                            <template v-if="inEditMode != 'new'">
                                <PlusIcon css-class="icon icon--xs" />
                                Add location
                            </template>
                    </button>
                </li>
            </ul>
        </header>
        <Location v-if="inEditMode == 'new'" />

        <ul v-if="Object.keys(organisationStore.locations).length" class="locations-list">
            <li v-for="location, key in organisationStore.locations" class="location card" :class="{ 'editing': inEditMode == key }">
                <header class="location__header">
                    <h4 v-if="inEditMode != key">{{ location.name }}</h4>
                    <div class="location__actions">
                        <button type="button" class="btn btn--sm btn--tertiary" v-on:click="inEditMode == key ? inEditMode = null : inEditMode = key">
                            <template v-if="inEditMode == key">
                                <CrossIcon css-class="icon--xs" />
                                Cancel
                            </template>
                            <template v-if="inEditMode != key">
                                <PencilIcon css-class="icon--sm" />
                                Edit
                            </template>
                        </button>

                        <!-- <button v-if="inEditMode == key" type="submit" class="btn btn--sm btn--success" v-on:click="inEditMode = key">
                            Save
                        </button> -->

                        <button v-if="inEditMode != key" type="button" class="btn btn--sm btn--tertiary btn--danger" v-on:click="inEditMode = key" title="Delete this location">
                            <TrashIcon css-class="icon icon--sm" />
                        </button>
                    </div>
                </header>

                <Location v-if="key == inEditMode" :id="key" />

                <template v-if="key != inEditMode">
                    <div class="location__info">
                        <address v-html="location.formatted_address"></address>

                        <h6 v-if="location.notes">Location information</h6>
                        <div v-if="location.notes" v-html="location.notes"></div>
                    </div>

                    <div class="location__map-wrapper">
                        <a v-if="location.url" :href="location.url" target="_blank">
                            <MapIcon />
                            {{ location.url}}
                        </a>

                        <div class="location__map">
                            <LMap
                                :ref="`map-${location.id}`"
                                :zoom="zoom"
                                :center="location.latLong"
                                :use-global-leaflet="false"
                            >
                                <LTileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                    layer-type="base"
                                    name="OpenStreetMap"
                                />
                                <LMarker :lat-lng="location.latLong">
                                    <LIcon
                                        icon-url="/images/icons/map-pin.svg"
                                        class-name="map-marker"
                                        shadow-url="/images/marker-shadow.png"
                                        :iconAnchor="[0, 12]"
                                        :shadowAnchor="[4, 24]"
                                    />
                                    <!-- :popupAnchor="[0, -35]"
                                    :tooltipAnchor="[0, -20]" -->
                                </LMarker>
                            </LMap>
                        </div>
                    </div>
                </template>
            </li>
        </ul>
        <p v-else>Your organisation hasn&rsquo;t added any locations yet.</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import PlusIcon from '@/components/icons/plus.vue';
    import PencilIcon from '@/components/icons/pencil.vue';
    import TrashIcon from '@/components/icons/trash.vue';
    import CrossIcon from '@/components/icons/cross.vue';
    import MapIcon from '@/components/icons/map.vue';

    import { useOrganisationStore } from '@/stores/organisation';
    import Location from '@/components/forms/Location.vue'

    const organisationStore = useOrganisationStore();
    const zoom = ref(17);
    const inEditMode = ref(null);

    await useAsyncData(() => organisationStore.getOrganisationLocations());
</script>

<style lang="scss">
    @import '@/assets/scss/admin/header';

    .locations-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-width: none;
    }

    .location {
        display: grid;
            grid-template-columns: 1fr max-content;
            gap: var(--space-med);
        font-size: var(--p-sm);
        justify-content: space-between;
        margin: 0 0 var(--space-med);
        padding: var(--content-padding-all);

        p,
        address {
            font-size: inherit;
        }
    }

    .location__header {
        display: flex;
            gap: var(--space-med);
            justify-content: space-between;
            align-items: start;
        grid-column-start: 1;
        grid-column-end: -1;

        &:hover,
        &:focus {
            button {
                opacity: 1;
            }
        }

        button {
            opacity: 0.4;

            .editing & {
                opacity: 1;
            }
        }
    }

    .location__actions {
        display: flex;
            gap: var(--space-xs);
        flex-shrink: 0;
        margin-left: auto;
    }

    .location__map-wrapper {
        word-break: break-all;

        min-width: 260px;
        max-width: 100%;

        @include breakpoint(med) {
            width: 500px;
        }

        a {
            border: 0 none;
            display: flex;
            font-size: var(--sm);
            margin-bottom: var(--space);
            text-decoration: none;
        }
    }

    .location__map {
        height: 300px;
        width: 100%;
    }
</style>