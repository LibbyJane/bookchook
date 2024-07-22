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
    .main-header__brand {
        svg {
            max-width: 11rem;
            max-height: 4rem;
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