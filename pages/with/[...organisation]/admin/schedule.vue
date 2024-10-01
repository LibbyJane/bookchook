<template>
    <Header title="Schedule"></Header>
    <client-only>
        <VCalendar v-model="date" :attributes="attrs" color="accent" title-position="left" borderless transparent>
            <template #day-content="{ day }">
                <div :class="day.classes" tabindex="0" :aria-label="day.ariaLabel" :aria-disabled="isDisabled" role="button">
                    {{ day.day }}
                </div>
                <div v-html="getDaySummaryHTML(day.date, day)"></div>
            </template>
        </VCalendar>
    </client-only>
</template>

<script setup>
    import { ref } from 'vue';
    import Header from '@/components/admin/PageHeader.vue';
    import { useOrganisationStore } from '@/stores/organisation';
    const organisationStore = useOrganisationStore();

    await useAsyncData(() => organisationStore.getOrganisationSchedule());


    const date = ref(new Date());
    const attrs = ref([
        {
            key: 'today',
            highlight: {
                fillMode: 'solid',
            },
            dates: new Date(),
        },
    ]);

    function getDaySummaryHTML(date, day) {
        // TODO: make this dynamic
        if (date.getDay() == 2) {
            return `<a href="#123"><b class="session-title">Open Session</b><br>7:45pm-10:30pm</a>`;
        }

        if (date.getDay() == 4) {
            return `<a href="#123"><b class="session-title">Contemporary Floorwork Course (Beginners-Improvers)</b><br>7:45pm-10:30pm</a><a href="#123"><b class="session-title">Late Night Session</b><br>8:30pm-10:30pm</a>`;
        }

        if (date.getDay() == 6) {
            return `<a href="#123"><b class="session-title">Open Session</b><br>9:00am-11:00am</a><a href="#123"><b class="session-title">Adult Ballet Level 1</b><br>11:00am-1:00pm</a>`;
        }

    }
</script>

<style lang="scss">
    .vc-container {
        &.vc-container {
            --vc-font-family: inherit;
            font-family: inherit;

            --vc-text-2xs: var(--xs);
            --vc-text-xs: var(--sm);
            --vc-text-sm: var(--p-sm);
            --vc-text-base: var(--p);
            --vc-text-lg: var(--h6);
            --vc-text-xl: var(--h5);
            --vc-text-2xl: var(--h4);

            --vc-focus-ring: 0 0 0 2px hsla(var(--c-accent-hsl), 0.2);
            --vc-header-title-color: var(--c-text);
            --vc-color: var(--c-text);
            --vc-weekday-color: hsla(var(--c-text-hsl), 0.6);
        }

        .vc-header {
            margin: 0;
            padding: 0;
        }

        .vc-title {
            padding: 0;
        }

        .vc-weekday {
            background-color: var(--c-accent-light);
            color: var(--c-text);
            line-height: 1.5;

            &:first-child {
                border-radius: var(--border-radius) 0 0 0;
            }

            &:last-child {
                border-radius: 0 var(--border-radius) 0 0;
            }
        }

        .vc-weeks {
            padding: 0;
        }

        .vc-week {
            display: grid;
            // grid-template-columns: repeat(7, minMax(4rem, max-content));
            // grid-template-columns: repeat(7, minMax(4rem, max-content));
        }

        div[class^='weekday-'], div[class*=' weekday-']{

        }

        .vc-day {
            background-color: var(--c-background-alt);
            border: var(--border-light);
            display: flex;
                flex-direction: column;

            padding: var(--space-xs);

            font-size: var(--p-sm);
            font-weight: 500;
            line-height: 1;
            position: relative;
            text-align: center;
        }

        .vc-day-layer {
            top: var(--space-xxs);
        }

        .is-today {
            .is-today {
                color: var(--c-accent-contrast);
                font-weight: initial;
                position: relative;

                &::before {
                    background-color: var(--c-accent);
                    content: '';
                    border-radius: 99em;
                    border: 8px solid var(--c-accent);
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    position: absolute;
                    inset: 0;
                    margin: auto;
                    z-index: -1;
                    opacity: 0.85;
                }
            }


            .vc-highlight {
                height: 0;
                // align-self: start;
                // line-height: 1;
            }
        }

        a {
            background-color: var(--vc-accent-50);
            border: 0 none;
            border-radius: var(--border-radius);
            display: block;
            font-size: var(--xs);
            line-height: var(--line-height-sm);
            margin-top: var(--space-xs);
            padding: var(--space-xs);
            max-width: 10rem;
            text-align: initial;
            text-decoration: none;
            transition: background var(--transition-speed-fast) var(--transition-type-motionless);

            #{$hover} {
                color: currentColor;
                background-color: var(--vc-accent-100);
            }
        }
    }
.vc-gray {
    --vc-accent-50: var(--vc-gray-50);
    --vc-accent-100: var(--c-neutral-10);
    --vc-accent-200: var(--c-neutral-20);
    --vc-accent-300: var(--c-neutral-30);
    --vc-accent-400: var(--c-neutral-40);
    --vc-accent-500: var(--c-neutral-50);
    --vc-accent-600: var(--c-neutral-60);
    --vc-accent-700: var(--c-neutral-70);
    --vc-accent-800: var(--c-neutral-80);
    --vc-accent-900: var(--c-neutral-90);
    }


    .vc-accent {
        --vc-accent-50: hsla(var(--c-accent-hsl), 0.1);
        --vc-accent-100: hsla(var(--c-accent-hsl), 0.2);
        --vc-accent-200: hsla(var(--c-accent-hsl), 0.4);
        --vc-accent-300: hsla(var(--c-accent-hsl), 0.6);
        --vc-accent-400: hsla(var(--c-accent-hsl), 0.7);
        --vc-accent-500: hsla(var(--c-accent-hsl), 0.8);
        --vc-accent-600: hsla(var(--c-accent-hsl), 1);
        --vc-accent-700: hsla(var(--c-accent-hsl), 1);
        --vc-accent-800: hsla(var(--c-accent-hsl), 1);
        --vc-accent-900: var(--c-accent-dark);
    }
</style>