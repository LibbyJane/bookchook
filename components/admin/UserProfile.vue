<template>
    <div v-if="data" class="card user-profile">
        <header class="user-profile__header">
            <h3 class="user-profile__name">
                {{ data.first_name }} {{ data.last_name }}
            </h3>
            <small class="user-profile__role">{{ data.role_type }}</small>
            <ul class="user-profile__dates">
                <li>Joined {{ formatDtmLong(data.created_dtm) }}</li>
                <li>Last update on {{ formatDtmLong(data.updated_dtm) }}</li>
            </ul>
        </header>

        <div class="user-profile__section user-profile__section--contact">
            <h5>Contact</h5>
            <ul class="user-profile__contact-list">
                <li v-if="data.email_address">
                    <a :href="`mailto:${data.email_address}`">
                        <EnvelopeIcon css-class="icon--sm" />
                        {{ data.email_address }}
                    </a>
                </li>
                <li v-if="data.phone">
                    <a :href="`tel:${data.phone}`">
                        <PhoneIcon css-class="icon--sm" />
                        {{ data.phone }}
                    </a>
                </li>
            </ul>
        </div>

        <slot name="body"/>


    </div>
</template>

<script setup>
    import { formatDtmLong } from '@/utils/dates';
    import EnvelopeIcon from '@/components/icons/envelope.vue';
    import PhoneIcon from '@/components/icons/smartphone.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });
</script>

<style lang="scss">
    // .user-profile {
    //     background-color: var(--c-input-bg);
    // }

    .user-profile__header {
        // background-color: var(--c-header-bg);
        // color: var(--c-header-text);
        // background-color: hsla(var(--c-accent-hsl), 1.05);
        // color: hsla(var(--c-accent-contrast), 1);
        // background-color: var(--c-background-alt);
        // color: var(--c-text);
        background-color: var(--c-accent-dark);
        color: var(--c-accent-contrast);
        display: grid;
            grid-template-areas: 'name dates' 'role dates';
            gap: 0 var(--space-med);
            align-items: center;
        line-height: var(--line-height-sm);
        margin: 0;
        padding: var(--content-padding);
    }

    .user-profile__name {
        grid-area: name;
        line-height: inherit;
        margin: 0;
        padding: 0;
    }

    .user-profile__role {
        grid-area: role;

        display: block;
        font-weight: normal;
        line-height: inherit;
        opacity: 0.9;
        text-transform: lowercase;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    .user-profile__dates {
        grid-area: dates;

        display: flex;
        flex-direction: column;
        line-height: inherit;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            font-size: var(--sm);
            margin: 0;
            padding: 0;
            opacity: 0.9;
            text-align: end;
        }
    }

    .user-profile__section {
        padding: var(--content-padding);
        padding-bottom: 0;
    }

    .user-profile__contact-list {
        display: flex;
            gap: 0 var(--space);
        list-style: none;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;

        a {
            border: 0 none;
        }
    }

    .user-profile__group-list {
        display: flex;
            gap: var(--space-sm);
            flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            display: flex;
            margin: 0 0 var(--space);
            padding: 0;
        }
    }

    .user-profile__booking-list {
        display: flex;
            flex-direction: column;
        list-style: none;
        margin: 0 0 var(--space-sm);
        padding: 0;

        li {
            display: flex;
                gap: var(--space-sm);
                align-items: center;
            margin: 0 0 var(--space);
            padding: 0;
        }
    }
</style>