<template>
    <header id="header" class="main-header" :class="{ 'menu-open': menuOpen }" ref="headerRef">
        <!-- <h1 style="position: fixed; top: 5rem; background-color: blue; color: white; padding: 1rem">todo: {{  status }}</h1> -->
        <button type="button" v-on:click="() => menuOpen = !menuOpen" class="main-header__nav-toggle" aria-controls="main-menu" :aria-expanded="menuOpen">
            <MenuIcon />
        </button>

        <nuxt-link to="/" class="main-header__brand">
            <BrandImage :svgAlt="siteStore.siteName" />
        </nuxt-link>

        <nav id="main-menu" class="main-menu">
            <button type="button" v-on:click="() => menuOpen = false" class="main-header__nav-close" aria-controls="main-menu">
                <CloseIcon cssClass="icon--xs hide-on-desktop" />
            </button>
            <ul class="main-menu__list">
                <li>
                    <nuxt-link to="/bookings/" class="main-menu__item" >
                        <span>Booking System</span>
                        <CaretIcon class="icon--xs" alt="View" />
                    </nuxt-link>
                    <!-- <div class="main-menu__item">
                        <span>Booking System</span>
                        <CaretIcon class="icon--xs" alt="View" />
                    </div> -->

                    <ul class="main-menu__dropdown">
                        <li>
                            <nuxt-link to="/bookings/class" class="main-menu__item" >
                                Class booking
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/bookings/course" class="main-menu__item" >
                                Course booking
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/bookings/virtual" class="main-menu__item" >
                                Virtual booking
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/bookings/events" class="main-menu__item" >
                                Event booking
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <nuxt-link to="/pricing" class="main-menu__item" >
                        Pricing
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/features" class="main-menu__item" >
                        Features
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/contact" class="main-menu__item" >
                        Contact
                    </nuxt-link>
                </li>
            </ul>
        </nav>

        <nuxt-link v-if="!authenticated && $route.path.indexOf('signup') < 0" to="/signup" class="main-header__cta" >
            Get Started
        </nuxt-link>
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSiteStore } from '@/stores/site';
    import BrandImage from '@/components/icons/brand.vue';
    import MenuIcon from '@/components/icons/menu.vue';
    import CloseIcon from '@/components/icons/cross.vue';
    import CaretIcon from '@/components/icons/caret-down.vue';
    import Button from '@/components/interface/Button.vue'

    const siteStore = useSiteStore();
    const menuOpen = ref(false);
    // TODO
    const authenticated = false;
</script>

<style lang="scss">
    .main-header {
        background-color: var(--c-background);
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
        }
    }

    .main-header__nav-toggle {
        grid-area: hamburger;
        display: flex;
            align-items: center;

        @include breakpoint(lg) {
            display: none;
        }
    }

    .main-header__nav-close {
        color: var(--c-accent);
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
        position: relative;
        position: relative;

        svg {
            max-width: 11rem;
            max-height: 4rem;
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
                    text-decoration-color: var(--c-accent);

                    :where(a) {
                        text-decoration-style: wavy;
                    }

                    .icon {
                        color:  var(--c-accent);
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