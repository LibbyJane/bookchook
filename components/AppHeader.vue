<template>
    <header id="header" class="main-header" :class="{ 'menu-open': userMenuOpen }" ref="headerRef">
        <a class="main-header__brand" :href="`${siteStore.organisationPagePrefix}${organisationStore.account.url_slug}`" >
            <NuxtImg v-if="organisationStore.account.logo_url" :src="organisationStore.account.logo_url" :alt="organisationStore.account.account_name" />
            <span v-if="!organisationStore.account.logo_url">{{ organisationStore.account.account_name }}</span>
        </a>

        <nav id="main-menu" class="main-menu">
            <ul class="main-menu__list">
                <li>
                    <a class="main-menu__item" :href="`${organisationStore.account.url_slug}/schedule`">
                        <CalendarIcon />
                        What&rsquo;s on
                    </a>
                </li>
                <li v-if="bookerStore.authenticated && organisationStore.purchaseTypes.passes">
                    <a class="main-menu__item" href="`${organisationStore.account.url_slug}/passes">
                        <TicketIcon />
                        Passes
                    </a>
                </li>
                <li v-if="bookerStore.authenticated && organisationStore.purchaseTypes.membership">
                    <a class="main-menu__item" href="`${organisationStore.account.url_slug}/membership">
                        <MembershipIcon />
                        Membership
                    </a>
                </li>
                <li>
                    <button v-if="bookerStore.authenticated" type="button" v-on:click="() => userMenuOpen = !userMenuOpen" aria-controls="usere-menu" class="main-menu__item menu-toggle">
                        <UserIcon />
                        Account
                    </button>
                </li>
                <li v-if="!bookerStore.authenticated">
                    <a class="main-menu__item" :href="`${organisationStore.account.url_slug}/login`">
                        <UserIcon />
                        Log in / Register
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { useSiteStore } from '@/stores/site';
    import { useOrganisationStore } from '@/stores/organisation';
    import { useBookerStore } from '~/stores/booker.js';

    import CalendarIcon from '@/components/icons/calendar.vue';
    import TicketIcon from '@/components/icons/ticket.vue';
    import MembershipIcon from '@/components/icons/id-badge.vue';
    import UserIcon from '@/components/icons/user.vue';

    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const bookerStore = useBookerStore();
    const userMenuOpen = ref(false);

</script>

<style lang="scss">
    .main-header {
        background: var(--c-header-bg, --c-accent);
        color: var(--c-header-text, --c-accent-contrast);
        box-shadow: var(--box-shadow-soft);
        display: grid;
            gap: var(--space-med);
            grid-template-areas: 'hamburger brand cta' 'nav nav blank';
            grid-template-columns: max-content 1fr max-content;
            align-items: center;
        padding: var(--space-sm) var(--content-padding) var(--space-sm);
        position: sticky;
            top: 0;
            left: 0;
        z-index: var(--zi-header);

        @include breakpoint(lg) {
            grid-template-areas: 'brand nav cta';
            grid-template-columns: 1fr auto max-content;
        }
    }

    .user-menu__nav-toggle {
        grid-area: hamburger;
        display: flex;
            align-items: center;

        @include breakpoint(lg) {
            display: none;
        }
    }

    .main-header__nav-close {
        color: var(--c-header-accent);
        opacity: 0.7;
        padding: var(--space);
        margin-left: auto;

        @include breakpoint(lg) {
            display: none;
        }

        &:hover,
        &:focus {
            opacity: 1;
        }
    }

    .main-header__brand {
        grid-area: brand;
        margin-right: var(--space-med);

        &:has(img, svg) {
            max-height: 3.4rem;
            max-width: 66vw;

            @include breakpoint(lg) {
                max-width: 20rem;
            }
        }

        span {
            font-size: var(--h0);
            font-weight: bold;
            white-space: nowrap;
        }
    }

    .main-menu {
        grid-area: nav;

        @include hide;
        @include scrollbars;
        background: hsl(var(--c-background-hue), var(--c-background-sat), calc(var(--c-background-lum) - 5%));
        display: flex;
            flex-direction: column;
        position: fixed;
            top: 0;
            bottom: 0;
            right: auto;
            left: -4rem;

        .menu-open & {
            @include show;
            box-shadow: var(--box-shadow-soft);
            left: 0;
        }

        @include breakpoint(lg) {
            @include show;
            background: transparent;
            flex-direction: row;
            position: relative;

                right: initial;
                left: initial;
            margin-left: auto;

            .menu-open & {
                box-shadow: none;
            }
        }
    }

    .main-menu__list {
        display: flex;
            flex-direction: column;
        gap: var(--space-sm);

        @include breakpoint(lg) {
            flex-direction: row;
        }

        > li {
            display: flex;
                flex-direction: column;
            margin: 0;
            padding: 0;
            position: relative;

            &:hover,
            &:focus {
                .main-menu__item {
                    color: currentColor;
                    text-decoration-color: var(--c-header-accent);

                    :where(a) {
                        text-decoration-style: wavy;
                    }

                    .icon {
                        color:  var(--c-header-accent);
                        transform: translateY(2px);
                    }
                }

                .main-menu__dropdown {
                    @include show;
                    max-height: none;
                    top: 100%;
                }
            }
        }
    }

    .main-menu__item {
        cursor: pointer;
        display: flex;
            gap: var(--space-sm);
            align-items: center;
        padding: var(--space-sm) var(--space);
        text-decoration: underline;
        text-underline-offset: 0.6ex;
        //text-decoration: none;
        transition: var(--transition);
        text-decoration-color: hsla(var(--c-text-hsl), 0.25);

        @include breakpoint(lg) {
            padding: var(--content-padding) var(--space);
            text-decoration-style: wavy;
        }
    }

    .main-menu__dropdown {
        @include breakpoint(lg) {
        @include hide;

        background-color: var(--c-background);
        box-shadow: var(--box-shadow-soft);
        max-height: none;
        width: max-content;
        max-width: 80vw;
        padding: var(--space-sm) 0;
        position: absolute;
            top: calc(100% - 2rem);
            left: 0;
        }

        a {
            display: block;
            flex: 0 0 auto;
            padding: var(--space-xs) var(--space);
            text-decoration: none;
        }
    }

    .main-header__cta {
        grid-area: cta;

        --shape-size: 8px; /* control the shape */

        background: hsla(var(--c-accent-hsl), 0.85);
        color: hsla(var(--c-accent-contrast-hsl), 0.9);
        font-size: var(--p-sm);
        font-weight: 700;
        --path-point-1: 0 0;
        --path-point-2: calc(100% - var(--shape-size)) 0;
        --path-point-3: 100% 50%;
        --path-point-4: calc(100% - var(--shape-size)) 100%;
        --path-point-5: 0 100% ;
        --path-point-6: 0 50%;
        clip-path: polygon(var(--path-point-1), var(--path-point-2), var(--path-point-3),var(--path-point-4),var(--path-point-5),var(--path-point-6));
        padding: var(--space-sm) calc(var(--shape-size) + var(--space-sm)) var(--space-sm) calc(var(--shape-size) + var(--space-xs));
        text-indent: 2px;
        width: fit-content;
        text-decoration: none;
        transition: var(--transition);

        @include breakpoint(med) {
            --shape-size: 16px;
            font-size: var(--p);
            margin-left: var(--space-med);
        }

        &:hover,
        &:focus {
            --path-point-6: var(--shape-size) 50%;
            box-shadow: var(--box-shadow-soft);
            background: hsla(var(--c-accent-hsl),1);
            color: var(--c-accent-contrast);
            transform: translateX(3px);

        }
    }
</style>