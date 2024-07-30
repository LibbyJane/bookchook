<template>
    <div class="map" :style="`height: ${height}; width: ${width}`" ref="mapElem">
        <LMap
            v-if="latLong"
            :zoom="zoom"
            :center="latLong"
            :use-global-leaflet="false"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
            />

            <LMarker :lat-lng="latLong">
                <LIcon
                    iconUrl="/images/icons/map-pin.svg"
                    className="map-marker"
                    shadowUrl="/images/marker-shadow.png"
                    :iconAnchor="[0, 12]"
                    :shadowAnchor="[4, 24]"
                />
                <!-- :popupAnchor="[0, -35]"
                :tooltipAnchor="[0, -20]" -->
            </LMarker>
        </LMap>
    </div>

</template>

<script setup>
    // import { ref, onMounted } from 'vue';

    // const mapElem = ref(null);

    const props = defineProps({
        zoom: {
            default: 17
        },
        latLong: {
            required: true
        },
        height: {
            default: '300px',
        },
        width: {
            default: '100%'
        }
    });

    // onMounted(()=>{
    //     // console.log('mapElem?', mapElem);
    //     let leafletElem = mapElem.value.children[0].children
    //     // console.log('leafletElem', leafletElem);

    //     if (leafletElem.length) {
    //         console.log('leafletElem length', leafletElem.length);

    //         for (const child of leafletElem) {
    //             console.log('child', child.tagName);
    //         }
    //     }
    // })
</script>

<style lang="scss">
    :root {
        --c-white-transparent: rgba(255,255,255,0.8);
    }

    .map.map {
        a {
            display: block;
            font-family: inherit;
            font-weight: normal;
            margin: 0;
        }

        .leaflet-container {
            font-family: inherit;
            line-height: 1;
        }

        .leaflet-bar {
            border: 0;
            box-shadow: var(--box-shadow-elevate);
            background-color: var(--c-white-transparent);
            display: flex;
                flex-direction: column;
                gap: 0;

            a {
                background-color: var(--c-white-transparent);
                color: var(--c-text);

                &:hover,
                &:focus {
                    color: var(--c-accent);

                    span {
                        transform: scale(1.2);
                    }
                }

                + a {
                    border-top: 1px solid var(--c-border-light);
                }

                span {
                    display: block;
                    transition: transform var(--transition-speed-fast) var(--transition-type-motionless);
                }
            }
        }

        .leaflet-control-attribution {
            background-color: var(--c-white-transparent);
            display: flex;
                gap: var(--space-xs);
            padding: var(--space-xxs);
        }
    }
</style>
